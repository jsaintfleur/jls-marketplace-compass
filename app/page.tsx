import Link from "next/link";
import { getSummary, getModelMetrics, getSegments, getSources } from "@/lib/data";
import { fmtInt, fmtPct, fmtCurrencyCompact, fmtDecimal, fmtMultiple } from "@/lib/format";
import { KpiCard } from "@/components/KpiCard";
import { ModelCard } from "@/components/ModelCard";
import { SegmentsTable } from "@/components/SegmentsTable";
import { ExportActions } from "@/components/ExportActions";
import { LazyCalibrationCurve, LazyFeatureImportanceChart, LazyLiftCurve, LazySegmentBarChart, LazyThresholdSimulator } from "@/components/LazyCharts";
import { Badge, Callout, FreshnessPill, SectionHeader } from "@/lib/design/primitives";

export default function OverviewPage() {
  const s = getSummary();
  const m = getModelMetrics();
  const seg = getSegments();
  const src = getSources();

  const [rangeStart, rangeEnd] = s.date_range;
  const fmtDate = (d: string) =>
    new Date(d).toLocaleDateString("en-US", { year: "numeric", month: "short", timeZone: "UTC" });
  const defaultPolicy = m.threshold_policy.rows.find((r) => Math.abs(r.threshold - 0.5) < 1e-9) ?? m.threshold_policy.rows[0];
  const topSegment = seg.segments.slice().sort((a, b) => b.total_monetary - a.total_monetary)[0];

  const findings = [
    {
      finding: `The model captures ${fmtPct(m.lift_curve[0].capture_rate)} of repeat buyers in the top 10% of scores.`,
      implication: `Top-decile lift is ${fmtMultiple(s.model_top_decile_lift)}, so ranking is useful even though the baseline edges ROC-AUC.`,
      action: "Use the score to prioritize outreach, not to claim the boosted model beats every simpler benchmark.",
    },
    {
      finding: `At a 0.50 threshold, ${fmtInt(defaultPolicy.targeted_customers)} customers qualify for retention action.`,
      implication: `Under the illustrative economics, expected net value is ${fmtCurrencyCompact(defaultPolicy.expected_net_value)}.`,
      action: "Tune the threshold by margin and capacity before launching a CRM campaign.",
    },
    {
      finding: `${topSegment.segment} carries ${fmtCurrencyCompact(topSegment.total_monetary)} of historical spend.`,
      implication: `Segment strategy matters: not every high-probability customer needs a discount.`,
      action: topSegment.recommended_action,
    },
    {
      finding: `Calibration mean absolute error is ${fmtPct(s.calibration_mean_abs_error)}.`,
      implication: "The ranking is stronger than the probability calibration.",
      action: "Use scores for prioritization and monitor observed response rates before automating spend.",
    },
  ];

  return (
    <main className="mx-auto max-w-7xl px-5 pb-12 sm:px-6">
      <section className="grid gap-8 pb-8 pt-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(320px,0.7fr)] lg:items-end">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--accent-text)]">
            Retail Analytics · Retention Intelligence
          </p>
          <h1 className="mt-3 max-w-3xl text-4xl font-semibold tracking-tight text-[var(--text-primary)] sm:text-5xl">
            Turn model scores into retention decisions.
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-[var(--text-secondary)]">
            Marketplace Compass converts transaction history into repeat-purchase scores, segment
            actions, and threshold economics a CRM team can take into campaign planning.
          </p>
          <div className="mt-5 flex flex-wrap items-center gap-3">
            <Link href="/methodology" className="ds-focus-ring rounded-[var(--radius-md)] bg-[var(--accent-600)] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[var(--accent-700)]">
              Review methodology
            </Link>
            <FreshnessPill label={`${fmtDate(rangeStart)}-${fmtDate(rangeEnd)}`} />
            <Badge tone="warning">Baseline comparison preserved</Badge>
          </div>
        </div>
        <aside className="rounded-[var(--radius-xl)] border border-[var(--border-default)] bg-[var(--bg-panel)] p-5 shadow-[var(--shadow-1)]">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--text-tertiary)]">
            Model-card rule
          </p>
          <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">
            The boosted model wins PR-AUC and top-decile lift, but logistic regression slightly wins
            ROC-AUC. That is a useful warning: start with ranking and economics, not model theater.
          </p>
        </aside>
      </section>

      <section aria-label="Key metrics" className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <KpiCard label="Customers" value={fmtInt(s.customers)} sub="unique buyers" hint="Distinct customers after cleaning non-positive lines and cancellations." />
        <KpiCard label="Revenue" value={fmtCurrencyCompact(s.revenue)} sub="cleaned line-item gross" hint="Total cleaned transaction revenue in UCI Online Retail II." />
        <KpiCard label="Model ROC-AUC" value={fmtDecimal(s.model_roc_auc)} sub={`baseline ${fmtDecimal(s.baseline_roc_auc)}`} hint="Measures overall ranking quality; here the logistic baseline slightly edges the boosted model." />
        <KpiCard label="Top-decile lift" value={fmtMultiple(s.model_top_decile_lift)} sub="repeat-buyer capture" hint="How much better the top 10% of scores perform versus the average customer." />
        <KpiCard label="Threshold net value" value={fmtCurrencyCompact(s.threshold_default_expected_net_value)} sub="at score ≥ 0.50" hint="Illustrative economics: retained-customer value minus offer cost on the temporal holdout." />
      </section>

      <section className="mt-10">
        <SectionHeader eyebrow="Executive summary" title="What a CRM lead should do next">
          <p>Each recommendation ties to a computed model or segment result.</p>
        </SectionHeader>
        <div className="grid gap-4 lg:grid-cols-2">
          {findings.map((item, index) => (
            <article key={item.finding} className="rounded-[var(--radius-xl)] border border-[var(--border-default)] bg-[var(--bg-panel)] p-5 shadow-[var(--shadow-1)]">
              <div className="flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--accent-600)] text-sm font-semibold text-white">{index + 1}</span>
                <h2 className="font-semibold text-[var(--text-primary)]">{item.finding}</h2>
              </div>
              <p className="mt-3 text-sm leading-6 text-[var(--text-secondary)]"><b>Implication:</b> {item.implication}</p>
              <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]"><b>Recommended action:</b> {item.action}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-12 grid gap-6 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
        <ModelCard m={m} />
        <div className="rounded-[var(--radius-xl)] border border-[var(--border-default)] bg-[var(--bg-panel)] p-5 shadow-[var(--shadow-1)]">
          <SectionHeader eyebrow="Threshold economics" title="Choose who gets a retention offer">
            <p>Move the threshold to trade off reach, precision, repeat-buyer capture, and expected value.</p>
          </SectionHeader>
          <LazyThresholdSimulator rows={m.threshold_policy.rows} />
          <div className="mt-4">
            <Callout tone="info" title="So what?">
              A higher threshold saves budget but misses some repeat buyers. A lower threshold reaches
              more customers but spends on more false positives.
            </Callout>
          </div>
        </div>
      </section>

      <section className="mt-12 grid gap-6 lg:grid-cols-2">
        <div className="rounded-[var(--radius-xl)] border border-[var(--border-default)] bg-[var(--bg-panel)] p-5 shadow-[var(--shadow-1)]">
          <SectionHeader eyebrow="Calibration curve" title="Can the probabilities be trusted?">
            <p>Predicted versus observed repeat rate by score bin. Ranking is useful; calibration needs monitoring.</p>
          </SectionHeader>
          <LazyCalibrationCurve points={m.calibration} />
        </div>
        <div className="rounded-[var(--radius-xl)] border border-[var(--border-default)] bg-[var(--bg-panel)] p-5 shadow-[var(--shadow-1)]">
          <SectionHeader eyebrow="Lift curve" title="How much of the opportunity is captured?">
            <p>Shows how many true repeat buyers are captured as the campaign expands down the score list.</p>
          </SectionHeader>
          <LazyLiftCurve points={m.lift_curve} />
        </div>
      </section>

      <section className="mt-12 grid gap-6 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
        <div className="rounded-[var(--radius-xl)] border border-[var(--border-default)] bg-[var(--bg-panel)] p-5 shadow-[var(--shadow-1)]">
          <SectionHeader eyebrow="Feature importance" title="What drives the score">
            <p>Permutation importance on the temporal holdout; recency and purchase behavior carry the signal.</p>
          </SectionHeader>
          <LazyFeatureImportanceChart importances={m.feature_importance_auc_drop} />
        </div>
        <div className="rounded-[var(--radius-xl)] border border-[var(--border-default)] bg-[var(--bg-panel)] p-5 shadow-[var(--shadow-1)]">
          <SectionHeader eyebrow="Segment sizes" title="Actionable RFM segments">
            <p>{fmtInt(seg.n_customers)} customers labeled into five playbook-ready groups.</p>
          </SectionHeader>
          <LazySegmentBarChart segments={seg.segments} />
        </div>
      </section>

      <section className="mt-12">
        <SectionHeader eyebrow="Segment playbook" title="Move from segment to action">
          <p>Each row is computed from RFM behavior and paired with a campaign action.</p>
        </SectionHeader>
        <SegmentsTable segments={seg.segments} />
      </section>

      <section className="mt-12 grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(320px,0.55fr)]">
        <div className="rounded-[var(--radius-xl)] border border-[var(--border-default)] bg-[var(--bg-panel)] p-5 shadow-[var(--shadow-1)]">
          <SectionHeader eyebrow="How to use this" title="For a CRM lead or growth PM">
            <p>Use Marketplace Compass as a campaign planning surface, not as an automated decision engine.</p>
          </SectionHeader>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <h3 className="font-semibold text-[var(--text-primary)]">CRM / retention lead</h3>
              <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">
                Set a threshold based on budget, export scored customers, and tailor the offer by segment.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-[var(--text-primary)]">Growth PM</h3>
              <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">
                Use calibration and lift to decide whether to launch, monitor, or collect more cohorts.
              </p>
            </div>
          </div>
        </div>
        <aside className="rounded-[var(--radius-xl)] border border-[var(--border-default)] bg-[var(--bg-panel)] p-5 shadow-[var(--shadow-1)]">
          <h2 className="font-semibold text-[var(--text-primary)]">Export the playbook</h2>
          <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">
            Print the dashboard as a brief or download the scored-customer CSV for campaign sizing.
          </p>
          <div className="mt-4"><ExportActions /></div>
        </aside>
      </section>

      <section className="mt-12 rounded-[var(--radius-xl)] border border-[var(--border-default)] bg-[var(--bg-inset)] p-6">
        <h2 className="text-sm font-bold uppercase tracking-[0.16em] text-[var(--text-tertiary)]">Computed vs. proposed</h2>
        <div className="mt-3 grid gap-6 text-sm leading-6 text-[var(--text-secondary)] md:grid-cols-2">
          <div>
            <p className="font-semibold text-[var(--text-primary)]">Computed here</p>
            <ul className="mt-2 ml-4 list-disc space-y-1">{src.labels.computed.map((c) => <li key={c}>{c}</li>)}</ul>
          </div>
          <div>
            <p className="font-semibold text-[var(--text-primary)]">Proposed with Olist</p>
            <ul className="mt-2 ml-4 list-disc space-y-1">{src.labels.proposed_requires_olist.map((c) => <li key={c}>{c}</li>)}</ul>
          </div>
        </div>
        <p className="mt-4 max-w-4xl text-[13px] leading-6 text-[var(--text-tertiary)]">
          This demo runs on UCI Online Retail II (CC BY 4.0). Olist Brazilian E-Commerce remains the
          richer primary target but is Kaggle-gated and CC BY-NC-SA 4.0; it is documented, not used.
        </p>
      </section>
    </main>
  );
}
