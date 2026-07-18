# Jean-Luc Saint-Fleur — Portfolio Landing & Launch Kit

> A complete positioning, landing-page, recruiter, resume, and LinkedIn package for a five-app analytics portfolio built entirely on verified public data.
>
> **Note on placeholders:** Anywhere a personal fact is needed (years, titles, tools, school), a `[PLACEHOLDER: ...]` token appears. Fill these from your resume once it's ready. Nothing personal has been invented.

---

## A. Portfolio Positioning

### The thesis

Jean-Luc Saint-Fleur is a data and analytics professional who turns messy public data into decisions people can act on. His portfolio is not a pile of notebooks — it is five deployed, documented, executive-ready analytics products, each answering a real question a real organization would pay to answer, across five different industries: housing and community development, financial services, healthcare, retail and e-commerce, and transportation and climate.

The through-line is deliberate. Every product starts from a hard public-interest problem, joins multiple authoritative open datasets into a reproducible pipeline, applies the right analytical technique for the question (never technique for its own sake), and ships as a live application with an honest account of what it can and cannot claim. Together they demonstrate range without dilution: geospatial analysis (three products), forecasting and scenario modeling (three), a leakage-safe validated machine-learning model, composite index construction (three), a capital-prioritization engine, and anomaly detection (two).

What makes the collection hire-worthy is not just breadth of technique — it's judgment. Jean-Luc pairs genuine community-development domain expertise (from work in the LISC and NYCHA world) with the discipline to source data ethically, honor licenses, label what is *calculated* versus *proposed*, and refuse to fabricate impact. That combination — domain fluency, technical range, and intellectual honesty — is exactly what distinguishes a senior analyst from someone who can only run a model.

**Who this collection is for:** hiring teams for Data Analyst, Senior Data Analyst, Business Intelligence, Product Analytics, Analytics Engineering, Operations Analytics, and applied-AI roles who want to see how a candidate *thinks*, not just what tools they can name.

### Tagline (one sentence)

**Jean-Luc Saint-Fleur turns public data into decisions — five deployed analytics products, five industries, one standard of rigor.**

### Elevator version (three sentences)

Jean-Luc Saint-Fleur is a data analyst who builds decision tools, not dashboards, grounding real community-development domain expertise in verified public data. His portfolio spans five deployed applications across housing, finance, healthcare, retail, and transportation — covering geospatial analysis, forecasting, a validated ML model, composite risk indices, a prioritization engine, and anomaly detection. Each is reproducible, executive-ready, and honest about its limitations, which is the whole point: analysis you can actually trust enough to act on.

---

## B. Portfolio Landing-Page Content Strategy

The hub is a single landing site (the "portfolio home") that frames the story and routes visitors to the five live apps and their GitHub repos.

### Information architecture (top to bottom, single scroll)

1. **Hero** — headline, subhead, primary + secondary CTA
2. **How I Work** — value proposition, the operating principles
3. **Product Grid** — five cards, one per product
4. **Analytical Capabilities Matrix** — techniques × products
5. **About / Bio** — who Jean-Luc is (with placeholders)
6. **Data & Ethics** — sourcing, licenses, no-fabrication stance
7. **Contact / CTA** — how to reach him, resume download
8. **Footer** — nav, repo links, license line, last-updated

**Suggested section order rationale:** lead with the thesis (hero), immediately prove the *how* (operating principles) before the *what* (products), so the grid is read through a lens of rigor rather than as five disconnected toys. Capabilities matrix sits directly after the grid to reinforce range at a glance. Ethics comes late but is not buried — it's a differentiator, and recruiters who reach it are already engaged.

### SEO title & meta

- **SEO title (≤60 chars):** `Jean-Luc Saint-Fleur — Data & Analytics Portfolio`
- **Meta description (≤155 chars):** `Five deployed analytics products across housing, finance, health, retail, and transit — built on verified public data. Geospatial, forecasting, ML, and more.`
- **Open Graph title:** `Turning public data into decisions — Jean-Luc Saint-Fleur`
- **OG image suggestion:** a 1200×630 tile with the five product logos in a row over a muted map/grid background and the tagline.

