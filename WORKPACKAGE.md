# Project 4 — Marketplace Compass

**Portfolio owner:** Jean-Luc Saint-Fleur
**Role framing for this package:** Product Strategist + Analytics Lead
**Sector:** Retail / Consumer / E-Commerce
**Status of package:** Implementation-ready. Datasets verified July 2026.
**Designation:** Portfolio VALIDATED-ML flagship — rigor is the point of this project.

> **LICENSE FLAG (read first, carry everywhere):** The spine dataset (Olist Brazilian E-Commerce) is licensed **CC BY-NC 4.0 — NON-COMMERCIAL**. It is acceptable for a portfolio, **must be attributed to Olist**, and **must never be commercialized**. Every page, the README, the About page, and the model card must display this flag. The U.S. Census MARTS series is public domain and is used **only as an external macro benchmark — never joined to Olist** (Brazil ≠ US).

> **Calculated vs Proposed boundary (global rule):** Anything computed from Olist in the offline pipeline is **Calculated** and may be shown as a measured number. Anything describing production behavior, live intervention, or business ROI is **Proposed** and must be labeled as such. Model performance figures in this document are **targets to be measured on real held-out data**, not asserted results.

---

## PART 1 — PRODUCT ONE-PAGER

### The pitch
**Marketplace Compass — "Turn every order into a retention, service, and expansion decision."**

A marketplace only makes money when an order becomes a repeat customer, and the single biggest driver of a bad review and churn is a poor delivery experience. Marketplace Compass scores every **open** order at purchase time for the risk of a late delivery or a 1–2 star review, ranks which customer segments are worth winning back, forecasts which product categories need capacity next quarter, and scores which states are under-served versus demand — so ops, retention, and expansion teams act *before* an order goes bad.

### Who it's for
- Marketplace / e-commerce operations leaders
- Seller-experience & logistics managers
- CRM / retention analysts
- Regional expansion & strategy teams

### The five decisions it drives
1. **Intervene now** — which OPEN orders are at risk of late delivery / poor review, so ops can expedite, re-route, or pre-empt with the customer.
2. **Win back** — which customer segments carry the most expected value (CLV-ranked tiers).
3. **Provision** — which product categories need inventory / capacity next quarter (forecast).
4. **Expand** — which states/regions are under-served versus demand (expansion scoring).
5. **Coach** — which sellers / routes drive dissatisfaction and need intervention.

### Visual identity — "operations cockpit"
- **Palette:** deep navy `#0B1B2B` + slate `#1E2A38` base; **amber `#F5A623` = at-risk**, **teal `#20B2AA` = healthy**; muted grid lines, high-contrast type.
- **Layout:** map-centric. A Brazil state choropleth anchors the Executive Overview.
- **Trust artifacts, shown on purpose:** the calibration curve and the decile-lift chart are placed prominently as evidence that the model is honest, not just accurate. A model that can't be trusted can't drive an intervention.
- **Feel:** dense but legible; a control room, not a dashboard toy.

### Signature screens
- **Executive Overview:** KPI cards + Brazil choropleth + trend strip.
- **At-Risk Order Queue:** a ranked, filterable TanStack table of open orders with risk score, driver chips, and suggested action.
- **Model Card & Methodology:** calibration curve, decile-lift, leakage disclosure — the credibility centerpiece.

### Headline metric targets (to be measured, not asserted)
ROC-AUC **≥ 0.75**, top-decile lift **≥ 2.5×**, calibrated (low Brier), forecast **MASE < 1.0** vs seasonal-naive. All are acceptance targets validated on temporal held-out data.

---

## PART 2 — PRODUCT REQUIREMENTS DOCUMENT (condensed-complete)

### 1. Problem statement
Marketplaces lose money when orders fail to convert into repeat customers, and the dominant churn driver is a poor delivery experience. Leaders lack a *pre-emptive* signal: they learn an order went bad only after the late delivery or the 1-star review. Marketplace Compass predicts poor outcomes at purchase time and connects that signal to retention, capacity, and expansion decisions.

### 2. Goals & non-goals
**Goals:** (a) score open orders for poor-outcome risk with honest, calibrated probabilities; (b) rank customer value tiers; (c) forecast category/state demand; (d) score regional expansion opportunity; (e) surface seller/route dissatisfaction drivers.
**Non-goals:** real-time in-browser inference; commercial deployment (license-barred); claiming causal ROI; joining Brazilian and US data.

### 3. Target users & JTBD
See Part 1. JTBD: *"When an order comes in, help me know if it will disappoint the customer, so I can intervene before it costs a repeat sale."*

