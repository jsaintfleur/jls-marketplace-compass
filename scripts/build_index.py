#!/usr/bin/env python3
"""
Marketplace Compass -- keyless ML pipeline build script.

Dataset: UCI Online Retail II (keyless demo substitution for Olist, which needs
Kaggle credentials). License CC BY 4.0 (commercial OK).

Produces, in data/processed/ and data/metadata/:
  - model_metrics.json   repeat-purchase / churn model, temporal holdout, honest metrics
  - segments.json        RFM segmentation
  - summary.json         headline KPIs
  - sources.json         dataset provenance + Olist note + labels computed vs proposed

Model task: customer-level repeat-purchase prediction with a strict TEMPORAL split
(forward-in-time holdout, no random shuffle, no post-cutoff features -> no leakage).
"""

import json
import os
from datetime import timedelta

import numpy as np
import pandas as pd
from sklearn.ensemble import HistGradientBoostingClassifier
from sklearn.linear_model import LogisticRegression
from sklearn.pipeline import make_pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import roc_auc_score, average_precision_score, brier_score_loss

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
RAW_XLSX = os.path.join(ROOT, "data", "raw", "online_retail_II.xlsx")
PROC_DIR = os.path.join(ROOT, "data", "processed")
META_DIR = os.path.join(ROOT, "data", "metadata")
os.makedirs(PROC_DIR, exist_ok=True)
os.makedirs(META_DIR, exist_ok=True)

# ---- config ----
LABEL_WINDOW_DAYS = 90
# Temporal holdout: train cutoff is earlier; test cutoff is strictly later than
# the train label window end -> genuine forward-in-time holdout.
TRAIN_CUTOFF = pd.Timestamp("2011-05-01")
TEST_CUTOFF = pd.Timestamp("2011-09-01")

FEATURES = [
    "recency_days",
    "frequency",
    "monetary",
    "tenure_days",
    "avg_basket_value",
    "unique_products",
    "is_uk",
    "country_freq",
]


def load_clean():
    print("Loading both sheets ...")
    xl = pd.ExcelFile(RAW_XLSX)
    frames = [pd.read_excel(xl, sheet_name=s) for s in xl.sheet_names]
    df = pd.concat(frames, ignore_index=True)
    raw_rows = len(df)
    print(f"  raw rows loaded: {raw_rows:,}")

    df["Invoice"] = df["Invoice"].astype(str)
    df = df.dropna(subset=["Customer ID"])
    df = df[~df["Invoice"].str.startswith("C")]          # drop cancellations
    df = df[(df["Quantity"] > 0) & (df["Price"] > 0)]     # drop non-positive
    df["Customer ID"] = df["Customer ID"].astype(np.int64)
    df["InvoiceDate"] = pd.to_datetime(df["InvoiceDate"])
    df["TotalPrice"] = df["Quantity"] * df["Price"]
    clean_rows = len(df)
    print(f"  clean rows: {clean_rows:,}  (dropped {raw_rows - clean_rows:,})")
    return df, raw_rows, clean_rows


def build_features(df, cutoff, country_freq_map=None):
    """Customer-level features from strictly pre-cutoff behavior + post-cutoff label."""
    pre = df[df["InvoiceDate"] < cutoff]
    if pre.empty:
        raise ValueError("no pre-cutoff data")
    g = pre.groupby("Customer ID")
    feat = pd.DataFrame({
        "recency_days": (cutoff - g["InvoiceDate"].max()).dt.days,
        "frequency": g["Invoice"].nunique(),
        "monetary": g["TotalPrice"].sum(),
        "tenure_days": (cutoff - g["InvoiceDate"].min()).dt.days,
        "unique_products": g["StockCode"].nunique(),
    })
    feat["avg_basket_value"] = feat["monetary"] / feat["frequency"]
    country = g["Country"].agg(lambda s: s.mode().iloc[0])
    feat["is_uk"] = (country == "United Kingdom").astype(int)

    # frequency-encode country using a map learned on TRAIN only (avoid leakage)
    if country_freq_map is None:
        country_freq_map = country.value_counts(normalize=True).to_dict()
    feat["country_freq"] = country.map(country_freq_map).fillna(0.0)

    # label: any purchase in [cutoff, cutoff + window)
    win_end = cutoff + timedelta(days=LABEL_WINDOW_DAYS)
    post = df[(df["InvoiceDate"] >= cutoff) & (df["InvoiceDate"] < win_end)]
    repeat_ids = set(post["Customer ID"].unique())
    feat["label"] = feat.index.to_series().isin(repeat_ids).astype(int)

    feat["_country"] = country  # for reporting only, not a model feature
    return feat, country_freq_map