---

### Hero (exact recommended copy)

> **Headline:** I turn public data into decisions.
>
> **Subhead:** Five deployed analytics products across housing, finance, healthcare, retail, and transportation — each built on verified open data, documented end to end, and honest about its limits. This is how I think about problems.
>
> **Primary CTA:** `Explore the products ↓`
> **Secondary CTA:** `View GitHub` · `Download résumé`

Micro-line under the CTAs (optional): *Built by Jean-Luc Saint-Fleur — [PLACEHOLDER: current title / "Data Analyst"], [PLACEHOLDER: city or "NYC-based"].*

---

### "How I Work" / value-proposition section

**Section headline:** How I work

**Intro line:** Every product in this portfolio follows the same four principles. They're the reason I trust the outputs — and why you can too.

1. **Start from a real decision.** I don't build a model looking for a use. Each app answers a specific question a real organization has to answer: where to send capital, which orders will go wrong, which communities are underserved.
2. **Source data you can defend.** Only authoritative public datasets — HUD, Census, CDC, CFPB, FEMA, the Fed, and peers. Every source is cited, every license honored, every join reproducible from the repo.
3. **Match the technique to the question.** Geospatial where place matters, forecasting where timing matters, machine learning only where it's validated and leakage-safe. No technique for show.
4. **Be honest about the limits.** I label what is *calculated* versus *proposed*, disclose assumptions, and never dress up a public-data prototype as a production system with fabricated impact.

---

### Product grid (five cards)

Each card uses this layout: **thumbnail/visual → card headline → problem line → what-it-does line → technique badges → "View live" + "GitHub" CTAs.**

---

#### Card 1 — ShelterShield  *(flagship / domain signature)*

- **Card headline:** ShelterShield — displacement risk, made fundable
- **Problem (1 line):** Community-development capital is finite, but the neighborhoods most at risk of displacement aren't obvious from any single dataset.
- **What it does (1 line):** Builds a tract-level displacement-risk composite index and a capital-prioritization engine that ranks where intervention dollars go furthest.
- **Technique badges:** `Geospatial` · `Composite Index` · `Prioritization Engine` · `Reproducible Pipeline`
- **Data badges:** `HUD` · `US Census` · `NYC Open Data` · `Eviction Lab`
- **CTAs:** `View live →` · `GitHub`
- **Recommended thumbnail:** a choropleth map of NYC census tracts shaded by risk score, with the top-priority tracts outlined — instantly reads as "geospatial decision tool."

---

#### Card 2 — PulseCredit

- **Card headline:** PulseCredit — a stress monitor for consumer finance
- **Problem (1 line):** Household financial stress builds quietly before it shows up in defaults, and complaint data hides early-warning signals.
- **What it does (1 line):** Monitors consumer financial stress and risk with delinquency forecasting, scenario analysis, and CFPB complaint anomaly detection.
- **Technique badges:** `Forecasting` · `Scenario Analysis` · `Anomaly Detection` · `Reproducible Pipeline`
- **Data badges:** `CFPB` · `FRED` · `Federal Reserve` · `NY Fed`
- **CTAs:** `View live →` · `GitHub`
- **Recommended thumbnail:** a time-series line of a delinquency forecast with a shaded scenario band and a flagged anomaly marker.

---

#### Card 3 — CareShed

- **Card headline:** CareShed — mapping who gets left out of care
- **Problem (1 line):** Care-access "deserts" and health inequity vary sharply by county, but the drivers are spread across a dozen disconnected sources.
- **What it does (1 line):** Combines a care-access and health-equity composite index with an explainable county-level risk model.
- **Technique badges:** `Geospatial` · `Composite Index` · `Explainable Model` · `Reproducible Pipeline`
- **Data badges:** `CDC PLACES` · `HRSA` · `County Health Rankings` · `Census` · `CDC WONDER`
- **CTAs:** `View live →` · `GitHub`
- **Recommended thumbnail:** a county-level equity map paired with a small feature-importance bar chart — signals "geospatial + explainable model."