### 4. Use cases
- Ops manager filters the At-Risk Queue to São Paulo, high-freight, long-distance orders and dispatches expedite requests.
- Retention analyst pulls the top CLV tier that has lapsed and builds a win-back list.
- Strategy lead reads the choropleth + expansion score to prioritize a new fulfillment hub state.
- Seller-experience manager reviews sellers with elevated historical late-rate for coaching.

### 5. Scope (MVP)
Seven pages (below), five model outputs (risk scores, segments, CLV tiers, forecasts, expansion scores), all precomputed to Parquet/JSON and consumed by a static-friendly Next.js app.

### 6. Pages / IA
1. **Landing** — concept, license flag, entry.
2. **Executive Overview** — KPI cards, Brazil choropleth, trend strip.
3. **At-Risk Order Queue** — TanStack table of open orders.
4. **Customer Value & Segments** — RFM/segment scatter, CLV tiers.
5. **Demand Forecast** — category/state fan charts, MARTS context strip.
6. **Model Card & Methodology** — calibration, lift, leakage notes, MODEL CARD.
7. **About** — data provenance, license, caveats, calculated-vs-proposed.

### 7. Required visualizations
KPI cards; risk-queue table; Brazil state choropleth (MapLibre); calibration curve (ECharts); decile-lift chart (ECharts); forecast fan chart (ECharts); segment scatter (Recharts). All must have accessible tables/aria alternatives.

### 8. KPI DICTIONARY

Each KPI below specifies name, definition, formula, source, grain, period, inclusion/exclusion, limitations, display, and interpretation. All are **Calculated** from Olist unless noted.

#### KPI 1 — At-Risk Order Rate
- **Definition:** Share of scored orders whose predicted poor-outcome probability exceeds the cost-chosen decision threshold.
- **Formula:** `count(p_hat >= threshold) / count(scored_orders)`.
- **Source:** Olist orders/items/payments/geolocation → model scores.
- **Grain:** order (aggregated to state/category/seller for display).
- **Period:** rolling window of scored open orders; test-set value for reporting.
- **Inclusion/Exclusion:** include orders with complete purchase-time features; exclude cancelled/unavailable at scoring; exclude orders missing geolocation for the distance feature (flag imputation).
- **Limitations:** depends on threshold choice; class imbalance (~15–20% positives) inflates sensitivity to threshold.
- **Display:** amber KPI card + trend.
- **Interpretation:** higher = more open orders need ops attention now.

#### KPI 2 — On-Time Delivery Rate
- **Definition:** Share of delivered orders where actual delivery date ≤ estimated delivery date.
- **Formula:** `count(order_delivered_customer_date <= order_estimated_delivery_date) / count(delivered orders)`.
- **Source:** Olist orders (delivery timestamps). **Used for label construction & monitoring only — NOT a model input (leakage).**
- **Grain:** order → state/seller aggregates.
- **Period:** monthly / cohort.
- **Inclusion/Exclusion:** include status = delivered with both dates present; exclude in-transit, cancelled, null-date orders.
- **Limitations:** estimated date is a carrier promise, not a true SLA; static 2016–2018 window.
- **Display:** teal KPI card; choropleth layer.
- **Interpretation:** the ground-truth service quality the model is trying to anticipate.

#### KPI 3 — 90-Day Expected Customer Value
- **Definition:** Model-expected monetary value of a customer over a 90-day horizon (BG/NBD × Gamma-Gamma), expressed as tiers.
- **Formula:** `E[transactions_90d | BG/NBD] × E[monetary | Gamma-Gamma]`.
- **Source:** Olist orders + payments keyed on `customer_unique_id`.
- **Grain:** customer_unique_id.
- **Period:** 90-day forward horizon from calibration cutoff.
- **Inclusion/Exclusion:** include customers with ≥1 purchase and valid monetary; frequency uses repeat transactions only.
- **Limitations:** **Olist repeat rate is very low**, so CLV is framed as *relative expected-value tiers*, not dollar guarantees. Report as ranked tiers with a prominent low-repeat caveat.
- **Display:** tiered badges + segment scatter color.
- **Interpretation:** relative prioritization for retention/win-back, not a spend forecast.

#### KPI 4 — Category Demand Index
- **Definition:** Forecasted next-period weekly order volume for a category indexed to its trailing baseline (100 = baseline).
- **Formula:** `forecast_next_period / trailing_52w_mean × 100`.
- **Source:** Olist orders × products (category), weekly resample.
- **Grain:** category × week (optionally × state).
- **Period:** forward 4–13 weeks.
- **Inclusion/Exclusion:** include categories with sufficient history (≥ N weeks); exclude sparse categories (flag).
- **Limitations:** short 2-year history limits seasonal estimation; benchmark context only vs MARTS (different geography).
- **Display:** forecast fan chart + index cards.
- **Interpretation:** >100 = rising demand → provision capacity/inventory.