def top_decile_lift(y_true, y_score):
    n = len(y_true)
    k = max(1, int(round(n * 0.10)))
    order = np.argsort(-y_score)
    top_rate = y_true[order][:k].mean()
    base = y_true.mean()
    return float(top_rate / base) if base > 0 else float("nan")


def main():
    df, raw_rows, clean_rows = load_clean()

    n_customers = df["Customer ID"].nunique()
    n_orders = df["Invoice"].nunique()
    revenue = float(df["TotalPrice"].sum())
    date_min = df["InvoiceDate"].min()
    date_max = df["InvoiceDate"].max()

    # ---------- TEMPORAL SPLIT ----------
    train, cfreq_map = build_features(df, TRAIN_CUTOFF)
    test, _ = build_features(df, TEST_CUTOFF, country_freq_map=cfreq_map)

    Xtr, ytr = train[FEATURES].to_numpy(float), train["label"].to_numpy(int)
    Xte, yte = test[FEATURES].to_numpy(float), test["label"].to_numpy(int)

    print(f"  train n={len(train):,}  base_rate={ytr.mean():.3f}")
    print(f"  test  n={len(test):,}  base_rate={yte.mean():.3f}")

    # ---------- MODELS ----------
    hgb = HistGradientBoostingClassifier(
        max_depth=4, learning_rate=0.06, max_iter=300,
        l2_regularization=1.0, random_state=42,
    )
    hgb.fit(Xtr, ytr)
    p_hgb = hgb.predict_proba(Xte)[:, 1]

    lr = make_pipeline(StandardScaler(), LogisticRegression(max_iter=1000, C=1.0))
    lr.fit(Xtr, ytr)
    p_lr = lr.predict_proba(Xte)[:, 1]

    def metrics(p):
        return {
            "roc_auc": float(roc_auc_score(yte, p)),
            "pr_auc": float(average_precision_score(yte, p)),
            "brier": float(brier_score_loss(yte, p)),
            "top_decile_lift": top_decile_lift(yte, p),
        }

    m_hgb, m_lr = metrics(p_hgb), metrics(p_lr)

    # permutation-based feature importance for the HGB model (drop in ROC-AUC)
    rng = np.random.default_rng(42)
    base_auc = m_hgb["roc_auc"]
    importances = {}
    for j, name in enumerate(FEATURES):
        Xp = Xte.copy()
        Xp[:, j] = rng.permutation(Xp[:, j])
        auc_p = roc_auc_score(yte, hgb.predict_proba(Xp)[:, 1])
        importances[name] = float(base_auc - auc_p)
    imp_sorted = dict(sorted(importances.items(), key=lambda kv: -kv[1]))

    print(f"  HGB  AUC={m_hgb['roc_auc']:.3f} PR={m_hgb['pr_auc']:.3f} "
          f"Brier={m_hgb['brier']:.3f} lift={m_hgb['top_decile_lift']:.2f}")
    print(f"  LR   AUC={m_lr['roc_auc']:.3f} PR={m_lr['pr_auc']:.3f}")

    model_metrics = {
        "task": "customer-level repeat-purchase (churn) prediction",
        "label_definition": (
            f"1 if customer made >=1 purchase in [cutoff, cutoff+{LABEL_WINDOW_DAYS}d), else 0"
        ),
        "split": {
            "type": "temporal forward-in-time holdout (no random shuffle)",
            "train_cutoff": str(TRAIN_CUTOFF.date()),
            "train_label_window": [str(TRAIN_CUTOFF.date()),
                                   str((TRAIN_CUTOFF + timedelta(days=LABEL_WINDOW_DAYS)).date())],
            "test_cutoff": str(TEST_CUTOFF.date()),
            "test_label_window": [str(TEST_CUTOFF.date()),
                                  str((TEST_CUTOFF + timedelta(days=LABEL_WINDOW_DAYS)).date())],
            "note": "test_cutoff is strictly after the train label window end -> no temporal leakage",
        },
        "features": FEATURES,
        "leakage_guard": "features derived only from InvoiceDate < cutoff; country encoding learned on train only",
        "n_train": int(len(train)),
        "n_test": int(len(test)),
        "train_base_rate": float(ytr.mean()),
        "test_base_rate": float(yte.mean()),
        "model": {"name": "HistGradientBoostingClassifier", **m_hgb},
        "baseline": {"name": "LogisticRegression", **m_lr},
        "auc_uplift_vs_baseline": float(m_hgb["roc_auc"] - m_lr["roc_auc"]),
        "feature_importance_auc_drop": imp_sorted,
    }
    json.dump(model_metrics, open(os.path.join(PROC_DIR, "model_metrics.json"), "w"), indent=2)

    # ---------- RFM SEGMENTATION (full dataset, as of date_max) ----------
    rfm, _ = build_features(df, date_max + timedelta(days=1), country_freq_map=cfreq_map)
    r_score = pd.qcut(rfm["recency_days"], 4, labels=[4, 3, 2, 1]).astype(int)  # lower recency -> higher score
    f_score = pd.qcut(rfm["frequency"].rank(method="first"), 4, labels=[1, 2, 3, 4]).astype(int)
    m_score = pd.qcut(rfm["monetary"].rank(method="first"), 4, labels=[1, 2, 3, 4]).astype(int)
    rfm["R"], rfm["F"], rfm["M"] = r_score, f_score, m_score
    rfm["RFM_sum"] = rfm["R"] + rfm["F"] + rfm["M"]

    def segment(row):
        r, f, m = row["R"], row["F"], row["M"]
        fm = (f + m) / 2.0
        if r >= 4 and fm >= 4:          # top recency AND top freq/monetary -> elite
            return "Champions"
        if r >= 3 and fm >= 3:
            return "Loyal"
        if r >= 3:                       # recent but lower value
            return "Potential"
        if r <= 2 and fm >= 3:           # once-valuable, now lapsing
            return "At-Risk"
        return "Hibernating"

    rfm["segment"] = rfm.apply(segment, axis=1)

    # CLV proxy: expected 90-day value = historical avg 90d spend * predicted repeat prob
    rfm["p_repeat"] = hgb.predict_proba(rfm[FEATURES].to_numpy(float))[:, 1]
    obs_days = (rfm["tenure_days"].clip(lower=1))
    spend_per_90 = rfm["monetary"] / obs_days * 90.0
    rfm["clv_90d_proxy"] = spend_per_90 * rfm["p_repeat"]
    rfm["clv_tier"] = pd.qcut(rfm["clv_90d_proxy"].rank(method="first"), 4,
                              labels=["Bronze", "Silver", "Gold", "Platinum"])

    seg_rows = []
    for name, grp in rfm.groupby("segment"):
        seg_rows.append({
            "segment": name,
            "customers": int(len(grp)),
            "pct_of_base": float(len(grp) / len(rfm)),
            "avg_recency_days": float(grp["recency_days"].mean()),
            "avg_frequency": float(grp["frequency"].mean()),
            "avg_monetary": float(grp["monetary"].mean()),
            "total_monetary": float(grp["monetary"].sum()),
            "avg_clv_90d_proxy": float(grp["clv_90d_proxy"].mean()),
            "avg_predicted_repeat_prob": float(grp["p_repeat"].mean()),
        })
    seg_rows.sort(key=lambda d: -d["avg_monetary"])
    segments = {
        "n_customers": int(len(rfm)),
        "as_of_date": str(date_max.date()),
        "method": "RFM quantile scoring (R,F,M in 1..4), rule-based segment labels",
        "segments": seg_rows,
        "clv_proxy": {
            "definition": "expected 90-day value = (historical monetary / tenure_days * 90) * predicted_repeat_prob",
            "caveats": [
                "coarse proxy, not a survival/BG-NBD model",
                "repeat prob from temporal-holdout HGB model applied to full-history features",
                "tenure<1 day clipped to 1 to avoid divide-by-zero inflation",
            ],
            "tiers": {t: int((rfm["clv_tier"] == t).sum())
                      for t in ["Platinum", "Gold", "Silver", "Bronze"]},
            "platinum_avg_clv_90d": float(rfm.loc[rfm["clv_tier"] == "Platinum", "clv_90d_proxy"].mean()),
        },
    }
    json.dump(segments, open(os.path.join(PROC_DIR, "segments.json"), "w"), indent=2)

    # ---------- SUMMARY ----------
    orders_per_cust = df.groupby("Customer ID")["Invoice"].nunique()
    repeat_rate = float((orders_per_cust >= 2).mean())
    summary = {
        "dataset": "UCI Online Retail II (keyless demo)",
        "date_range": [str(date_min.date()), str(date_max.date())],
        "rows_raw": int(raw_rows),
        "rows_clean": int(clean_rows),
        "customers": int(n_customers),
        "orders": int(n_orders),
        "revenue": revenue,
        "avg_order_value": float(revenue / n_orders),
        "repeat_rate_overall": repeat_rate,
        "model_roc_auc": m_hgb["roc_auc"],
        "model_pr_auc": m_hgb["pr_auc"],
        "model_brier": m_hgb["brier"],
        "model_top_decile_lift": m_hgb["top_decile_lift"],
        "baseline_roc_auc": m_lr["roc_auc"],
        "top_segments_by_revenue": [
            {"segment": s["segment"], "customers": s["customers"],
             "total_monetary": s["total_monetary"]}
            for s in seg_rows[:3]
        ],
    }
    json.dump(summary, open(os.path.join(PROC_DIR, "summary.json"), "w"), indent=2)

    # ---------- SOURCES / METADATA ----------
    sources = {
        "datasets": [
            {
                "name": "UCI Online Retail II",
                "url": "https://archive.ics.uci.edu/static/public/502/online+retail+ii.zip",
                "license": "CC BY 4.0",
                "commercial_use": True,
                "role": "keyless demo dataset (direct download, no credentials)",
                "rows": int(raw_rows),
                "description": "UK online retailer transactions 2009-12 to 2011-12, two Excel sheets concatenated",
            },
            {
                "name": "Olist Brazilian E-Commerce",
                "url": "https://www.kaggle.com/datasets/olistbr/brazilian-ecommerce",
                "license": "CC BY-NC-SA 4.0",
                "role": "richer PRIMARY target (NOT used here) -- requires Kaggle authentication",
                "note": "Honest substitution: Online Retail II used for the keyless demo because Olist "
                        "needs Kaggle credentials unavailable in this environment. Olist adds order "
                        "status/delivery timestamps and geolocation enabling the proposed models below.",
            },
        ],
        "labels": {
            "computed": [
                "Customer-level repeat-purchase / churn prediction (this pipeline, temporal holdout).",
                "RFM segmentation (Champions / Loyal / Potential / At-Risk / Hibernating).",
                "90-day CLV proxy tiers (Platinum/Gold/Silver/Bronze).",
            ],
            "proposed_requires_olist": [
                "Order-level late-delivery risk model (needs Olist delivery timestamps).",
                "Brazil geospatial expansion / regional demand model (needs Olist geolocation).",
            ],
        },
        "generated_at": pd.Timestamp.now("UTC").isoformat(),
    }
    json.dump(sources, open(os.path.join(META_DIR, "sources.json"), "w"), indent=2)

    print("Artifacts written to data/processed/ and data/metadata/.")


if __name__ == "__main__":
    main()
