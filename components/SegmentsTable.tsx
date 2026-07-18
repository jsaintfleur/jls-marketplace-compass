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
    <div className="overflow-hidden rounded-xl border border-slate-200">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-slate-50 text-left text-xs uppercase tracking-wide text-ink-muted">
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
            <tr key={s.segment} className="border-t border-slate-100 align-top">
              <td className="px-4 py-3">
                <div className="flex items-center gap-2">
                  <span
                    className="mt-0.5 h-2.5 w-2.5 shrink-0 rounded-sm"
                    style={{ backgroundColor: segmentColor(s.segment) }}
                    aria-hidden="true"
                  />
                  <div>
                    <span className="font-medium text-ink">{s.segment}</span>
                    <span className="block text-xs text-ink-muted">
                      {SEGMENT_META[s.segment]?.blurb}
                    </span>
                  </div>
                </div>
              </td>
              <td className="px-4 py-3 text-right tabular-nums text-ink-soft">
                {fmtInt(s.customers)}
              </td>
              <td className="px-4 py-3 text-right tabular-nums text-ink-soft">
                {fmtPct(s.pct_of_base)}
              </td>
              <td className="px-4 py-3 text-right tabular-nums text-ink-soft">
                {fmtCurrency(s.avg_monetary)}
              </td>
              <td className="px-4 py-3 text-right tabular-nums text-ink-soft">
                {fmtDecimal(s.avg_frequency, 1)}
              </td>
              <td className="px-4 py-3 text-right tabular-nums font-medium text-ink">
                {fmtPct(s.avg_predicted_repeat_prob)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
