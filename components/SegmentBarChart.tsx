import { fmtInt, fmtCurrencyCompact, segmentColor } from "@/lib/format";
import type { Segment } from "@/lib/types";

/**
 * Dependency-free vertical SVG bar chart of RFM segments. Each segment shows a
 * customer-count bar; the average-monetary value sits above as a label so the
 * chart carries both size and value without a second axis. Numbers are also in
 * the accompanying table for non-visual access.
 */
export function SegmentBarChart({ segments }: { segments: Segment[] }) {
  const rows = [...segments].sort((a, b) => b.customers - a.customers);
  const max = Math.max(...rows.map((s) => s.customers), 1);

  const barW = 62;
  const gap = 26;
  const chartH = 210;
  const topPad = 26;
  const bottomPad = 46;
  const leftPad = 8;
  const width = leftPad * 2 + rows.length * barW + (rows.length - 1) * gap;
  const height = topPad + chartH + bottomPad;

  const summary = rows
    .map(
      (s) =>
        `${s.segment}: ${fmtInt(s.customers)} customers, avg spend ${fmtCurrencyCompact(
          s.avg_monetary,
        )}`,
    )
    .join("; ");

  return (
    <figure className="m-0">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        width="100%"
        role="img"
        aria-label={`RFM segment sizes and average customer value. ${summary}`}
        className="max-w-full"
      >
        {rows.map((s, i) => {
          const x = leftPad + i * (barW + gap);
          const h = (s.customers / max) * chartH;
          const y = topPad + chartH - h;
          return (
            <g key={s.segment}>
              <text
                x={x + barW / 2}
                y={y - 8}
                textAnchor="middle"
                className="fill-ink tabular-nums"
                fontSize="11.5"
                fontWeight="600"
              >
                {fmtCurrencyCompact(s.avg_monetary)}
              </text>
              <rect
                x={x}
                y={y}
                width={barW}
                height={h}
                rx="5"
                fill={segmentColor(s.segment)}
              />
              <text
                x={x + barW / 2}
                y={topPad + chartH + 18}
                textAnchor="middle"
                className="fill-ink-soft"
                fontSize="11.5"
                fontWeight="600"
              >
                {s.segment}
              </text>
              <text
                x={x + barW / 2}
                y={topPad + chartH + 34}
                textAnchor="middle"
                className="fill-ink-faint tabular-nums"
                fontSize="10.5"
              >
                {fmtInt(s.customers)}
              </text>
            </g>
          );
        })}
      </svg>
      <figcaption className="mt-2 text-xs text-ink-faint">
        Bar height = customers in segment; label above each bar = average lifetime
        spend per customer.
      </figcaption>
    </figure>
  );
}
