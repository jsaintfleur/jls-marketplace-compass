# Portfolio Design System & Quality Rubric

**Owner:** Jean-Luc Saint-Fleur — Data / AI Portfolio
**Scope:** Five Next.js 15 (App Router) + TypeScript + Tailwind + Radix/shadcn products, each backed by a Python/DuckDB pipeline and deployed on Vercel.
**Products:** ShelterShield · PulseCredit · CareShed · Marketplace Compass · TransitShield
**Status:** Canonical reference. Every product inherits Section A verbatim (only the accent palette varies) and is graded against Section B at every milestone.

---

# SECTION A — SHARED DESIGN SYSTEM

## A1. Design Philosophy

The portfolio should read as **one studio, five instruments** — a single premium system with a per-product accent. We borrow the *discipline* of Apple, Stripe, Linear, and Bloomberg without copying any of them.

- **Restraint over decoration.** Content and data carry the visual weight. Chrome recedes. No gradients-as-personality, no drop shadows for their own sake, no stock illustration.
- **Information density with air.** Bloomberg-grade density where the analyst needs it (tables, figures); generous whitespace where the executive skims (overview, KPI row).
- **Truth-first dataviz.** A chart that misleads is a bug, not a style choice. Honest scales, labeled uncertainty, sourced numbers.
- **Motion as feedback, not spectacle.** Transitions confirm state changes and orient the eye; they are never the reason to look.
- **Consistency is a feature.** A user who learns one product can operate all five. Same shell, same states, same interaction grammar.
- **Credibility by construction.** Every number is defined, dated, and sourced. The design system makes it *hard* to ship an undefined metric or an unattributed figure.

**Explicit non-goals:** no dark-pattern engagement loops, no fake real-time tickers, no skeuomorphism, no marketing hype in product surfaces.

---

## A2. Design Tokens

All tokens are CSS custom properties on `:root`, mirrored to Tailwind via `theme.extend`. Values below are the light theme; a `.dark` block overrides the neutral scale and elevation. Product accent tokens (`--accent-*`) are injected per product (see A4).

### Neutral (slate) base scale

```css
:root {
  /* Neutral / slate — UI surfaces, text, borders */
  --slate-50:  #f8fafc;
  --slate-100: #f1f5f9;
  --slate-200: #e2e8f0;
  --slate-300: #cbd5e1;
  --slate-400: #94a3b8;
  --slate-500: #64748b;
  --slate-600: #475569;
  --slate-700: #334155;
  --slate-800: #1e293b;
  --slate-900: #0f172a;
  --slate-950: #020617;

  /* Semantic surface + text roles (light) */
  --bg-canvas:      var(--slate-50);
  --bg-surface:     #ffffff;
  --bg-surface-2:   var(--slate-100);
  --bg-inset:       var(--slate-100);
  --border-subtle:  var(--slate-200);
  --border-default: var(--slate-300);
  --text-primary:   var(--slate-900);
  --text-secondary: var(--slate-600);
  --text-tertiary:  var(--slate-500);
  --text-inverse:   #ffffff;
}

.dark {
  --bg-canvas:      var(--slate-950);
  --bg-surface:     var(--slate-900);
  --bg-surface-2:   var(--slate-800);
  --bg-inset:       #0b1220;
  --border-subtle:  var(--slate-800);
  --border-default: var(--slate-700);
  --text-primary:   var(--slate-100);
  --text-secondary: var(--slate-300);
  --text-tertiary:  var(--slate-400);
  --text-inverse:   var(--slate-950);
}
```

### Semantic status colors (theme-independent, AA on white and slate-900)

```css
:root {
  --success:      #15803d;  --success-bg:  #dcfce7;  --success-fg: #052e16;
  --warning:      #b45309;  --warning-bg:  #fef3c7;  --warning-fg: #451a03;
  --danger:       #b91c1c;  --danger-bg:   #fee2e2;  --danger-fg:  #450a0a;
  --info:         #1d4ed8;  --info-bg:     #dbeafe;  --info-fg:    #172554;
  --neutral-badge:#475569;  --neutral-bg:  #f1f5f9;
}
```