---

#### Card 4 — Marketplace Compass

- **Card headline:** Marketplace Compass — catch bad orders before they happen
- **Problem (1 line):** E-commerce operators lose margin to orders that arrive late, get returned, or end in a poor review — usually seen too late.
- **What it does (1 line):** Predicts poor-outcome orders with a leakage-safe validated ML model, plus CLV segmentation and demand forecasting.
- **Technique badges:** `Validated ML` · `Leakage-Safe` · `Segmentation` · `Demand Forecasting`
- **Data badges:** `Olist (CC BY-NC)` · `Census MARTS`
- **CTAs:** `View live →` · `GitHub`
- **Recommended thumbnail:** a calibration/ROC-style curve next to a CLV segment scatter — reads as "real, validated ML."

---

#### Card 5 — TransitShield

- **Card headline:** TransitShield — climate stress-testing for transit
- **Problem (1 line):** Transit systems face rising climate risk, but agencies rarely have a single view of which assets and riders are most exposed.
- **What it does (1 line):** Scores transit climate-resilience risk with a composite index, a storm-scenario simulator, and reliability/anomaly monitoring.
- **Technique badges:** `Geospatial` · `Composite Index` · `Scenario Simulation` · `Anomaly Detection`
- **Data badges:** `MTA` · `FEMA NRI` · `NOAA` · `Census LODES`
- **CTAs:** `View live →` · `GitHub`
- **Recommended thumbnail:** a transit-network map overlaid with a storm-hazard layer and a resilience score legend.

---

### Analytical capabilities matrix (techniques × products)

**Section headline:** What I can do — and where I've shown it

A visitor should see range in one glance. Render this as a table (checkmarks) on the page.

| Technique | ShelterShield | PulseCredit | CareShed | Marketplace Compass | TransitShield |
|---|:---:|:---:|:---:|:---:|:---:|
| Geospatial analysis | ✓ | | ✓ | | ✓ |
| Forecasting | | ✓ | | ✓ | |
| Scenario / simulation | | ✓ | | | ✓ |
| Validated ML model | | | | ✓ | |
| Explainable modeling | | | ✓ | | |
| Composite index | ✓ | | ✓ | | ✓ |
| Prioritization engine | ✓ | | | | |
| Anomaly detection | | ✓ | | | ✓ |
| Segmentation (CLV) | | | | ✓ | |
| Reproducible pipeline | ✓ | ✓ | ✓ | ✓ | ✓ |

**Coverage callout line (place under the table):** *Geospatial ×3 · Forecasting/scenario ×3 · Composite indices ×3 · Anomaly detection ×2 · One validated ML model · One capital-prioritization engine.*

---

### About / bio section

**Section headline:** About Jean-Luc

> I'm Jean-Luc Saint-Fleur, a [PLACEHOLDER: "Data Analyst" / current title] with [PLACEHOLDER: N] years turning data into decisions. My background is in community development — I've worked in the [PLACEHOLDER: LISC / NYCHA] world, where the stakes of getting an analysis right are measured in people's housing, not just KPIs. That grounding shapes how I approach every problem: understand the domain first, then let the data tell the truth about it.
>
> I work across [PLACEHOLDER: tools — e.g., Python, SQL, dbt, Tableau/Power BI, geospatial stacks], and I care as much about a clean, reproducible pipeline as about the final chart. I hold [PLACEHOLDER: degree(s) / certifications]. Outside of the portfolio, [PLACEHOLDER: one warm personal line — a cause, an interest, a why].
>
> I'm currently open to [PLACEHOLDER: Data Analyst / Senior Analyst / BI / Product Analytics / Analytics Engineering / Ops Analytics / applied-AI] roles. If you're building something where rigor and domain judgment both matter, let's talk.

Optional stat strip (only fill if true): `[PLACEHOLDER: years] experience · 5 deployed products · [PLACEHOLDER: # datasets] public datasets integrated · 5 industries`.

---

### Data & ethics section