#### KPI 5 — Model Top-Decile Lift
- **Definition:** Ratio of poor-outcome rate in the model's top-scored 10% of orders to the overall base rate.
- **Formula:** `positive_rate(top_decile) / positive_rate(all)`.
- **Source:** model scores on temporal test set.
- **Grain:** decile of scored orders.
- **Period:** held-out test window (newest orders).
- **Inclusion/Exclusion:** test-set orders only; no training data.
- **Limitations:** a ranking-quality metric, not calibration; sensitive to base rate.
- **Display:** decile-lift bar chart on Model Card.
- **Interpretation:** ≥ 2.5× means targeting the top decile finds poor outcomes 2.5× more efficiently than random — the core operational value.

*(Supporting KPIs displayed but abbreviated: Expansion Opportunity Score per state = demand-vs-served gap; Seller Late-Rate = prior-orders-only historical late share; Freight-to-Price Ratio.)*

### 9. Data model & sources
Olist 9 relational CSVs joined on `order_id`, `customer_unique_id`, `seller_id`, `product_id`, `zip_code_prefix → geolocation`. ~99k orders, 27 states, 2016–2018, ~120 MB — laptop-scale (pandas/DuckDB/Polars). MARTS Advance Monthly Retail Sales via Census API used **only** as a macro e-commerce-trend reference strip.

### 10. Analytics & modeling requirements
See Part 2 §"Model Card" and Part 1 targets. Binary classification headline; RFM + K-means/GMM segmentation; BG/NBD + Gamma-Gamma CLV; SARIMA/Prophet/LightGBM forecasting with Brazilian-holiday regressors benchmarked against seasonal-naive.

### 11. KPI acceptance thresholds
ROC-AUC ≥ 0.75; PR-AUC materially above base rate; top-decile lift ≥ 2.5×; Brier score reported with calibration curve; forecast MASE < 1.0 vs seasonal-naive. All measured on temporal held-out data.

### 12. UX / interaction
Filterable queue (state, category, seller, risk band); choropleth hover → state detail; forecast horizon selector; segment scatter brush; every chart has a "view as table" accessible fallback.

### 13. Visual & brand system
Operations-cockpit theme (Part 1). Amber = at-risk, teal = healthy, applied consistently across cards, table row flags, map, and charts. WCAG-AA contrast enforced; color never the sole signal (icons + labels).

### 14. Responsiveness
Mobile: stacked KPI cards, map collapses to a ranked state list, table becomes card rows. Breakpoints via Tailwind; charts use responsive containers.

### 15. Accessibility (WCAG 2.1 AA)
Semantic landmarks; keyboard-navigable table and filters; aria-labels on chart SVGs with data-table equivalents; focus-visible rings; prefers-reduced-motion respected; contrast ≥ 4.5:1; color-blind-safe amber/teal pairing verified.

### 16. Performance
Precomputed Parquet/JSON, no client inference. Route-level code splitting; lazy-load ECharts/MapLibre; virtualized table rows; target LCP < 2.5s, initial JS < 200KB gzip on Overview; static generation where possible.

### 17. Testing strategy
Vitest + RTL for components; Playwright for page smoke + a11y; **data-validation test asserting no leakage feature is present in the feature manifest**; test asserting metrics JSON files exist and thresholds are met; Zod-validated data contracts at load.

### 18. Deployment
GitHub Actions CI (lint, typecheck, unit, e2e, data-validation) → Vercel. Pipeline artifacts (Parquet/JSON) committed or fetched at build; model trained offline.

### 19. GitHub / documentation
README with license flag, data provenance, run instructions, calculated-vs-proposed table; `/notebooks` for EDA + model dev; `/models` for saved artifacts; model card as markdown + in-app page; CONTRIBUTING and data-license notice.

### 20. Acceptance criteria (product-level)
All seven pages render from precomputed data; every required viz present with accessible fallback; KPI dictionary values reconcile to pipeline outputs; model card shows calibration + lift + leakage disclosure; license flag visible on Landing, Model Card, About; CI green.

### 21. Stretch goals
Optional Next.js route handler scoring a hypothetical order from saved model params (no training in-browser); SHAP-driven per-order driver explanations; seller-coaching drill-down; what-if freight/distance slider.

### 22. Risks & mitigations
| Risk | Mitigation |
|---|---|
| **Olist NON-COMMERCIAL license (CC BY-NC 4.0)** | Prominent flag on Landing/Model Card/About + README; attribution to Olist; no commercial use, ever. |
| **Static data (2016–2018)** | Label as historical; frame app as methodology demonstration; MARTS strip for macro context only. |
| **Brazil ≠ US** | MARTS used as reference, never joined; caveat repeated on Forecast page. |
| **Low repeat rate weakens CLV** | Present CLV as relative tiers with caveat, not dollar guarantees. |
| **Class imbalance (~15–20%)** | PR-AUC, class weights, threshold by cost, calibration reported. |
| **Leakage** | Purchase-time-only feature manifest; automated leakage test; seller late-rate on prior orders only. |
| **Calculated vs proposed confusion** | Explicit labels on every metric and every production-behavior claim. |