### Spacing (4 / 8 px scale)

```css
:root {
  --space-0: 0;      --space-1: 0.25rem; /* 4  */  --space-2: 0.5rem;  /* 8  */
  --space-3: 0.75rem;/* 12 */ --space-4: 1rem;    /* 16 */  --space-5: 1.5rem;  /* 24 */
  --space-6: 2rem;   /* 32 */ --space-7: 3rem;    /* 48 */  --space-8: 4rem;    /* 64 */
  --space-9: 6rem;   /* 96 */
}
```
Rule: all layout gaps, paddings, and margins are drawn from this scale. No arbitrary pixel values in components.

### Radii

```css
:root {
  --radius-sm: 0.25rem;  /* 4  — badges, inputs */
  --radius-md: 0.5rem;   /* 8  — buttons, cards default */
  --radius-lg: 0.75rem;  /* 12 — panels, chart cards */
  --radius-xl: 1rem;     /* 16 — modals, feature cards */
  --radius-full: 9999px; /* pills, avatars */
}
```

### Elevation / shadows

```css
:root {
  --shadow-xs: 0 1px 2px 0 rgb(15 23 42 / 0.05);
  --shadow-sm: 0 1px 3px 0 rgb(15 23 42 / 0.08), 0 1px 2px -1px rgb(15 23 42 / 0.06);
  --shadow-md: 0 4px 12px -2px rgb(15 23 42 / 0.10), 0 2px 6px -2px rgb(15 23 42 / 0.06);
  --shadow-lg: 0 12px 28px -6px rgb(15 23 42 / 0.16), 0 4px 10px -4px rgb(15 23 42 / 0.08);
  --ring-focus: 0 0 0 2px var(--bg-surface), 0 0 0 4px var(--accent-500);
}
```
Elevation levels: `0` flat/canvas · `1` cards (`--shadow-sm`) · `2` popovers/dropdowns (`--shadow-md`) · `3` modals/command palette (`--shadow-lg`). In dark mode, elevation is expressed primarily through surface lightness, not shadow.

### Motion

```css
:root {
  --dur-fast:  120ms;  /* hover, focus, checkbox */
  --dur-base:  200ms;  /* dropdowns, tooltips, tab switch */
  --dur-slow:  320ms;  /* modal/drawer enter, page transitions */
  --ease-standard: cubic-bezier(0.2, 0, 0, 1);
  --ease-emphasized: cubic-bezier(0.2, 0, 0, 1.2);
  --ease-exit: cubic-bezier(0.4, 0, 1, 1);
}
@media (prefers-reduced-motion: reduce) {
  :root { --dur-fast: 1ms; --dur-base: 1ms; --dur-slow: 1ms; }
}
```

---

## A3. Typography

**Sans:** `Inter` (via `next/font`, variable, `--font-sans`). **Mono for figures/tabular data:** `JetBrains Mono` (`--font-mono`), always with `font-variant-numeric: tabular-nums` for aligned digits in KPIs and tables.

| Role | Size (rem / px) | Weight | Line-height | Tracking | Usage |
|---|---|---|---|---|---|
| Display | 3.0 / 48 | 700 | 1.05 | -0.02em | Landing hero only |
| H1 | 2.25 / 36 | 700 | 1.1 | -0.02em | Page title |
| H2 | 1.5 / 24 | 600 | 1.2 | -0.01em | Section heading |
| H3 | 1.25 / 20 | 600 | 1.3 | -0.005em | Card / panel title |
| H4 | 1.0 / 16 | 600 | 1.4 | 0 | Sub-panel, table group |
| Body | 1.0 / 16 | 400 | 1.55 | 0 | Default prose |
| Body-sm | 0.875 / 14 | 400 | 1.5 | 0 | Dense UI, table cells |
| Caption | 0.75 / 12 | 500 | 1.4 | 0.01em | Labels, axis, footnotes |
| Data-lg | 2.0 / 32 | 600 mono | 1.1 | tabular-nums | Primary KPI value |
| Data-md | 1.25 / 20 | 600 mono | 1.2 | tabular-nums | Secondary figure |

