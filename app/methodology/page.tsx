import { getSources, getModelMetrics, getSummary } from "@/lib/data";
import { fmtDecimal, fmtMultiple, fmtPct } from "@/lib/format";

export const metadata = { title: "Methodology & Data — Marketplace Compass" };

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-10">
      <h2 className="text-xl font-semibold tracking-tight text-ink">{title}</h2>
      <div className="mt-3 space-y-3 text-[15px] leading-relaxed text-ink-soft">{children}</div>
    </section>
  );
}

export default function MethodologyPage() {
  const meta = getSources();
  const m = getModelMetrics();
  const s = getSummary();

  return (
    <div className="mx-auto max-w-3xl px-6 pb-8 pt-14">
      <h1 className="text-3xl font-semibold tracking-tight text-ink">Methodology &amp; Data</h1>
      <p className="mt-3 text-lg leading-relaxed text-ink-soft">
        Marketplace Compass is built to be auditable: every KPI, segment, and model
        metric traces back to a public dataset through a reproducible pipeline. This
        page documents the sources, the method, the measured numbers, and the limits.
      </p>

      <Section title="Data sources">
        <div className="overflow-hidden rounded-xl border border-slate-200">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 text-left text-xs uppercase tracking-wide text-ink-muted">
                <th className="px-4 py-2.5 font-medium">Source</th>
                <th className="px-4 py-2.5 font-medium">Role</th>
                <th className="px-4 py-2.5 font-medium">License</th>
              </tr>
            </thead>
            <tbody>
              {meta.datasets.map((d) => (
                <tr key={d.name} className="border-t border-slate-100 align-top">
                  <td className="px-4 py-2.5">
                    <a
                      href={d.url}
                      className="font-medium text-brand-700 underline-offset-2 hover:underline"
                      target="_blank"
                      rel="noreferrer"
                    >
                      {d.name}
                    </a>
                    {d.description ? (
                      <span className="block text-xs text-ink-faint">{d.description}</span>
                    ) : null}
                    {d.note ? (
                      <span className="mt-1 block text-xs text-ink-muted">{d.note}</span>
                    ) : null}
                  </td>
                  <td className="px-4 py-2.5 text-ink-soft">{d.role}</td>
                  <td className="px-4 py-2.5 text-ink-soft">{d.license}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-sm text-ink-muted">
          The live demo uses UCI Online Retail II because it downloads without
          credentials. Olist is the richer intended target but requires Kaggle
          authentication (CC BY-NC-SA 4.0, non-commercial); its models are listed as
          proposed, not shown as results.
        </p>
      </Section>

      <Section title="Method">
        <p>
          <b>Repeat-purchase model.</b> {m.task}. The label is{" "}
          <code className="rounded bg-slate-100 px-1.5 py-0.5 text-[13px]">{m.label_definition}</code>
          . We compare a {m.model.name} against a {m.baseline.name} baseline on eight
          RFM-style features: {m.features.join(", ")}.
        </p>
        <p>
          <b>Temporal split &amp; leakage discipline.</b> {m.split.type}. Features are
          computed only from invoices dated before the cutoff, the label window sits
          strictly after it, and the test cutoff ({m.split.test_cutoff}) is after the
          train label window ends ({m.split.train_label_window[1]}) — so no information
          from the future leaks into training. {m.leakage_guard}. There is no random
          shuffle; the holdout is genuinely forward-in-time (train n={m.n_train.toLocaleString("en-US")},
          test n={m.n_test.toLocaleString("en-US")}).
        </p>
        <p>
          <b>RFM segmentation.</b> Every customer is scored on recency, frequency, and
          monetary value into quantile buckets (1–4), then rule-labeled into Champions,
          Loyal, Potential, At-Risk, and Hibernating segments.
        </p>
        <p>
          <b>CLV proxy.</b> A coarse 90-day value estimate:{" "}
          <code className="rounded bg-slate-100 px-1.5 py-0.5 text-[13px]">
            (historical monetary / tenure_days × 90) × predicted_repeat_prob
          </code>
          , tiered into Platinum/Gold/Silver/Bronze. It is a proxy, not a survival or
          BG/NBD model.
        </p>
      </Section>

      <Section title="Honest metrics">
        <p>
          All numbers are measured on the temporal holdout ({fmtPct(m.test_base_rate)}{" "}
          base rate), reported as-is:
        </p>
        <ul className="ml-5 list-disc space-y-1.5">
          <li>
            <b>ROC-AUC:</b> HGB {fmtDecimal(m.model.roc_auc)} vs logistic baseline{" "}
            {fmtDecimal(m.baseline.roc_auc)} — the baseline slightly wins (uplift{" "}
            {fmtDecimal(m.auc_uplift_vs_baseline)}).
          </li>
          <li>
            <b>PR-AUC:</b> HGB {fmtDecimal(m.model.pr_auc)} vs {fmtDecimal(m.baseline.pr_auc)}{" "}
            — HGB wins on the precision-recall metric most relevant to ranking who to
            retain.
          </li>
          <li>
            <b>Brier score:</b> HGB {fmtDecimal(m.model.brier)} vs {fmtDecimal(m.baseline.brier)}{" "}
            (lower is better) — near-parity calibration.
          </li>
          <li>
            <b>Top-decile lift:</b> HGB {fmtMultiple(m.model.top_decile_lift)} vs{" "}
            {fmtMultiple(m.baseline.top_decile_lift)} — targeting the top 10% finds
            repeat buyers at roughly twice the base rate.
          </li>
        </ul>
        <p>
          On this dataset a well-regularized linear model is a strong baseline. We show
          it beating the gradient-boosted model on ROC-AUC rather than hiding it — the
          gain from added model complexity is small here, and saying so is the point.
        </p>
      </Section>

      <Section title="Limitations (read before acting)">
        <ul className="ml-5 list-disc space-y-2">
          <li>
            <b>One retailer, one window.</b> UCI Online Retail II is a single UK-based
            online retailer, {new Date(s.date_range[0]).getFullYear()}–
            {new Date(s.date_range[1]).getFullYear()}; patterns may not generalize.
          </li>
          <li>
            <b>CLV is a proxy.</b> {meta.datasets.length > 0 ? "" : ""}Coarse expected-value
            heuristic, not a survival model; tenure &lt; 1 day is clipped to avoid
            divide-by-zero inflation.
          </li>
          <li>
            <b>Model uplift is marginal.</b> The gradient-boosted model does not clearly
            beat the linear baseline on this feature set; treat the choice as a tie and
            prefer the simpler, better-calibrated model in production.
          </li>
          <li>
            <b>Proposed models not shown as results:</b>{" "}
            {meta.labels.proposed_requires_olist.join("; ")} — these require Olist data.
          </li>
        </ul>
      </Section>

      <Section title="Reproducibility">
        <p>
          The pipeline is one command —{" "}
          <code className="rounded bg-slate-100 px-1.5 py-0.5 text-[13px]">npm run data</code>{" "}
          (<code className="rounded bg-slate-100 px-1.5 py-0.5 text-[13px]">python3 scripts/build_index.py</code>) —
          downloading UCI Online Retail II, cleaning it, computing the temporal-holdout
          model, RFM segments, and CLV tiers, then writing validated JSON that{" "}
          <code className="rounded bg-slate-100 px-1.5 py-0.5 text-[13px]">npm run validate</code>{" "}
          checks (schema, metric ranges, and leakage-token guards on feature names). No
          manual steps, no hand-edited numbers.
        </p>
      </Section>
    </div>
  );
}