---

### MODEL CARD (subsection — the credibility centerpiece)

**Model name:** Marketplace Compass — Poor-Outcome Order Classifier
**Owner:** Jean-Luc Saint-Fleur (portfolio)
**Version:** v0.1 (offline, portfolio)
**Date:** July 2026

**Intended use:** Rank open orders by probability of a poor outcome (late delivery vs estimate OR review score ≤ 2) to prioritize operational intervention. Portfolio / educational only. **NOT for commercial deployment (license-barred).**

**Out-of-scope use:** Causal claims; individual customer penalization; any commercial or US-market decision.

**Label definition:** `poor_outcome = 1` if `actual_delivery > estimated_delivery` OR `review_score <= 2`, else `0`. Base rate expected ~15–20% (to be measured).

**Features (purchase/approval-time ONLY — leakage-guarded):**
- `freight_value`
- product `weight`, `length/height/width` → volume
- `item_count` per order
- `payment_type`, `installments`
- customer↔seller **haversine distance** from geolocation lat/long
- **seller historical late-rate computed on PRIOR orders only** (time-aware, no future leakage)
- purchase `day_of_week`, `hour`, month
- product `category`

**Explicitly EXCLUDED (post-hoc / leakage):** actual delivery date, review score/text (except as label), final order status, any field unknowable at purchase.

**Model:** Gradient boosting (XGBoost or LightGBM) with a **logistic-regression baseline** for reference. Early stopping + regularization to guard overfitting.

**Validation protocol:**
- **Temporal split** — train ≤ mid-2018, test = newest orders. No random shuffle (prevents temporal leakage).
- **TimeSeriesSplit CV** for hyperparameter tuning.
- **Calibration curve + Brier score** reported; isotonic/Platt calibration if needed.
- **PR-AUC** emphasized due to imbalance; ROC-AUC reported.
- **Threshold chosen by cost** (asymmetric cost of missed poor outcome vs unnecessary intervention).
- Metrics reported **with confidence intervals** (bootstrap on test set).

**Target metrics — TO BE MEASURED ON REAL HELD-OUT DATA, NOT ASSERTED RESULTS:**
| Metric | Target range (acceptance) | Status |
|---|---|---|
| ROC-AUC | ≥ 0.75 (expected ~0.75–0.82) | To be measured |
| PR-AUC | materially > base rate | To be measured |
| Top-decile lift | ≥ 2.5× (expected ~2.5–3.5×) | To be measured |
| Brier score | low / well-calibrated | To be measured |

**Ethical & fairness notes:** Do not use to penalize sellers without human review; seller late-rate reflects logistics context, not intent. Geolocation is noisy; distance is approximate.

**Caveats:** Static 2016–2018 Brazil data; class imbalance; noisy geolocation; short window limits seasonality. Performance on any other marketplace is unknown.

---

## PART 3 — CODEX IMPLEMENTATION PACKAGE

### Repository
**`jls-marketplace-compass`**

### Objective
Ship a Next.js 15 App Router application that consumes **precomputed** model outputs (scored orders, segments, CLV tiers, forecasts, expansion scores) from an offline Python pipeline, presenting them across seven pages with rigorous trust artifacts (calibration, lift, leakage disclosure). No in-browser model training/inference (optional stretch route handler scores from saved params only).

### Architecture
- **Offline pipeline (Python 3.12):** DuckDB/Polars ingest → clean/join 9 Olist tables → leakage-guarded feature engineering → temporal split → train (XGBoost/LightGBM + LR baseline) → evaluate (calibration, PR-AUC, lift, CIs) → SHAP → CLV (lifetimes) → forecasts (SARIMA/Prophet/LightGBM) → export Parquet/JSON to `web/public/data`.
- **Web app (Next.js 15, TS strict):** static-friendly pages reading versioned Parquet/JSON; Zod-validated contracts; Recharts + ECharts + MapLibre; TanStack Table.
- **Optional route handler:** `/api/score` loads saved model params and scores a hypothetical order (stretch).