**Section headline:** Data & ethics

> Everything here is built on **verified public data** — no scraped private sources, no confidential employer data, ever. Each product's repository lists its exact sources and cites them.
>
> **Licenses honored.** I respect every dataset's terms. County Health Rankings data is used under its **non-commercial** terms, and the Olist e-commerce dataset is used under **CC BY-NC** — both appear only in non-commercial, portfolio contexts with attribution. Public-domain federal sources (HUD, Census, CDC, CFPB, FEMA, NOAA, Federal Reserve, NY Fed, HRSA) are cited to their agencies.
>
> **No fabrication.** These are analytical prototypes built to demonstrate method and judgment. I do not invent business impact, user counts, or performance results. Where a model is involved, I report how it was designed and validated — not imaginary accuracy.
>
> **Calculated vs. proposed.** Every index score and ranking is clearly labeled as *calculated* from the stated inputs. Interventions, priorities, and recommendations are labeled as *proposed* — analytical suggestions, not operational directives.
>
> **Reproducible.** If it's on the site, it's in the repo. You can trace any number back to its source.

---

### Contact / CTA section

**Section headline:** Let's talk

> If any of this maps to a problem your team is solving, I'd love to hear about it.
>
> **Primary CTA:** `Email me` → [PLACEHOLDER: email]
> **Secondary CTAs:** `LinkedIn` → [PLACEHOLDER: URL] · `GitHub` → [PLACEHOLDER: URL] · `Download résumé (PDF)`

---

### Footer

- **Left:** `Jean-Luc Saint-Fleur — Data & Analytics` · [PLACEHOLDER: city]
- **Center nav:** Products · Capabilities · About · Data & Ethics · Contact
- **Right:** GitHub · LinkedIn · Email
- **Bottom line:** `Built with public data. Sources cited per project; CHR and Olist used under non-commercial terms. Last updated [PLACEHOLDER: month/year].`

---

## C. Recruiter-Facing Descriptions

Written for a non-technical hiring manager — each grasp-able in under a minute.

### ShelterShield
ShelterShield helps community-development organizations decide where to invest limited dollars to prevent residents from being displaced from their neighborhoods. It pulls together federal housing data, Census figures, local NYC records, and eviction data to score every neighborhood on its displacement risk, then ranks where funding would do the most good. For anyone in affordable housing, city government, or community lending, it turns a scattered, hard-to-see problem into a clear, defensible priority list. It's Jean-Luc's flagship — and it shows both his real community-development expertise and his ability to build a decision tool executives can actually use.

### PulseCredit
PulseCredit is an early-warning system for consumer financial stress. It watches public financial and complaint data to forecast where loan delinquencies may rise, tests "what if" economic scenarios, and automatically flags unusual spikes in consumer complaints before they become trends. Banks, lenders, credit unions, and financial-services teams would use this kind of tool to see trouble coming instead of reacting to it. It demonstrates Jean-Luc's strength in forecasting, scenario planning, and spotting anomalies in noisy real-world data.

### CareShed
CareShed maps where communities lack access to healthcare and where health outcomes are most unequal — county by county across the country. It blends multiple public health and Census datasets into a single clear equity score, and adds a model that explains *why* a given county scores the way it does, not just what the score is. Health systems, public-health agencies, insurers, and nonprofits would use it to target outreach and resources. It shows Jean-Luc can work with complex, multi-source data and, crucially, make his models understandable to the people who have to act on them.

### Marketplace Compass
Marketplace Compass helps online retailers spot the orders likely to end badly — late deliveries, returns, or unhappy customers — before they happen, so teams can intervene early. It also groups customers by long-term value and forecasts demand. Built on a real e-commerce dataset, it uses a carefully validated machine-learning model designed to avoid the common trap of "cheating" by peeking at information it wouldn't have in real life. For e-commerce and operations leaders, it's a margin-protection tool; for a hiring manager, it's proof Jean-Luc can build machine learning the right, trustworthy way.

