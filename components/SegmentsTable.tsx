import {
  fmtInt,
  fmtPct,
  fmtCurrency,
  fmtDecimal,
  SEGMENT_META,
  segmentColor,
} from "@/lib/format";
import type { Segment } from "@/lib/types";

export function SegmentsTable({ segments }: { segments: Segment[] }) {
  const rows = [...segments].sort((a, b) => b.total_monetary - a.total_monetary);
  return (
    <div tabIndex={0} className="ds-focus-ring overflow-x-auto rounded-[var(--radius-xl)] border border-[var(--border-default)] bg-[var(--bg-panel)]">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-[var(--bg-inset)] text-left text-xs uppercase tracking-wide text-[var(--text-tertiary)]">
            <th className="px-4 py-2.5 font-medium">Segment</th>
            <th className="px-4 py-2.5 text-right font-medium">Customers</th>
            <th className="px-4 py-2.5 text-right font-medium">% base</th>
            <th className="px-4 py-2.5 text-right font-medium">Avg spend</th>
            <th className="px-4 py-2.5 text-right font-medium">Avg orders</th>
            <th className="px-4 py-2.5 text-right font-medium">Pred. repeat</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((s) => (
            <tr key={s.segment} className="border-t border-[var(--border-subtle)] align-top">
              <td className="px-4 py-3">
                <div className="flex items-center gap-2">
                  <span
                    className="mt-0.5 h-2.5 w-2.5 shrink-0 rounded-sm"
                    style={{ backgroundColor: segmentColor(s.segment) }}
                    aria-hidden="true"
                  />
                  <div>
                    <span className="font-medium text-[var(--text-primary)]">{s.segment}</span>
                    <span className="block text-xs text-[var(--text-tertiary)]">
                      {s.recommended_action ?? SEGMENT_META[s.segment]?.blurb}
                    </span>
                  </div>
                </div>
              </td>
              <td className="px-4 py-3 text-right tabular-nums text-[var(--text-secondary)]">
                {fmtInt(s.customers)}
              </td>
              <td className="px-4 py-3 text-right tabular-nums text-[var(--text-secondary)]">
                {fmtPct(s.pct_of_base)}
              </td>
              <td className="px-4 py-3 text-right tabular-nums text-[var(--text-secondary)]">
                {fmtCurrency(s.avg_monetary)}
              </td>
              <td className="px-4 py-3 text-right tabular-nums text-[var(--text-secondary)]">
                {fmtDecimal(s.avg_frequency, 1)}
              </td>
              <td className="px-4 py-3 text-right tabular-nums font-medium text-[var(--text-primary)]">
                {fmtPct(s.avg_predicted_repeat_prob)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