### Folder structure
```
jls-marketplace-compass/
├─ pipeline/
│  ├─ ingest/            # kaggle download (olist), census MARTS API pull
│  ├─ transform/         # clean, join 9 tables, feature engineering
│  ├─ features/          # feature manifest (leakage-guarded, single source of truth)
│  ├─ models/            # train, evaluate, calibrate, shap
│  ├─ clv/               # BG/NBD + Gamma-Gamma
│  ├─ forecast/          # sarima/prophet/lightgbm + holiday regressors
│  ├─ export/            # write parquet/json to web/public/data
│  └─ config.py
├─ notebooks/            # EDA + model development (exploratory)
├─ models/               # saved artifacts (model.json/.txt, calibrator, params, metrics.json, shap.json)
├─ web/
│  ├─ app/
│  │  ├─ page.tsx                    # Landing
│  │  ├─ overview/page.tsx
│  │  ├─ risk-queue/page.tsx
│  │  ├─ segments/page.tsx
│  │  ├─ forecast/page.tsx
│  │  ├─ model-card/page.tsx
│  │  ├─ about/page.tsx
│  │  └─ api/score/route.ts          # optional stretch
│  ├─ components/        # KpiCard, RiskQueueTable, BrazilChoropleth, CalibrationCurve, DecileLift, ForecastFanChart, SegmentScatter, LicenseFlag, Nav
│  ├─ lib/               # data loaders, zod schemas, formatters, theme
│  └─ public/data/       # exported parquet/json
├─ tests/                # vitest, playwright, data-validation (leakage + metrics)
├─ .github/workflows/ci.yml
├─ README.md
├─ MODEL_CARD.md
└─ DATA_LICENSE.md       # CC BY-NC 4.0 flag + attribution
```

### Ingestion plan
1. **Olist:** download via Kaggle API (`olistbr/brazilian-ecommerce`), 9 CSVs → `pipeline/ingest`. Record source + CC BY-NC 4.0 license in `DATA_LICENSE.md`.
2. **MARTS:** pull Advance Monthly Retail Sales from Census EITS timeseries API → store as a separate context table. **Never joined to Olist.**
3. Load into DuckDB for relational joins.

### Transformation plan
1. **Clean:** parse timestamps, handle nulls, dedupe geolocation, standardize category via translation table.
2. **Join:** orders ⋈ order_items ⋈ payments ⋈ reviews ⋈ customers ⋈ sellers ⋈ products ⋈ geolocation on documented keys.
3. **Label:** construct `poor_outcome` (late vs estimate OR review ≤ 2).
4. **Feature engineering (leakage-guarded):** build ONLY purchase-time features from the feature manifest; compute seller late-rate over **prior orders only** (expanding, time-ordered); haversine customer↔seller distance.
5. **Temporal split:** train ≤ mid-2018, test = newest orders.
6. **Train + evaluate:** XGBoost/LightGBM + LR baseline; TimeSeriesSplit tuning; early stopping; calibration; PR-AUC/ROC-AUC/lift/Brier with bootstrap CIs; SHAP export.
7. **CLV:** BG/NBD + Gamma-Gamma via `lifetimes` on `customer_unique_id`; export tiers with low-repeat caveat metadata.
8. **Forecast:** weekly volume by category/state; SARIMA/Prophet/LightGBM + Brazilian-holiday regressors; MASE vs seasonal-naive; export fan-chart bands.
9. **Export:** Parquet + JSON (scored orders, segments, CLV tiers, forecasts, expansion scores, metrics, SHAP) to `web/public/data`.

### Component list
`LicenseFlag`, `Nav`, `KpiCard`, `RiskQueueTable` (TanStack), `BrazilChoropleth` (MapLibre), `CalibrationCurve` (ECharts), `DecileLift` (ECharts), `ForecastFanChart` (ECharts), `SegmentScatter` (Recharts), `TrendStrip`, `DataTableFallback`, `ThemeProvider`.

### Page list
Landing, Executive Overview, At-Risk Order Queue, Customer Value & Segments, Demand Forecast, Model Card & Methodology, About.

### Route-handler needs
Optional `POST /api/score` — validates a hypothetical order payload with Zod, loads saved model params from `models/`, returns a calibrated probability + top SHAP drivers. No training; clearly labeled stretch/experimental.

### Testing plan
- **Unit (Vitest + RTL):** KPI card formatting, table sorting/filtering, chart data mappers, Zod schema parsing.
- **E2E (Playwright):** each page renders from fixtures; a11y checks (axe); keyboard nav on queue.
- **Data-validation test (critical):** assert the exported feature manifest contains **none** of the forbidden leakage fields (actual delivery date, review score/text, final status); fail CI if present.
- **Metrics test:** assert `models/metrics.json` exists and reported ROC-AUC ≥ 0.75, top-decile lift ≥ 2.5×, forecast MASE < 1.0; fail CI otherwise.

### A11y checklist
Landmarks; keyboard nav; aria-labelled charts + table fallbacks; contrast AA; focus-visible; reduced-motion; color-blind-safe amber/teal.