Rules: max prose measure ~68ch. Never set body below 14px. Numbers in analytical context always use the mono/tabular stack so columns align.

---

## A4. Per-Product Accent Palettes

Each product gets one distinct hue, chosen so the five are mutually distinguishable under deuteranopia/protanopia and each is distinguishable from the semantic status colors. Every accent-on-white and white-on-accent pairing listed below meets **WCAG AA (≥4.5:1 for text, ≥3:1 for large text/UI)** — `accent-600`/`700` are the text-safe stops; `accent-500` is the brand stop used for fills, focus rings, and large elements.

Injected per product as:
```css
:root {
  --accent-50: …; --accent-100: …; --accent-500: …; --accent-600: …; --accent-700: …;
  --accent-contrast: #ffffff; /* text color that sits on accent-600/700 */
}
```

### Assigned primary hues

| Product | Domain | Primary (accent-500) | Text-safe (accent-600) | Deep (accent-700) |
|---|---|---|---|---|
| **ShelterShield** | Housing displacement risk | Teal `#0d9488` | `#0f766e` | `#115e59` |
| **PulseCredit** | Consumer credit stress | Amber `#d97706` | `#b45309` | `#92400e` |
| **CareShed** | Healthcare access deserts | Emerald `#059669` | `#047857` | `#065f46` |
| **Marketplace Compass** | Retail order-risk ML | Indigo `#4f46e5` | `#4338ca` | `#3730a3` |
| **TransitShield** | Transit climate resilience | Sky/Blue `#0284c7` | `#0369a1` | `#075985` |

These five hues (teal, amber, emerald, indigo, sky) hold their separation under simulated color-vision deficiency because they span distinct lightness *and* the residual blue–yellow axis; amber is the warm anchor, the other four are cool but split across teal→emerald→sky→indigo lightness bands.

### Sequential ramps (choropleth "more = darker")

5-stop, single-hue, perceptually increasing. Use for magnitude maps and heat cells.

| Product | S1 | S2 | S3 | S4 | S5 |
|---|---|---|---|---|---|
| ShelterShield (teal) | `#ccfbf1` | `#5eead4` | `#2dd4bf` | `#0d9488` | `#134e4a` |
| PulseCredit (amber) | `#fef3c7` | `#fcd34d` | `#f59e0b` | `#d97706` | `#78350f` |
| CareShed (emerald) | `#d1fae5` | `#6ee7b7` | `#34d399` | `#059669` | `#064e3b` |
| Marketplace Compass (indigo) | `#e0e7ff` | `#a5b4fc` | `#818cf8` | `#4f46e5` | `#312e81` |
| TransitShield (sky) | `#e0f2fe` | `#7dd3fc` | `#38bdf8` | `#0284c7` | `#0c4a6e` |

### Diverging ramps (signed metrics: below-baseline ↔ above-baseline)

Colorblind-safe diverging pair with a light neutral midpoint (`#f1f5f9`). Negative pole is a shared cool blue; positive pole is a shared warm orange-red — this pairing (blue↔orange) is the most CVD-robust diverging scheme and stays consistent across products so a "worsening" reads the same everywhere.

```
Negative ← #2166ac · #67a9cf · #d1e5f0 · [#f1f5f9 mid] · #fddbc7 · #ef8a62 · #b2182b → Positive
```
Products keep this shared diverging scale (semantics travel across the portfolio); the per-product accent is reserved for sequential magnitude and brand chrome, avoiding "is red good or bad?" ambiguity.

> **AA note:** Ramp S1–S2 stops are backgrounds only; any text or numeric label placed on S1–S3 uses `--text-primary` (slate-900), and on S4–S5 uses `#ffffff`. All map legends state the numeric bin edges — color alone never encodes a category (WCAG 1.4.1 use of color).

---

## A5. Layout System

