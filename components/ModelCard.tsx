import { fmtDecimal, fmtMultiple, fmtPct } from "@/lib/format";
import type { ModelMetrics } from "@/lib/types";

type Dir = "up" | "down";

function MetricRow({
  label,
  hgb,
  base,
  fmt,
  better,
}: {
  label: string;
  hgb: number;
  base: number;
  fmt: (n: number) => string;
  better: Dir;
}) {
  const hgbWins = better === "up" ? hgb > base : hgb < base;
  const win = "font-semibold text-[var(--data-primary)]";
  const dim = "text-ink-soft";
  return (
    <tr className="border-t border-slate-100">
      <td className="py-2.5 pr-3 text-ink-soft">{label}</td>
      <td className={`py-2.5 pr-3 text-right tabular-nums ${hgbWins ? win : dim}`}>
        {fmt(hgb)}
      </td>
      <td className={`py-2.5 text-right tabular-nums ${!hgbWins ? win : dim}`}>
        {fmt(base)}
      </td>
    </tr>
  );
}

export function ModelCard({ m }: { m: ModelMetrics }) {
  const hgb = m.model;
  const base = m.baseline;
  return (
    <div className="rounded-xl border border-slate-200 bg-panel p-6 shadow-card">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-[var(--accent-text)]">
            Model card
          </p>
          <h2 className="mt-1 text-lg font-semibold tracking-tight text-ink">
            Repeat-purchase model
          </h2>
          <p className="mt-1 max-w-md text-sm text-ink-muted">
            Predicts whether a customer buys again within 90 days of the cutoff.
            Evaluated on a strict temporal holdout (no shuffle, no leakage).
          </p>
        </div>
        <span className="rounded-full bg-[var(--accent-badge-bg)] px-3 py-1 text-xs font-medium text-[var(--accent-text)]">
          Temporal holdout · n={m.n_test.toLocaleString("en-US")}
        </span>
      </div>

      <table className="mt-5 w-full text-sm">
        <thead>
          <tr className="text-xs uppercase tracking-wide text-ink-muted">
            <th className="pb-1 text-left font-medium">Metric</th>
            <th className="pb-1 text-right font-medium">HGB (model)</th>
            <th className="pb-1 text-right font-medium">Logistic (baseline)</th>
          </tr>
        </thead>
        <tbody>
          <MetricRow label="ROC-AUC" hgb={hgb.roc_auc} base={base.roc_auc} fmt={fmtDecimal} better="up" />
          <MetricRow label="PR-AUC" hgb={hgb.pr_auc} base={base.pr_auc} fmt={fmtDecimal} better="up" />
          <MetricRow label="Brier (lower is better)" hgb={hgb.brier} base={base.brier} fmt={fmtDecimal} better="down" />
          <MetricRow
            label="Top-decile lift"
            hgb={hgb.top_decile_lift}
            base={base.top_decile_lift}
            fmt={fmtMultiple}
            better="up"
          />
        </tbody>
      </table>

      <p className="mt-4 rounded-lg border border-amber-200 bg-amber-50/70 p-3 text-[13px] leading-relaxed text-amber-900/90">
        <b>Honest read:</b> the logistic baseline slightly edges the gradient-boosted
        model on ROC-AUC ({fmtDecimal(base.roc_auc)} vs {fmtDecimal(hgb.roc_auc)}, a{" "}
        {fmtDecimal(Math.abs(m.auc_uplift_vs_baseline))} gap), while HGB wins on
        PR-AUC ({fmtDecimal(hgb.pr_auc)} vs {fmtDecimal(base.pr_auc)}) — the metric
        that matters most for ranking who to retain. Both models beat a{" "}
        {fmtPct(m.test_base_rate)} base rate and lift the top decile ~
        {fmtMultiple(hgb.top_decile_lift)}. On this dataset a well-regularized linear
        model is a genuinely strong baseline; we report it rather than hide it.
      </p>
    </div>
  );
}