### Performance checklist
No client inference; route code-splitting; lazy ECharts/MapLibre; virtualized rows; LCP < 2.5s; static generation for Overview/Model Card/About.

### Deploy checklist
CI (lint, typecheck, vitest, playwright, data-validation) green → Vercel; data artifacts present at build; environment documented.

### Git branch strategy
`main` (protected) ← `develop` ← feature branches `feat/mc-XX-*`. PR required, CI must pass, one reviewer (self-review checklist for portfolio).

### Commit plan
Conventional commits, one logical change per commit, tied to tickets (see Part 4). Squash-merge feature branches.

### Definition of Done
All seven pages render from precomputed data; every required viz + accessible fallback present; KPI dictionary reconciles to exports; model card shows calibration + lift + leakage disclosure; leakage + metrics tests pass; license flag on Landing/Model Card/About; CI green on Vercel; README + MODEL_CARD + DATA_LICENSE complete; calculated-vs-proposed labels applied.

---

## PART 4 — TICKETS

> Convention: `feat/mc-XX-slug`; commit format `type(scope): summary`.

### MC-01 — Repo scaffold & tooling
- **Objective:** Initialize monorepo (`pipeline/`, `web/`, `notebooks/`, `models/`, `tests/`) with Next.js 15 App Router, TS strict, Tailwind, ESLint/Prettier, Vitest, Playwright.
- **Files:** root configs, `web/app/layout.tsx`, `tsconfig.json`, `.eslintrc`, `vitest.config.ts`, `playwright.config.ts`.
- **Dependencies:** none.
- **Instructions:** scaffold app, enable TS strict, add theme tokens (navy/slate/amber/teal), set up CI skeleton.
- **Tests:** CI runs lint + typecheck + empty test suite green.
- **Acceptance:** `pnpm dev` renders a themed shell; CI passes.
- **Commit:** `chore(repo): scaffold next15 app, pipeline dirs, and tooling`

### MC-02 — Data ingestion (Olist + MARTS)
- **Objective:** Download Olist 9 CSVs (Kaggle) and MARTS series (Census API) into the pipeline.
- **Files:** `pipeline/ingest/olist.py`, `pipeline/ingest/marts.py`, `DATA_LICENSE.md`.
- **Dependencies:** MC-01.
- **Instructions:** authenticate Kaggle, pull dataset; pull MARTS via EITS API; write `DATA_LICENSE.md` with CC BY-NC 4.0 flag + Olist attribution + MARTS public-domain note.
- **Tests:** ingest script asserts 9 tables + expected row counts; MARTS stored separately.
- **Acceptance:** raw data present; license file complete.
- **Commit:** `feat(ingest): download olist csvs and census MARTS benchmark`

### MC-03 — Clean & join relational tables
- **Objective:** Clean and join 9 Olist tables in DuckDB into an analysis base.
- **Files:** `pipeline/transform/clean.py`, `pipeline/transform/join.py`.
- **Dependencies:** MC-02.
- **Instructions:** parse timestamps, dedupe geolocation, translate categories, join on documented keys.
- **Tests:** row-count and key-integrity assertions; no unexpected fan-out.
- **Acceptance:** joined base table reproducible.
- **Commit:** `feat(transform): clean and join nine olist tables`

### MC-04 — Label construction & leakage-guarded feature manifest
- **Objective:** Build `poor_outcome` label and a purchase-time-only feature manifest.
- **Files:** `pipeline/transform/label.py`, `pipeline/features/manifest.py`, `pipeline/features/build.py`.
- **Dependencies:** MC-03.
- **Instructions:** label = late-vs-estimate OR review ≤ 2; build features (freight, weight/volume, item count, payment/installments, haversine distance, prior-orders seller late-rate, purchase time, category); centralize forbidden-field list.
- **Tests:** unit test asserting manifest excludes all forbidden leakage fields; seller late-rate uses only prior orders.
- **Acceptance:** feature matrix + manifest emitted.
- **Commit:** `feat(features): build leakage-guarded feature manifest and label`

### MC-05 — Temporal split, train, evaluate, calibrate
- **Objective:** Train XGBoost/LightGBM + LR baseline with temporal split and honest evaluation.
- **Files:** `pipeline/models/train.py`, `pipeline/models/evaluate.py`, `models/metrics.json`, `models/shap.json`.
- **Dependencies:** MC-04.
- **Instructions:** temporal split (train ≤ mid-2018, test newest); TimeSeriesSplit tuning; early stopping/regularization; calibration curve + Brier; PR-AUC/ROC-AUC/decile-lift with bootstrap CIs; SHAP export.
- **Tests:** metrics file exists; thresholds asserted (ROC-AUC ≥ 0.75, lift ≥ 2.5×) — see MC-13.
- **Acceptance:** metrics + SHAP + saved model artifacts produced.
- **Commit:** `feat(models): temporal train, calibrated eval, and shap export`