- **Container max-widths:** `--w-prose: 720px` (methodology/about reading) · `--w-content: 1080px` (overview) · `--w-app: 1440px` (dashboard shell) · `--w-full: 100%` (edge-to-edge maps).
- **12-column grid.** `grid-template-columns: repeat(12, minmax(0,1fr))`; gutter `--space-5` (24px) desktop, `--space-4` (16px) tablet. KPI row = 4 cards × 3 cols; chart card default = 6 cols; full map = 12 cols.
- **Breakpoints:** `sm 640 · md 768 · lg 1024 · xl 1280 · 2xl 1536`. Dashboard collapses left nav to icon rail < `lg`, to a sheet/drawer < `md`.
- **Dashboard shell:**
  - **Left nav (rail):** 240px expanded / 64px collapsed. Product logo + name at top, primary IA links, methodology + about pinned to bottom, theme toggle in footer of rail.
  - **Top bar:** 56px. Breadcrumb (left) · global filter/date-range control (center-left) · data-freshness pill + source link (right) · optional command palette (`⌘K`).
  - **Content region:** `--bg-canvas`, padded `--space-6`, max `--w-app`, centered.
- **8px vertical rhythm** between stacked sections (`--space-6`); 24px inside cards.

---

## A6. Component Inventory & Usage Specs

Built on Radix primitives + shadcn conventions. Each component ships all required states (A7) and is documented in a Storybook-equivalent MDX page.

| Component | Purpose | Key specs |
|---|---|---|
| **KPI / Stat card** | Single headline metric | H4 label + Data-lg value (mono/tabular) + delta chip (▲/▼ with sign, color = semantic not accent) + Caption "as of {date}" + info `ⓘ` opening definition tooltip. Radius `lg`, shadow `sm`, min-height 120px. |
| **Chart card** | One chart + framing | Header: H3 title, optional subtitle, `ⓘ` definition, overflow menu (download PNG/CSV). Body: responsive chart, min-height 280px. Footer: source + freshness Caption. Never a chart without a title and y-axis label. |
| **Choropleth map panel** | Geospatial magnitude | Map + fixed legend (binned, numeric edges), basemap = muted slate, no 3D, hover tooltip with region name + value + rank/percentile, keyboard-selectable regions, "no data" hatch pattern (not a color). |
| **Data table (TanStack)** | Row-level analysis | Sticky header, sortable columns (aria-sort), right-aligned mono numerics, zebra optional via `--bg-surface-2`, pagination or virtualized rows, column visibility menu, CSV export, empty/loading states. Row height 44px (comfortable) / 36px (compact toggle). |
| **Filter bar** | Scope the whole view | Horizontal, wraps on small screens. Segmented control or select per dimension + date range. Active filters shown as removable chips. Changes are debounced and reflected in URL query params (shareable/bookmarkable state). |
| **Methodology callout** | Inline caveat | Left-accent border (`--info`), `ⓘ` icon, H4 + short prose. Used to flag assumptions, sample sizes, known limitations near the affected chart. |
| **Insight / finding card** | Editorial takeaway | Accent-tinted header, one-sentence claim (H3), supporting sentence (Body-sm), and a "see data" link to the backing view. Claims must be falsifiable and sourced. |
| **Tooltip** | Definitions & hover data | Radix Tooltip, `--shadow-md`, max-width 280px, Body-sm. Definition tooltips include: what the metric is, unit, and computation basis. Delay 200ms; dismissible; keyboard-focusable trigger. |
| **Badge / chip** | Status & tags | Radius `full`, Caption weight 500, semantic bg/fg pairs from A2. Delta chips carry an arrow glyph so meaning survives grayscale. |
| **Breadcrumb** | Location in IA | `Home / Overview / {View}`, current page not a link (`aria-current="page"`), separator `/` decorative. |
| **Nav (left rail)** | Primary IA | Icon + label, active item = accent-tinted bg + accent-600 text + 2px accent left indicator, `aria-current="page"`, full keyboard traversal. |
| **Footer** | Attribution & trust | Data-source attribution (named datasets + links), **freshness indicator** ("Data current as of {date} · updated {cadence}"), pipeline/version tag, methodology link, "not affiliated / illustrative" disclaimer where relevant. |

