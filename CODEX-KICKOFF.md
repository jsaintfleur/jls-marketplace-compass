# Marketplace Compass Kickoff

## Expected Work Package

Copy `project-4-marketplace-compass.md` into this repo root as:

```text
WORKPACKAGE.md
```

## Kickoff Command

```text
Read WORKPACKAGE.md — the full package for Marketplace Compass: a leakage-safe validated ML model predicting poor-outcome
orders, plus CLV segmentation and demand forecasting, on the Olist dataset. Execute MC-01 → MC-14 in order.

CRITICAL — enforce the leakage discipline in the Model Card: features restricted to what is knowable at purchase time
(freight, weight/volume, item count, payment type/installments, customer↔seller haversine distance, seller PRIOR-order
late-rate, purchase day/hour, category). EXCLUDE actual delivery date, review text, order status. Use a TEMPORAL train/test
split (no random shuffle), TimeSeriesSplit CV, calibration + Brier, PR-AUC for imbalance, threshold by cost. Add a data-
validation test asserting no leakage feature is present and that metrics files meet the stated thresholds. Also build
RFM + K-means/GMM segments and BG/NBD + Gamma-Gamma CLV (framed as expected-value tiers with the low-repeat caveat), and a
weekly demand forecast benchmarked vs seasonal-naive (MASE<1.0), contextualized against Census MARTS.

Honor the Olist CC BY-NC 4.0 NON-COMMERCIAL license (attribute, never commercialize) and the Brazil≠US caveat (MARTS is a
labeled reference, not a join). App: Landing, Executive Overview, At-Risk Order Queue (TanStack), Customer Value & Segments,
Demand Forecast, Model Card & Methodology (calibration/lift/leakage), About. Indigo #4f46e5 "operations cockpit". Model trained
offline; app consumes precomputed scores. All metrics are measured, never invented. Commit per ticket; pause for GitHub/Vercel
+ Kaggle credentials. Confirm plan, then start MC-01.
```