### MC-06 — CLV (BG/NBD + Gamma-Gamma)
- **Objective:** Compute 90-day expected-value tiers with low-repeat caveat.
- **Files:** `pipeline/clv/fit.py`, export `segments_clv.parquet/json`.
- **Dependencies:** MC-03.
- **Instructions:** fit `lifetimes` models on `customer_unique_id`; output relative tiers + caveat metadata.
- **Tests:** tier counts sum to customer base; caveat flag present in export.
- **Acceptance:** CLV tiers exported.
- **Commit:** `feat(clv): bg/nbd and gamma-gamma expected-value tiers`

### MC-07 — Segmentation (RFM + K-means/GMM)
- **Objective:** Produce customer segments for the scatter.
- **Files:** `pipeline/clv/segment.py`, export `segments.parquet/json`.
- **Dependencies:** MC-06.
- **Instructions:** RFM features → K-means/GMM; label segments; export coordinates + segment id.
- **Tests:** deterministic seed; segment sizes exported.
- **Acceptance:** segment file ready for scatter.
- **Commit:** `feat(segments): rfm clustering for value segments`

### MC-08 — Forecasting (category/state)
- **Objective:** Weekly demand forecasts with Brazilian-holiday regressors, MASE < 1.0 vs seasonal-naive.
- **Files:** `pipeline/forecast/run.py`, export `forecasts.parquet/json`.
- **Dependencies:** MC-03.
- **Instructions:** weekly resample by category/state; SARIMA/Prophet/LightGBM + holiday regressors; compute MASE vs seasonal-naive; export point + interval bands.
- **Tests:** MASE computed and stored; benchmark comparison present.
- **Acceptance:** forecast bands exported with MASE metadata.
- **Commit:** `feat(forecast): weekly category/state demand with holiday regressors`

### MC-09 — Expansion scoring & export bundle
- **Objective:** Compute state expansion opportunity scores and finalize all JSON/Parquet exports.
- **Files:** `pipeline/export/build.py`, `web/public/data/*`.
- **Dependencies:** MC-05, MC-07, MC-08.
- **Instructions:** demand-vs-served gap per state; write scored orders, segments, CLV, forecasts, expansion scores, metrics to `web/public/data`.
- **Tests:** all expected export files exist and validate against Zod schemas.
- **Acceptance:** web app has complete data inputs.
- **Commit:** `feat(export): expansion scores and web data bundle`

### MC-10 — Core UI shell, theme, KPI cards, Landing + Overview + choropleth
- **Objective:** Build the operations-cockpit shell, Landing, Executive Overview with KPI cards and Brazil choropleth.
- **Files:** `web/components/{KpiCard,BrazilChoropleth,LicenseFlag,Nav,TrendStrip}.tsx`, `web/app/page.tsx`, `web/app/overview/page.tsx`, `web/lib/{data,schemas,theme}.ts`.
- **Dependencies:** MC-09.
- **Instructions:** navy/slate theme, amber/teal accents; MapLibre state choropleth; KPI cards from KPI dictionary; LicenseFlag on Landing.
- **Tests:** RTL for KPI card formatting; Playwright render + axe.
- **Acceptance:** Overview renders from data with map + cards.
- **Commit:** `feat(web): cockpit shell, kpi cards, and brazil choropleth`

### MC-11 — At-Risk Order Queue (TanStack)
- **Objective:** Ranked, filterable open-order queue with risk score, driver chips, suggested action.
- **Files:** `web/components/RiskQueueTable.tsx`, `web/app/risk-queue/page.tsx`.
- **Dependencies:** MC-10.
- **Instructions:** TanStack Table with sort/filter (state/category/seller/risk band), virtualized rows, amber row flags, accessible table semantics.
- **Tests:** RTL sort/filter; Playwright keyboard nav; a11y.
- **Acceptance:** queue filters and ranks correctly.
- **Commit:** `feat(web): at-risk order queue with tanstack table`

### MC-12 — Segments, Forecast, Model Card, About pages
- **Objective:** Build remaining pages incl. calibration, decile-lift, forecast fan chart, segment scatter, and full model card.
- **Files:** `web/app/{segments,forecast,model-card,about}/page.tsx`, `web/components/{CalibrationCurve,DecileLift,ForecastFanChart,SegmentScatter}.tsx`, `MODEL_CARD.md`.
- **Dependencies:** MC-10.
- **Instructions:** ECharts calibration + lift + fan chart; Recharts segment scatter; MARTS context strip on Forecast (caveat); render model card with leakage disclosure + license flag; About with provenance + calculated-vs-proposed table.
- **Tests:** RTL chart mappers; Playwright render + axe; license flag present on Model Card + About.
- **Acceptance:** all pages complete with trust artifacts.
- **Commit:** `feat(web): segments, forecast, model card, and about pages`