### TransitShield
TransitShield stress-tests public transit systems against climate risk. It scores which parts of the network — and which riders and jobs that depend on it — are most exposed to storms and hazards, and lets planners simulate a storm scenario to see what would break and how badly. Transit agencies, city planners, and climate-resilience teams would use it to prioritize which assets to protect first. It highlights Jean-Luc's geospatial skills and his ability to turn climate and infrastructure data into forward-looking, decision-ready analysis.

---

## D. Resume Bullets

Quantified only where honestly derivable from the build itself. No fabricated impact, users, or accuracy figures. Fill `[PLACEHOLDER]` counts from the actual repos.

### ShelterShield
- Engineered a reproducible geospatial pipeline joining four public datasets (HUD, U.S. Census, NYC Open Data, Eviction Lab) at the census-tract level to construct a transparent, weighted displacement-risk composite index.
- Built a capital-prioritization engine that ranks tracts by intervention value, with every score labeled as *calculated* and every recommended priority labeled as *proposed* for analytical honesty.
- Deployed the tool as a live, documented web application on Vercel with a public GitHub repository, choropleth visualization, and full source citations for reproducibility.

### PulseCredit
- Developed a consumer-financial-stress monitor integrating CFPB, FRED, Federal Reserve, and NY Fed data into a reproducible pipeline for delinquency forecasting and scenario analysis.
- Implemented an anomaly-detection layer over CFPB complaint data to surface unusual spikes as early-warning signals, with clearly stated detection assumptions.
- Designed forward-looking economic scenario simulations and shipped the full app on Vercel with GitHub documentation and cited public sources.

### CareShed
- Built a care-access and health-equity composite index across U.S. counties by integrating five public health and demographic sources (CDC PLACES, HRSA, County Health Rankings, Census, CDC WONDER).
- Trained an *explainable* county-level risk model, prioritizing interpretable feature attribution so non-technical stakeholders can understand each score's drivers.
- Honored County Health Rankings non-commercial terms, deployed a live application on Vercel, and documented the full methodology and sources on GitHub.

### Marketplace Compass
- Built a **leakage-safe, validated** machine-learning model on the public Olist e-commerce dataset to predict poor-outcome orders, using a temporal hold-out and calibration to guard against data leakage rather than reporting inflated in-sample results.
- Added customer-lifetime-value segmentation and demand forecasting, benchmarking against Census MARTS retail data for external context.
- Used Olist under its CC BY-NC license with attribution, and deployed the app on Vercel with a documented, reproducible GitHub pipeline.

### TransitShield
- Constructed a transit climate-resilience composite risk index by joining MTA, FEMA NRI, NOAA, and Census LODES data, linking network exposure to the riders and jobs that depend on it.
- Built a storm-scenario simulator and a reliability/anomaly-monitoring layer to stress-test the network and flag irregular service patterns.
- Delivered the full geospatial application on Vercel with a public GitHub repository and cited, reproducible public-data sourcing.

### Portfolio summary block (top-of-resume, 4 bullets)
- **Data & analytics professional** with [PLACEHOLDER: N] years of experience and genuine community-development domain expertise ([PLACEHOLDER: LISC / NYCHA context]), turning verified public data into executive-ready decisions.
- **Built and deployed five end-to-end analytics products** across housing, financial services, healthcare, retail, and transportation — each live on Vercel with documented, reproducible GitHub pipelines.
- **Demonstrated broad analytical range:** geospatial analysis, forecasting and scenario modeling, a leakage-safe validated ML model, composite index construction, a capital-prioritization engine, and anomaly detection.
- **Committed to analytical integrity:** authoritative public sources only, licenses honored (incl. non-commercial CHR and Olist CC BY-NC), and clear *calculated-vs-proposed* labeling — no fabricated metrics. Toolset: [PLACEHOLDER: Python, SQL, dbt, Tableau/Power BI, geospatial stack].

---

## E. LinkedIn Launch Copy

### Post 1 — ShelterShield

Community-development capital is always finite. The hardest question isn't whether a neighborhood is at risk of displacement — it's *which* one to fund first, when the risk signals are scattered across a dozen datasets.