---

## A7. Required States for Every Data View

No data-bearing component may ship without all four. These are acceptance-tested (Section B).

1. **Loading — skeleton.** Shape-matched shimmer (respecting `prefers-reduced-motion` → static muted block). KPI cards, chart bodies, table rows each have a dedicated skeleton. No spinners as the only loader for content regions.
2. **Empty.** Neutral illustration-free panel: one line explaining *why* it's empty (e.g., "No counties match the current filters"), and a primary action to recover (clear filters / widen range).
3. **Error.** Human-readable message (no raw stack traces), what happened, and a **Retry** action. Distinguish transient (retry) from data-unavailable (explain + link to status/methodology).
4. **No-permission / unavailable.** For gated or not-yet-published views: explain access requirement or "coming in v{n}", never a blank 403. Keep nav and shell intact.

---

## A8. Data-Visualization Style Guide

**Chart-junk bans:** no 3D, no gradients on data marks that don't encode a value, no drop shadows on bars/lines, no dual y-axes unless both axes are labeled and justified, no pie charts beyond 4 slices (prefer bar), no decorative backgrounds behind plots, no truncated bars.

**Axes / labels / legend:**
- Always label both axes with unit. Y-axis for bar/area **starts at zero** (honest scale); line charts may use a non-zero baseline only with an explicit note.
- Gridlines: horizontal only, `--slate-200`, 1px, behind marks. No vertical gridline clutter.
- Legend placed top or right, ≤6 series; beyond that, direct-label or facet.
- Tick density: ~4–7 ticks per axis; format with SI/thousands separators.

**Tooltip content rules:** every hover tooltip shows series name, the exact value (with unit), the category/date, and — where meaningful — a comparison (rank, % of total, delta vs. baseline). No tooltip that only repeats the axis value.

**Number & date formatting:**
- Currency `$1,240` (no cents unless < $10); large numbers `1.24M`, `3.1B`; percentages one decimal `12.4%`; counts with thousands separators.
- Dates `Jan 2026` (month granularity) / `2026-01-14` (day, ISO) — pick one per product and stay consistent. Ranges `Jan–Mar 2026`.
- Always show units. Never a bare number in an analytical surface without a label or unit nearby.

**Map legend rules:** binned choropleths only (quantile or explicit thresholds), 4–6 bins, numeric edges printed, "no data" as a hatch/gray-with-pattern, and a one-line note on classification method ("quantile bins, n=…").

**Honest scale & uncertainty:**
- Baseline-zero for magnitude; annotate any clipped/log axis.
- Show uncertainty where it exists: CIs as bands/error bars, small-sample regions flagged, estimates vs. observed visually distinguished (e.g., dashed = modeled).
- Annotate notable points (events, thresholds) with restrained callouts, not auto-generated noise.
- Never imply precision the data lacks (round to meaningful figures).

---

## A9. Accessibility Standards (WCAG 2.1 AA)

- **Contrast:** text ≥ 4.5:1, large text/UI/graphical objects ≥ 3:1. Accent text uses `accent-600/700`; never `accent-500` for small text on white.
- **Focus rings:** visible on all interactive elements via `--ring-focus` (2px offset + 2px accent). Never `outline:none` without a replacement. Focus order follows visual order.
- **Keyboard navigation:** every action reachable and operable by keyboard — nav, filters, table sort, chart data-point focus, map region selection, modals with focus trap + Esc + restore focus. Skip-to-content link first in tab order.
- **ARIA for charts/maps:** each chart has an accessible name (`aria-label`/`figure` + `figcaption`) and a **visually-hidden data table or `aria-describedby` summary** as the text alternative. Map regions are focusable with `role`/`aria-label` = "{region}: {value}". Color is never the sole encoding (WCAG 1.4.1).
- **prefers-reduced-motion:** disables non-essential transitions and skeleton shimmer; content still updates.
- **Semantic landmarks:** `header`, `nav`, `main`, `aside`, `footer`; one `h1` per page; headings nest without skipping; lists are real lists; buttons are `<button>`, links are `<a>`.
- **Forms/controls:** all inputs labelled; error text tied via `aria-describedby`; live regions (`aria-live="polite"`) announce async data updates and toast notifications.

