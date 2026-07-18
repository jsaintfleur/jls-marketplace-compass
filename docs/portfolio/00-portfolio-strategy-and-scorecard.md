# Jean-Luc Saint-Fleur — Data & AI Portfolio Strategy

**Five flagship, production-quality data products across five industries.**
Prepared by the Portfolio Architect · 2026-07-17 · All datasets verified against live public sources.

---

## 1. Portfolio thesis

This is not a folder of notebooks. It is five separate, deployable decision-support **products**, each built the way a high-performing internal analytics team at a Fortune-50 company would build it: a real business problem, credible public data, a defensible analytical method, an executive-ready interface, and honest documentation of limitations.

The through-line a hiring manager should read in under two minutes: **Jean-Luc turns messy public data into decisions.** Every product answers *what is happening, why, where, who is affected, what is likely next, and what to do* — and is explicit about what the data can and cannot support.

Positioning target roles: Data Analyst, Senior Data Analyst, Business Intelligence, Product Analytics, Analytics Engineering, Operations Analytics, and applied-AI roles.

Shared engineering standard (all five): **Next.js 15 (App Router) · TypeScript (strict) · Tailwind · Radix/shadcn · MapLibre/Recharts/ECharts · TanStack Table** on the front end; **Python 3.12 · Polars/Pandas · DuckDB · scikit-learn** for reproducible pipelines that export validated Parquet/JSON the app consumes; **Zod · Vitest · React Testing Library · Playwright · ESLint/Prettier · GitHub Actions · Vercel** for quality and delivery. Data is computed and validated offline; the browser consumes clean, optimized artifacts.

---

## 2. The five selected products

| # | Product | Sector | One-line problem it solves | Signature analytics |
|---|---------|--------|----------------------------|---------------------|
| 1 ★ | **ShelterShield** | Government / Housing / Community Development | Where should scarce community-development capital go *before* a neighborhood tips into displacement? | Validated composite displacement-risk index + capital-prioritization engine + geospatial hot-spot analysis |
| 2 | **PulseCredit** | Financial Services / FinTech | Where is consumer credit stress building, months before it hits charge-offs and regulators? | Delinquency forecasting + macro scenario modeling + complaint anomaly detection |
| 3 | **CareShed** | Healthcare / Public Health | Where are the care-access deserts, how severe is the equity gap, and why? | Care-access geospatial mapping + health-equity composite index + explainable county risk model (SHAP) |
| 4 | **Marketplace Compass** | Retail / Consumer / E-Commerce | Which orders will go bad, which customers are worth keeping, and what will demand be? | Leakage-safe validated ML (gradient boosting) + CLV segmentation + demand forecasting |
| 5 | **TransitShield** | Transportation / Climate / Urban Mobility | Which transit stations fail first when the climate turns, and who gets stranded? | Reliability + anomaly detection + climate-vulnerability composite + storm scenario simulation |

★ = flagship, built first.

Each solves a **distinct** business problem in a **distinct** industry with a **distinct** analytical signature — no two are the same product wearing different colors.

---

## 3. Project scorecard

Each concept was scored 1–10 on ten criteria during verified dataset research. Scores reflect the specific data and method now locked for each product.

| Criterion | ShelterShield | PulseCredit | CareShed | Marketplace Compass | TransitShield |
|-----------|:---:|:---:|:---:|:---:|:---:|
| Hiring relevance | 10 | 10 | 9 | 9 | 9 |
| Business value | 9 | 9 | 9 | 9 | 9 |
| Analytical depth | 9 | 9 | 9 | 9 | 9 |
| Data availability | 9 | 10 | 9 | 8 | 9 |
| Visual potential | 9 | 8 | 9 | 9 | 9 |
| Technical differentiation | 8 | 8 | 8 | 8 | 8 |
| Feasibility | 8 | 8 | 8 | 10 | 7 |
| Portfolio uniqueness | 9 | 9 | 8 | 7 | 8 |
| Recruiter accessibility | 8 | 8 | 8 | 8 | 8 |
| Executive usefulness | 9 | 9 | 9 | 9 | 9 |
| **Total / 100** | **88** | **88** | **86** | **86** | **85** |

All five clear the bar. The spread is narrow by design — every project was selected to be portfolio-worthy, not to fill a sector quota.

---

## 4. Portfolio-wide analytical coverage

The five products were selected as a *set* to demonstrate breadth. Coverage against the required capability matrix:

