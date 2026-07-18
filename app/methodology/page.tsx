import { getSources, getModelMetrics, getSummary } from "@/lib/data";
import { fmtDecimal, fmtMultiple, fmtPct } from "@/lib/format";
import { DataTable, SectionHeader } from "@/lib/design/primitives";

export const metadata = { title: "Methodology & Data — Marketplace Compass" };

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-10">
      <h2 className="text-xl font-semibold tracking-tight text-[var(--text-primary)]">{title}</h2>
      <div className="mt-3 space-y-3 text-[15px] leading-relaxed text-[var(--text-secondary)]">{children}</div>
    </section>
  );
}

export default function MethodologyPage() {
  const meta = getSources();
  const m = getModelMetrics();
  const s = getSummary();

  return (
    <main className="mx-auto max-w-4xl px-5 pb-10 pt-12 sm:px-6">
      <SectionHeader eyebrow="Methodology & data" title="A model card for retention decisions">
        <p>
          Marketplace Compass is built for campaign planning: score customers, inspect calibration,
          choose a threshold, and export a segment playbook. The baseline comparison and leakage guard
          stay visible.
        </p>
      </SectionHeader>

      <Section title="Data sources and licenses">
        <DataTable
          caption="Marketplace Compass data sources and licenses."
          columns={["Source", "Role", "License"]}
          rows={meta.datasets.map((d) => [d.name, d.role, d.license])}
        />
        <p className="text-sm">
          The demo uses UCI Online Retail II (CC BY 4.0), downloaded keylessly. Olist Brazilian
          E-Commerce remains the richer intended target but is Kaggle-gated and CC BY-NC-SA 4.0, so
          Olist-powered delivery/geospatial models are proposed only.
        </p>
      </Section>

      <Section title="Model design">
        <p>
          The task is {m.task}. The label is{" "}
          <code className="rounded bg-[var(--bg-inset)] px-1.5 py-0.5 text-[13px]">{m.label_definition}</code>.
          Features are RFM-style behavior available before the cutoff: {m.features.join(", ")}.
        </p>
        <p>
          The split is temporal, not random: train cutoff {m.split.train_cutoff}, test cutoff{" "}
          {m.split.test_cutoff}. {m.leakage_guard}. A unit test and validation gate assert that no
          suspicious post-outcome or label-derived feature names are present.
        </p>
      </Section>

      <Section title="Measured results">
        <ul className="ml-5 list-disc space-y-2">
          <li>ROC-AUC: HGB {fmtDecimal(m.model.roc_auc)} vs logistic baseline {fmtDecimal(m.baseline.roc_auc)}.</li>
          <li>PR-AUC: HGB {fmtDecimal(m.model.pr_auc)} vs {fmtDecimal(m.baseline.pr_auc)}.</li>
          <li>Brier: HGB {fmtDecimal(m.model.brier)} vs {fmtDecimal(m.baseline.brier)}; lower is better.</li>
          <li>Top-decile lift: {fmtMultiple(m.model.top_decile_lift)} on a {fmtPct(m.test_base_rate)} holdout base rate.</li>
          <li>Calibration mean absolute error: {fmtPct(s.calibration_mean_abs_error)}.</li>
        </ul>
        <p>
          The logistic baseline slightly wins ROC-AUC. The boosted model wins PR-AUC and lift. In a
          real CRM stack, that means the model is useful for ranking, while probability calibration
          should be monitored before spend is automated.
        </p>
      </Section>

      <Section title="Threshold economics">
        <p>
          The threshold grid is computed on the temporal holdout. It assumes ${m.threshold_policy.assumptions.benefit_per_saved_customer.toFixed(0)}
          {" "}value per retained customer and ${m.threshold_policy.assumptions.cost_per_offer.toFixed(0)} cost
          per offer. The UI slider recomputes targeted customers, precision, capture, and expected net
          value from this grid.
        </p>
      </Section>

      <Section title="Limitations">
        <ul className="ml-5 list-disc space-y-2">
          <li>One retailer and one historical window: {new Date(s.date_range[0]).getUTCFullYear()}-{new Date(s.date_range[1]).getUTCFullYear()}.</li>
          <li>CLV is a proxy, not a survival/BG-NBD model.</li>
          <li>Unit economics in the threshold slider are illustrative planning assumptions.</li>
          <li>Olist delivery and geospatial models are proposed, not computed here.</li>
        </ul>
      </Section>
    </main>
  );
}