---

## A10. Required Page Set & Information Architecture

Every product ships **the same five page types**, in the same order, so navigation transfers across the portfolio:

1. **Landing** — one-sentence value prop, the single most important stat, a screenshot/preview, and a primary CTA into the overview. Honest framing: what this is, who it's for, data recency.
2. **Executive overview** — KPI row (3–4 stats) + 2–3 headline charts + 1–2 insight/finding cards. Skim-first; every metric has a definition tooltip.
3. **Detailed analytical view(s)** (1–2) — the core interactive work: filter bar + choropleth/table/breakdowns. This is where an analyst spends time.
4. **Methodology / Data page** — data sources (named + linked), collection cadence, pipeline overview (Python/DuckDB), key assumptions, known limitations, metric definitions glossary, update schedule.
5. **About this product** — problem statement, who benefits, tech stack, roadmap, author (Jean-Luc Saint-Fleur) + links. Positions the work for recruiters/hiring managers.

**Consistent nav/IA:** left rail order = Overview → Analytical view(s) → Methodology → About; Landing lives outside the rail (marketing surface). Breadcrumbs on every in-app page. URL reflects filter state.

---

## A11. Content & Microcopy Tone

- **Voice:** precise, calm, confident, plain. Explain, don't sell. Second person sparingly. No exclamation marks in product surfaces.
- **No fake real-time.** Never "live" / "real-time" unless the pipeline truly streams. Say "Data current as of {date}, updated {cadence}."
- **No unexplained metrics.** Every metric, index, or score has a definition tooltip (`ⓘ`) giving meaning, unit, and computation basis. Composite indices link to methodology.
- **Freshness + source everywhere.** Each data view and the footer state the source dataset(s) and the as-of date. Modeled/estimated values are labeled as such.
- **Honest caveats.** Surface limitations near the affected chart (methodology callout), not buried. Sample sizes and confidence shown where they change interpretation.
- **Numbers:** consistent rounding and units per A8; never imply false precision.
- **Empty/error copy:** helpful and specific ("No counties match these filters — try widening the date range"), never cute or blaming.

---

# SECTION B — PORTFOLIO-WIDE QUALITY RUBRIC

Applied at each milestone (design review, feature-complete, pre-deploy, post-deploy). Each product is scored from **ten reviewer lenses**; findings are triaged by severity; the **Definition of Done** gate must fully pass before a product is "portfolio-ready."

## B1. Ten Reviewer Lenses

### 1. Product Executive
- [ ] The product answers a real, stated question for a named audience within 10 seconds of landing.
- [ ] Executive overview communicates the headline insight without interaction.
- [ ] Every KPI ties to a decision someone could plausibly make.
- [ ] Value proposition is specific (not "insights about housing" but "which counties face displacement risk next quarter").
- [ ] Scope is coherent — no half-built features presented as done.

