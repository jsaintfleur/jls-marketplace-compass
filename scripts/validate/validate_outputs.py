#!/usr/bin/env python3
"""Validate Marketplace Compass artifacts. Exit non-zero on any failure."""

import json
import os
import sys
import csv

ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
PROC = os.path.join(ROOT, "data", "processed")
META = os.path.join(ROOT, "data", "metadata")
PUBLIC = os.path.join(ROOT, "public", "data")

LEAKAGE_TOKENS = ["future", "post", "after", "label", "target", "next", "outcome", "_post"]

errors = []
warnings = []


def load(path):
    if not os.path.exists(path):
        errors.append(f"MISSING artifact: {path}")
        return None
    try:
        return json.load(open(path))
    except Exception as e:  # noqa: BLE001
        errors.append(f"MALFORMED json {path}: {e}")
        return None


def check(cond, msg):
    if not cond:
        errors.append(msg)


mm = load(os.path.join(PROC, "model_metrics.json"))
seg = load(os.path.join(PROC, "segments.json"))
summ = load(os.path.join(PROC, "summary.json"))
src = load(os.path.join(META, "sources.json"))

# ---- model_metrics ----
if mm:
    for grp in ("model", "baseline"):
        check(grp in mm, f"model_metrics missing '{grp}'")
        g = mm.get(grp, {})
        for k in ("roc_auc", "pr_auc", "brier"):
            check(k in g, f"model_metrics.{grp} missing '{k}'")
            v = g.get(k)
            check(isinstance(v, (int, float)), f"model_metrics.{grp}.{k} not numeric")
        auc = g.get("roc_auc")
        check(isinstance(auc, (int, float)) and 0.0 <= auc <= 1.0,
              f"model_metrics.{grp}.roc_auc out of [0,1]: {auc}")
        pr = g.get("pr_auc")
        check(isinstance(pr, (int, float)) and 0.0 <= pr <= 1.0,
              f"model_metrics.{grp}.pr_auc out of [0,1]: {pr}")
        br = g.get("brier")
        check(isinstance(br, (int, float)) and 0.0 <= br <= 1.0,
              f"model_metrics.{grp}.brier out of [0,1]: {br}")

    feats = mm.get("features", [])
    check(isinstance(feats, list) and len(feats) > 0, "model_metrics.features empty")
    for f in feats:
        low = f.lower()
        for tok in LEAKAGE_TOKENS:
            check(tok not in low,
                  f"LEAKAGE: feature '{f}' contains suspicious token '{tok}'")
    # face validity: model AUC meaningfully above chance
    if mm.get("model", {}).get("roc_auc") is not None:
        if mm["model"]["roc_auc"] <= 0.55:
            warnings.append(f"model roc_auc={mm['model']['roc_auc']:.3f} not much above 0.5")
    # temporal split integrity
    split = mm.get("split", {})
    check(split.get("test_cutoff", "") > split.get("train_cutoff", ""),
          "split: test_cutoff must be after train_cutoff")
    check(len(mm.get("calibration", [])) >= 5, "model_metrics.calibration must contain bins")
    check(len(mm.get("lift_curve", [])) >= 5, "model_metrics.lift_curve must contain points")
    policy = mm.get("threshold_policy", {})
    check(len(policy.get("rows", [])) >= 10, "threshold_policy.rows must contain threshold grid")
    for row in policy.get("rows", []):
        check(0 <= row.get("threshold", -1) <= 1, "threshold out of range")
        check(row.get("expected_net_value") is not None, "threshold row missing expected_net_value")

# ---- segments sum to customer count ----
if seg:
    n = seg.get("n_customers")
    rows = seg.get("segments", [])
    check(isinstance(n, int) and n > 0, "segments.n_customers invalid")
    total = sum(r.get("customers", 0) for r in rows)
    check(total == n, f"segment customers sum {total} != n_customers {n}")
    champ = [r for r in rows if r["segment"] == "Champions"]
    if champ and n:
        c = champ[0]
        if c["customers"] / n > 0.35:
            warnings.append(f"Champions {c['customers']/n:.0%} of base -- expected small")
        # Champions should be high value vs overall
        overall_avg = sum(r["total_monetary"] for r in rows) / n
        if c["avg_monetary"] < overall_avg:
            warnings.append("Champions avg_monetary below overall average -- unexpected")
    check(len(seg.get("playbook", [])) >= 5, "segments.playbook must contain segment actions")
    for row in rows:
        check("recommended_action" in row, f"segment {row.get('segment')} missing recommended_action")

# ---- summary ----
if summ:
    for k in ("customers", "orders", "revenue", "model_roc_auc", "repeat_rate_overall",
              "calibration_mean_abs_error", "threshold_default_expected_net_value"):
        check(k in summ, f"summary missing '{k}'")
    check(0.0 <= summ.get("repeat_rate_overall", -1) <= 1.0, "repeat_rate out of [0,1]")

# ---- sources ----
if src:
    names = [d.get("name", "") for d in src.get("datasets", [])]
    check(any("Online Retail II" in n for n in names), "sources missing Online Retail II")
    check(any("Olist" in n for n in names), "sources missing Olist note")
    lic = [d.get("license") for d in src.get("datasets", []) if "Online Retail II" in d.get("name", "")]
    check("CC BY 4.0" in lic, "Online Retail II license must be CC BY 4.0")
    check("labels" in src and "proposed_requires_olist" in src["labels"],
          "sources missing proposed labels")

# ---- cross-artifact consistency ----
if seg and summ:
    check(seg.get("n_customers") == summ.get("customers"),
          "segments.n_customers != summary.customers")

# ---- scored export + public copies ----
csv_path = os.path.join(PROC, "scored-customers.csv")
if not os.path.exists(csv_path):
    errors.append("MISSING artifact: scored-customers.csv")
else:
    try:
        rows = list(csv.DictReader(open(csv_path)))
        check(len(rows) >= 100, "scored-customers.csv should include at least 100 scored customers")
        check({"customer_id", "segment", "p_repeat", "clv_90d_proxy", "recommended_action"}.issubset(rows[0].keys()),
              "scored-customers.csv missing required columns")
    except Exception as e:  # noqa: BLE001
        errors.append(f"MALFORMED csv scored-customers.csv: {e}")

for rel in ("model_metrics.json", "segments.json", "summary.json", "sources.json", "scored-customers.csv"):
    check(os.path.exists(os.path.join(PUBLIC, rel)), f"missing public copy {rel}")

print("=== VALIDATION ===")
for w in warnings:
    print("WARN:", w)
if errors:
    for e in errors:
        print("FAIL:", e)
    print(f"\n{len(errors)} error(s). VALIDATION FAILED.")
    sys.exit(1)
print(f"All checks passed ({len(warnings)} warning(s)).")
sys.exit(0)