So I built ShelterShield.

It joins HUD, U.S. Census, NYC Open Data, and Eviction Lab data at the census-tract level into a transparent displacement-risk composite index, then runs a capital-prioritization engine that ranks where intervention dollars go furthest.

Coming from the community-development world, I wanted this to be usable by the people who actually make funding decisions — so every score is labeled *calculated* and every priority *proposed*, with sources cited end to end.

Honest limits: it's built on public data as an analytical prototype, not a production replacement for local knowledge. It's a starting point for a conversation, not the final word.

Live app + full GitHub repo in the comments. I'd genuinely love feedback from anyone in housing and community development.

#DataAnalytics #CommunityDevelopment #AffordableHousing #Geospatial #OpenData #DataScience

---

### Post 2 — PulseCredit

Household financial stress builds quietly. By the time it shows up in default rates, it's often too late to get ahead of it.

That's the problem PulseCredit tackles.

It's a consumer financial-stress and risk monitor built on CFPB, FRED, Federal Reserve, and NY Fed data. It forecasts delinquency trends, lets you run "what if" economic scenarios, and uses anomaly detection to flag unusual spikes in consumer complaints as early-warning signals.

The goal: see trouble forming instead of reacting to it after the fact.

Honest limits: this is a public-data prototype for demonstrating method — the forecasts and anomaly flags reflect the assumptions I disclose in the repo, not a production risk system. I report how it's built, not invented accuracy numbers.

Live app and GitHub in the comments. If you work in lending, credit, or financial-services analytics, I'd love your take.

#DataAnalytics #FinancialServices #RiskAnalytics #Forecasting #AnomalyDetection #OpenData

---

### Post 3 — CareShed

Two counties can look similar on a map and offer completely different access to healthcare. The drivers of that gap are real — they're just spread across a dozen disconnected public datasets.

CareShed brings them together.

It integrates CDC PLACES, HRSA, County Health Rankings, Census, and CDC WONDER data into a single care-access and health-equity composite index — and pairs it with an *explainable* county-level risk model, so you see not just the score but *why* a county scores the way it does.

I built the model to be interpretable on purpose. A health-equity tool that stakeholders can't understand can't drive action.

Honest limits: it's an analytical prototype on public data, used under County Health Rankings' non-commercial terms. Scores are calculated; targeting suggestions are proposed.

Live app + GitHub in the comments. Public-health and health-equity folks — I'd value your perspective.

#DataAnalytics #HealthEquity #PublicHealth #ExplainableAI #Geospatial #OpenData

---

### Post 4 — Marketplace Compass

Most e-commerce teams find out an order went badly — late, returned, one-star — after the customer already has. What if you could flag the risky ones up front?

That's Marketplace Compass.

Built on the public Olist e-commerce dataset (used under CC BY-NC), it predicts poor-outcome orders with a machine-learning model I built to be **leakage-safe** — validated with a temporal hold-out and calibration so it can't "cheat" by peeking at information it wouldn't have in real life. It also adds CLV segmentation and demand forecasting, benchmarked against Census MARTS retail data.

The leakage-safe part matters most to me: it's the difference between an ML model that looks great in a notebook and one you'd actually trust in production.

Honest limits: it's a validated prototype on a public dataset — I report how it was designed and validated, not fabricated live performance.

Live app + GitHub in the comments.

#DataScience #MachineLearning #Ecommerce #ProductAnalytics #MLOps #OpenData

---

### Post 5 — TransitShield

Transit systems are facing more climate stress every year — but few agencies have a single view of which parts of the network, and which riders, are most exposed.

TransitShield is my attempt at that view.

It scores transit climate-resilience risk using MTA, FEMA NRI, NOAA, and Census LODES data — connecting network exposure to the riders and jobs that depend on it. It includes a storm-scenario simulator to stress-test the system and an anomaly layer for reliability monitoring.

The idea is to let planners ask "what breaks in this storm, and who does it hurt most?" *before* the storm.

