import { featureLabel, fmtDecimal } from "@/lib/format";

/**
 * Dependency-free horizontal SVG bar chart of permutation feature importance
 * (mean ROC-AUC drop when a feature is shuffled). Negative values shrink the
 * bar to zero-width and are annotated; the exact numbers also appear as text.
 */
export function FeatureImportanceChart({
  importances,
}: {
  importances: Record<string, number>;
}) {
  const rows = Object.entries(importances).sort((a, b) => b[1] - a[1]);
  const max = Math.max(...rows.map(([, v]) => v), 0.0001);

  const rowH = 30;
  const gap = 10;
  const labelW = 148;
  const valueW = 62;
  const barMax = 320;
  const width = labelW + barMax + valueW;
  const height = rows.length * (rowH + gap) - gap;

  const summary = rows
    .map(([k, v]) => `${featureLabel(k)} ${fmtDecimal(v)}`)
    .join("; ");

  return (
    <figure className="m-0">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        width="100%"
        role="img"
        aria-label={`Feature importance by ROC-AUC drop: ${summary}`}
        className="max-w-full"
      >
        {rows.map(([key, value], i) => {
          const y = i * (rowH + gap);
          const w = Math.max(0, (value / max) * barMax);
          return (
            <g key={key}>
              <text
                x={labelW - 10}
                y={y + rowH / 2}
                textAnchor="end"
                dominantBaseline="central"
                className="fill-ink-soft"
                fontSize="12.5"
              >
                {featureLabel(key)}
              </text>
              <rect
                x={labelW}
                y={y}
                width={barMax}
                height={rowH}
                rx="4"
                className="fill-slate-100"
              />
              <rect
                x={labelW}
                y={y}
                width={w}
                height={rowH}
                rx="4"
                className="fill-[var(--data-primary)]"
              />
              <text
                x={labelW + Math.max(w, 2) + 8}
                y={y + rowH / 2}
                dominantBaseline="central"
                className="fill-ink tabular-nums"
                fontSize="12"
                fontWeight="600"
              >
                {value >= 0 ? fmtDecimal(value) : `${fmtDecimal(value)}`}
              </text>
            </g>
          );
        })}
      </svg>
      <figcaption className="mt-2 text-xs text-ink-faint">
        Permutation importance = mean drop in test ROC-AUC when a feature is
        shuffled. Near-zero or negative values (e.g. Is UK, Unique products) carry
        little signal.
      </figcaption>
    </figure>
  );
}