### MC-13 — Data-validation & metrics-threshold tests
- **Objective:** CI gates for leakage and metric thresholds.
- **Files:** `tests/data-validation.spec.ts`, `tests/metrics.spec.ts`.
- **Dependencies:** MC-05, MC-09.
- **Instructions:** assert exported feature manifest contains no forbidden leakage fields; assert `metrics.json` exists and ROC-AUC ≥ 0.75, top-decile lift ≥ 2.5×, forecast MASE < 1.0.
- **Tests:** the tests themselves; must fail on injected leakage field or missing metric.
- **Acceptance:** CI fails if leakage present or thresholds unmet.
- **Commit:** `test(ci): leakage guard and metrics-threshold gates`

### MC-14 — CI/CD, docs, and optional scoring route handler
- **Objective:** Finalize GitHub Actions, README/docs, and stretch `/api/score`.
- **Files:** `.github/workflows/ci.yml`, `README.md`, `web/app/api/score/route.ts`.
- **Dependencies:** MC-13.
- **Instructions:** CI (lint, typecheck, vitest, playwright, data-validation) → Vercel; README with license flag, provenance, run steps, calculated-vs-proposed table; optional route handler scoring a hypothetical order from saved params (Zod-validated, clearly labeled stretch).
- **Tests:** CI green end-to-end; route handler unit test with fixture params.
- **Acceptance:** deploys to Vercel; docs complete.
- **Commit:** `feat(ci): deploy pipeline, docs, and optional scoring route`

---

## PART 5 — GO-TO-MARKET

### Recruiter description (2–3 sentences)
Marketplace Compass is a validated-ML e-commerce operations product that scores every open order at purchase time for the risk of a late delivery or poor review, then connects that signal to retention, capacity, and expansion decisions. Built on the Olist Brazilian E-Commerce dataset (CC BY-NC 4.0, non-commercial), it emphasizes methodological rigor: strict purchase-time-only features to prevent leakage, temporal train/test validation, calibrated probabilities, and decile-lift as the operational proof. The Next.js app consumes precomputed scores and surfaces trust artifacts (calibration curve, lift chart, leakage disclosure) as first-class UI.

### Resume bullets (honest, capability-framed)
- Built an end-to-end validated-ML pipeline (Python 3.12, DuckDB/Polars, XGBoost/LightGBM) predicting poor-outcome e-commerce orders on ~99k Olist orders, using a **temporal train/test split, TimeSeriesSplit tuning, calibration + Brier score, and PR-AUC** to target ROC-AUC ≥ 0.75 and top-decile lift ≥ 2.5× on held-out data.
- Enforced **leakage discipline** by restricting features to purchase-time-knowable signals (freight, distance via geolocation haversine, prior-orders seller late-rate) and shipped an automated CI test that fails the build if any post-hoc field enters the feature set.
- Designed a Next.js 15 / TypeScript operations cockpit with a Brazil state choropleth (MapLibre), a TanStack at-risk order queue, and calibration/decile-lift trust artifacts, plus BG/NBD + Gamma-Gamma CLV tiers and holiday-aware demand forecasts benchmarked against seasonal-naive (MASE < 1.0).

### LinkedIn launch post (~150 words)
Shipped Project 4 of my analytics portfolio: **Marketplace Compass — "turn every order into a retention, service, and expansion decision."**

A marketplace only makes money when an order becomes a repeat customer, and the #1 driver of churn is a bad delivery experience. So I built a model that scores every *open* order at purchase time for the risk of a late delivery or a 1–2 star review — before it goes bad.

What I'm most proud of is the rigor, not just the accuracy:
• Purchase-time-only features, with a CI test that fails the build if any leakage field sneaks in
• Temporal train/test split + TimeSeriesSplit tuning (no shuffling the future into the past)
• Calibration curves and decile-lift shown in the UI as trust artifacts

Built on the Olist dataset (CC BY-NC 4.0, non-commercial, attributed). Stack: Python, XGBoost/LightGBM, Next.js 15, MapLibre. Metrics are honest targets measured on held-out data.

Feedback welcome. 👇

---

*Data license: Olist Brazilian E-Commerce © Olist, CC BY-NC 4.0 (non-commercial, attribution required). U.S. Census MARTS: public domain, used as macro benchmark only — not joined to Olist. Brazil ≠ US. Model metrics are acceptance targets to be measured on real held-out data, not asserted results.*