Honest limits: it's a public-data prototype for demonstrating geospatial and scenario methods — the simulations reflect stated assumptions, and priorities are proposed, not operational directives.

Live app + GitHub in the comments. Transit, planning, and climate-resilience folks — feedback welcome.

#DataAnalytics #ClimateResilience #Transit #Geospatial #ScenarioPlanning #OpenData

---

### Post 6 — Portfolio launch announcement

For the past [PLACEHOLDER: N months], I've been building something on nights and weekends. Today I'm sharing all of it.

I built **five deployed analytics products** — one each across housing, financial services, healthcare, retail, and transportation — every one on verified public data, documented on GitHub, and live on the web.

- **ShelterShield** — tract-level displacement-risk index + capital prioritization for community development (my flagship, and closest to my roots).
- **PulseCredit** — consumer financial-stress monitor with forecasting, scenarios, and complaint anomaly detection.
- **CareShed** — care-access and health-equity index with an explainable county risk model.
- **Marketplace Compass** — a leakage-safe, validated ML model predicting poor-outcome orders, plus CLV segmentation and demand forecasting.
- **TransitShield** — transit climate-resilience risk with a storm-scenario simulator.

Together they cover geospatial analysis, forecasting and scenario modeling, a validated ML model, composite indices, a prioritization engine, and anomaly detection.

One thread runs through all five: I turn public data into decisions — executive-ready, reproducible, and honest about its limits. No confidential data, licenses honored, no fabricated metrics.

I'm open to Data Analyst, Senior Analyst, BI, Product/Ops Analytics, and applied-AI roles. Links to all five in the comments. I'd love for you to poke holes in them.

#DataAnalytics #DataScience #Portfolio #OpenData #Analytics #OpenToWork

---

### LinkedIn "Featured" About-section blurb (short)

> I turn public data into decisions. I'm a data and analytics professional with community-development roots ([PLACEHOLDER: LISC / NYCHA]) and a portfolio of five deployed products across housing, finance, healthcare, retail, and transportation — spanning geospatial analysis, forecasting, validated ML, composite risk indices, and anomaly detection. Everything is built on verified open data, documented on GitHub, and honest about its limits. Open to Data Analyst, Senior Analyst, BI, Product/Ops Analytics, and applied-AI roles. Explore the work below.

---

## F. Suggested Project Execution Order

Build in this sequence. The first project establishes a shared foundation (public-data ingestion pattern, reproducible pipeline scaffold, Vercel + GitHub deploy template, composite-index and mapping components) that the rest reuse.

1. **ShelterShield — build first (flagship).**
   It's your domain signature, so it carries the most portfolio weight and is the project you can make sharpest fastest. Building it first also forces you to establish the reusable foundation — geospatial rendering, composite-index construction, the deploy pipeline — that every later project inherits.

2. **CareShed — build second.**
   It reuses the most from ShelterShield: another geospatial, multi-source composite index. The marginal effort is low, so you get a second strong product quickly while the index/mapping patterns are fresh, adding an explainable-model dimension you don't yet have.

3. **TransitShield — build third.**
   Third geospatial composite-index product, plus it introduces scenario simulation and anomaly detection — new techniques that broaden the portfolio. By now the geospatial foundation is mature, so you can spend your effort on the novel scenario/simulation layer rather than plumbing.

4. **PulseCredit — build fourth.**
   Pivots away from geospatial into time-series forecasting, scenario analysis, and anomaly detection — proving range beyond maps. It reuses the pipeline and deploy scaffold but exercises a genuinely different analytical muscle, which strengthens the "breadth" story.

5. **Marketplace Compass — build last.**
   It's the most technically distinct (a leakage-safe, validated ML model with proper temporal hold-out and calibration) and therefore the highest-care build — best done when your foundation is solid and you can give the validation the attention it deserves. Ending on your one rigorous ML product leaves the portfolio's technical high note fresh.

---

*Prepared for Jean-Luc Saint-Fleur. Replace every `[PLACEHOLDER: ...]` with verified facts from your résumé before publishing. No personal facts or metrics were invented in this document.*
