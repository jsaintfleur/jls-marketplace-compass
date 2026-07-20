"use client";

import { useMemo, useState } from "react";
import type { ThresholdPolicyRow } from "@/lib/types";
import { fmtCurrencyCompact, fmtInt, fmtPct } from "@/lib/format";

export function ThresholdSimulator({ rows }: { rows: ThresholdPolicyRow[] }) {
  const [threshold, setThreshold] = useState(0.5);
  const selected = useMemo(
    () => rows.reduce((best, row) => Math.abs(row.threshold - threshold) < Math.abs(best.threshold - threshold) ? row : best, rows[0]),
    [rows, threshold],
  );

  return (
    <div className="space-y-4">
      <div className="rounded-[var(--radius-lg)] border border-[var(--border-subtle)] bg-[var(--bg-inset)] p-4">
        <label className="text-sm font-semibold text-[var(--text-primary)]">
          Retention threshold: {selected.threshold.toFixed(2)}
          <input type="range" min="0.05" max="0.95" step="0.05" value={threshold} onChange={(e) => setThreshold(Number(e.currentTarget.value))} className="mt-3 w-full accent-[var(--accent-600)]" />
        </label>
        <dl className="mt-4 grid gap-3 sm:grid-cols-4">
          <Metric label="Targeted customers" value={fmtInt(selected.targeted_customers)} />
          <Metric label="Precision" value={fmtPct(selected.precision)} />
          <Metric label="Repeaters captured" value={fmtPct(selected.top_decile_capture)} />
          <Metric label="Net value" value={fmtCurrencyCompact(selected.expected_net_value)} />
        </dl>
      </div>
      <p className="text-xs leading-5 text-[var(--text-tertiary)]">
        Assumes $25 value per retained customer and $4 cost per offer. Use the slider to set how
        selective the campaign should be before exporting the scored customer list.
      </p>
    </div>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-[11px] font-bold uppercase tracking-[0.12em] text-[var(--text-tertiary)]">{label}</dt>
      <dd className="mt-1 text-lg font-semibold tabular-nums text-[var(--text-primary)]">{value}</dd>
    </div>
  );
}