### 2. Senior Data Scientist
- [ ] Metric definitions are statistically sound; composite indices document their weighting and inputs.
- [ ] Uncertainty is quantified and shown (CIs, sample sizes, modeled vs. observed).
- [ ] No spurious precision, no misleading aggregation (Simpson's paradox checked where relevant).
- [ ] Any ML/model claims (e.g., Marketplace Compass order-risk) report a baseline, evaluation metric, and validation approach.
- [ ] Correlation is not presented as causation; confounders acknowledged.
- [ ] Data leakage / temporal leakage checked for predictive views.

### 3. Senior Analytics Engineer
- [ ] Python/DuckDB pipeline is reproducible from raw → serving with one documented command.
- [ ] Transformations are tested (row counts, null rates, key uniqueness, referential integrity).
- [ ] Data freshness/lineage is tracked and surfaced to the UI (the freshness pill is real).
- [ ] Schemas are typed and documented; no silent coercions.
- [ ] Idempotent, incremental where sensible; failures are observable.
- [ ] Serving layer (static export / API) matches what the frontend consumes — no drift.

### 4. Senior Frontend Engineer
- [ ] Next.js 15 App Router used idiomatically (Server Components for data, Client only where needed).
- [ ] TypeScript strict; no `any` in data contracts; shared types for pipeline output.
- [ ] All four data-view states implemented (loading/empty/error/no-permission).
- [ ] No layout shift (CLS ~0); images/fonts optimized via `next/font`/`next/image`.
- [ ] Lighthouse: Performance ≥ 90, Best Practices ≥ 95 on the overview route.
- [ ] Filter state in URL; no unnecessary client re-fetch; errors caught at boundaries.

### 5. UX Design Director
- [ ] Design tokens (A2) used consistently — no off-scale spacing, ad-hoc colors, or rogue radii.
- [ ] Visual hierarchy guides the eye; density appropriate per page (overview airy, analytical dense).
- [ ] Component usage matches specs (A6); states feel considered, not stubbed.
- [ ] Motion is purposeful and consistent; nothing janky.
- [ ] The product feels premium and part of the portfolio family (shell, type, accent).

### 6. Accessibility Reviewer
- [ ] axe/Lighthouse a11y ≥ 95, zero critical violations.
- [ ] Full keyboard operability including charts, tables, maps, modals; visible focus everywhere.
- [ ] Contrast passes AA for text and graphical objects (verified, not assumed).
- [ ] Charts/maps have text alternatives; color is never the sole encoding.
- [ ] `prefers-reduced-motion` honored; landmarks and heading order correct; live regions announce updates.

### 7. Security Reviewer
- [ ] No secrets in the repo or client bundle; env vars server-side only.
- [ ] Dependencies free of known criticals (`npm audit` / Dependabot clean).
- [ ] Security headers set (CSP, HSTS, X-Content-Type-Options, Referrer-Policy) via Vercel/Next config.
- [ ] Any API routes validate input and rate-limit; no injection into DuckDB queries (parameterized).
- [ ] No PII in published datasets; licensing/attribution of source data respected.

### 8. Recruiter
- [ ] In 30 seconds, it's clear *what problem* this solves and *what the author did*.
- [ ] About page names the person, the stack, and the role-relevant skills.
- [ ] Live URL works instantly, loads fast, looks professional on first screen.
- [ ] Reads as senior/hireable, not a tutorial clone.
- [ ] Easy path to code repo, LinkedIn, and other portfolio products.

### 9. Hiring Manager
- [ ] Demonstrates end-to-end ownership: data → model/metrics → API → UI → deploy.
- [ ] Trade-offs and limitations are stated (signals judgment, not just execution).
- [ ] Code quality is inspectable and clean; commits/README show engineering maturity.
- [ ] The work would survive a technical deep-dive interview (methodology holds up).
- [ ] Distinguishes this candidate from a bootcamp portfolio.

### 10. Portfolio Reviewer (cross-product)
- [ ] All five products share one coherent design system; only accent differs.
- [ ] Consistent IA, nav, states, and quality bar across products.
- [ ] Together they tell a story (breadth of domains, depth of craft) without redundancy.
- [ ] Cross-links between products work; a hub/index ties them together.
- [ ] No weakest-link product drags the set; the floor is high.

---

## B2. Severity Taxonomy

| Severity | Definition | Example finding |
|---|---|---|
| **Critical** | Ships false information, is broken/unreachable, or exposes a security/privacy risk. Blocks release outright. | Choropleth uses truncated axis making a 2% change look like 40%; secret key in client bundle; overview route 500s in prod. |
| **High** | Materially undermines correctness, trust, accessibility, or professional credibility. Must fix before "Done." | KPI has no definition and can't be reproduced from methodology; keyboard users can't operate the filter bar; freshness pill shows a hardcoded date. |
| **Medium** | Noticeable quality gap that a discerning reviewer will catch; degrades polish or usability but not correctness. | Empty state is a bare "No data"; inconsistent number formatting between two charts; chart legend overflows on tablet. |
| **Low** | Minor polish/consistency issue with limited impact. | 12px off-scale padding on one card; tooltip delay slightly long; caption uses sentence case where portfolio uses title case. |
| **Enhancement** | Not a defect; an opportunity to raise the ceiling. | Add CSV export to the analytical table; add a model-explainability panel to Marketplace Compass. |

Triage rule: **any Critical or unresolved High blocks the Definition of Done.** Medium/Low are tracked; Enhancements are backlog.

---

## B3. Definition of Done — Gate List

A product is portfolio-ready only when **all eleven gates pass**. Each has a concrete acceptance test.

| # | Gate | Acceptance test |
|---|---|---|
| 1 | **Accurate** | Every displayed number is reproducible by re-running the pipeline; a spot-check of 3 metrics matches the source data exactly; no metric lacks a definition. |
| 2 | **Useful** | A target user can answer the product's core question in ≤ 3 clicks from the overview; at least one non-obvious, decision-relevant insight is surfaced. |
| 3 | **Polished** | Design-token audit passes (no off-scale values); a design director sign-off with zero open Medium+ visual findings; consistent with portfolio shell. |
| 4 | **Responsive** | Renders correctly at 360, 768, 1024, 1440px with no overflow, no CLS > 0.1, and nav collapses per A5. |
| 5 | **Accessible** | axe = 0 critical violations, Lighthouse a11y ≥ 95, and a full keyboard-only walkthrough of every page completes without a mouse. |
| 6 | **Documented** | Methodology page lists sources + cadence + assumptions + limitations; repo README explains setup, pipeline, and architecture; metric glossary complete. |
| 7 | **Tested** | Pipeline data tests (nulls/keys/row counts) pass in CI; frontend has component tests for the four states plus an e2e smoke test of the overview + one analytical view. |
| 8 | **Deployed** | Live on Vercel at a stable URL; production build green; preview deploys on PRs; freshness pill reflects the real last-run timestamp. |
| 9 | **Recruiter-friendly** | A cold reviewer identifies problem, author, and stack within 30 seconds; About + repo + contact links all resolve. |
| 10 | **Technically credible** | Methodology withstands a data-scientist review with no open High finding; model claims include baseline + eval + validation. |
| 11 | **Differentiated** | Clearly not a tutorial clone: novel dataset framing, a real pipeline, and craft that separates it from a template; portfolio reviewer confirms it earns its place among the five. |

---

## B4. Scoring Table Template

Reviewers score each lens **0–5** (0 = absent, 3 = acceptable, 5 = exemplary), note the worst open severity, and give a one-line verdict. Product passes review when **every lens ≥ 3, no open Critical/High, and all 11 Done-gates pass.**

| Lens | Score (0–5) | Worst open severity | Blocking? | Notes |
|---|---|---|---|---|
| Product Executive |  |  |  |  |
| Senior Data Scientist |  |  |  |  |
| Senior Analytics Engineer |  |  |  |  |
| Senior Frontend Engineer |  |  |  |  |
| UX Design Director |  |  |  |  |
| Accessibility Reviewer |  |  |  |  |
| Security Reviewer |  |  |  |  |
| Recruiter |  |  |  |  |
| Hiring Manager |  |  |  |  |
| Portfolio Reviewer |  |  |  |  |
| **Overall** | **/50** | — | — | — |

**Done-gate checklist:**

| Gate | Pass? | Gate | Pass? |
|---|---|---|---|
| 1 Accurate | ☐ | 7 Tested | ☐ |
| 2 Useful | ☐ | 8 Deployed | ☐ |
| 3 Polished | ☐ | 9 Recruiter-friendly | ☐ |
| 4 Responsive | ☐ | 10 Technically credible | ☐ |
| 5 Accessible | ☐ | 11 Differentiated | ☐ |
| 6 Documented | ☐ | | |

**Milestone verdict:** ☐ Blocked ☐ Conditional (Medium/Low tracked) ☐ Portfolio-ready

---

*End of document. Section A is inherited unchanged by all five products (accent tokens per A4); Section B is run at every milestone until all gates pass.*