| Capability | Covered by | Requirement | Status |
|------------|-----------|-------------|:---:|
| Geospatial analysis | ShelterShield, CareShed, TransitShield | ≥ 2 | ✅ 3 |
| Forecasting / scenario modeling | PulseCredit, Marketplace Compass, TransitShield | ≥ 2 | ✅ 3 |
| Validated machine-learning model | Marketplace Compass (headline), CareShed (explainable classifier) | ≥ 1 | ✅ 2 |
| Composite index / scoring model | ShelterShield, CareShed, TransitShield | ≥ 1 | ✅ 3 |
| Recommendation / prioritization framework | ShelterShield (capital allocation) | ≥ 1 | ✅ 1 |
| Anomaly detection | PulseCredit, TransitShield | — | ✅ 2 |
| Segmentation / clustering | Marketplace Compass, CareShed | — | ✅ 2 |
| Data cleaning · EDA · KPI development · benchmarking · reproducible transforms · data-quality validation · explainable modeling · actionable recommendations | All five | Every project | ✅ |

Machine learning appears only where it improves the product (order-risk prediction; explainable equity risk). No model is added merely to claim "AI."

---

## 5. Data integrity commitments (apply to all five)

- **Only credible, public, legally usable data.** Every dataset was verified live for source, working URL, license, cadence, and coverage.
- **License flags carried into every build:** County Health Rankings (CareShed) is non-commercial with attribution; Olist (Marketplace Compass) is CC BY-NC 4.0 non-commercial; Eviction Lab (ShelterShield) is non-commercial with attribution. All acceptable for a personal portfolio *with attribution*; each repo's `DATA_SOURCES.md` states the restriction and every product's UI attributes sources.
- **No fabrication** of data, findings, metrics, users, testimonials, or business impact.
- **Calculated vs. proposed** is labeled everywhere: computed results are distinguished from proposed future capabilities, in the UI and the docs.
- **Uncertainty is shown, not hidden:** margins of error, small-count suppression, modeled-estimate caveats, and index-weighting sensitivity are surfaced, not buried.
- **No PII, no restricted or improperly licensed data** is committed to any repository.

---

## 6. Suggested project execution order

1. **ShelterShield (flagship) — build first.** It is Jean-Luc's authentic domain signature (community development), the deepest analytical showcase (validated composite index + prioritization + geospatial), and it establishes the reusable foundation: the shared design system, the Python→Parquet→Next.js pipeline pattern, the MapLibre choropleth components, the CI/testing/Vercel scaffold, and the documentation template every later project reuses.
2. **CareShed — second.** Reuses ShelterShield's geospatial + composite-index machinery almost directly (census-geography choropleths, index construction, sensitivity analysis), so it ships fast while adding the explainable-ML dimension.
3. **PulseCredit — third.** Pivots to time-series (forecasting, scenario, anomaly). All-open, API-friendly data and a chart-forward (non-map) UI diversify the portfolio's visual range.
4. **Marketplace Compass — fourth.** The dedicated validated-ML flagship model; a single clean dataset makes it fast to a polished result and adds the customer-analytics/ML-rigor signal.
5. **TransitShield — fifth.** The most integration-heavy (station-ID crosswalks, network reachability, scenario precompute); best built last when the geospatial and pipeline patterns are mature.

---

## 7. Deliverables index

| File | Contents |
|------|----------|
| `00-portfolio-strategy-and-scorecard.md` | This document: thesis, scorecard, coverage, execution order |
| `design-system-and-quality-rubric.md` | Shared design system (tokens, type, palettes, components, states, a11y) + 10-lens quality rubric + Definition of Done |
| `project-1-sheltershield-PRD-and-codex-package.md` | Flagship: full 22-section PRD + KPI dictionary + Codex package + 16 tickets |
| `project-2-pulsecredit.md` | Financial services: PRD + KPI dictionary + Codex package + tickets |
| `project-3-careshed.md` | Healthcare: PRD + KPI dictionary + Codex package + tickets |
| `project-4-marketplace-compass.md` | Retail: PRD + model card + Codex package + tickets |
| `project-5-transitshield.md` | Transportation/climate: PRD + KPI dictionary + Codex package + tickets |
| `portfolio-landing-and-launch.md` | Portfolio positioning, landing-page content strategy, recruiter descriptions, resume bullets, LinkedIn launch copy |
| `/jls-sheltershield/` (repo) | Working flagship scaffold: Python pipeline + Next.js app + tests + CI + docs |

---

## 8. What each product declares to a hiring manager

- **ShelterShield** → "I understand how capital decisions actually get made in community development, and I can build the auditable tool that defends them."
- **PulseCredit** → "I can turn fragmented federal economic feeds into a forward-looking risk monitor that catches stress early."
- **CareShed** → "I can quantify inequity geospatially and explain a model's reasoning, not just its score."
- **Marketplace Compass** → "I can build a machine-learning model the right way — no leakage, honest validation, a real decision on the other end."
- **TransitShield** → "I can fuse siloed operational, hazard, and demand data into a ranked, scenario-ready investment plan."

Together: **a Fortune-50-grade analyst who ships production-quality, decision-first data products — and is honest about the data.**
