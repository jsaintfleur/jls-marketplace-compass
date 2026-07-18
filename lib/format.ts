export const nf = new Intl.NumberFormat("en-US");

/** Whole number with thousands separators. */
export const fmtInt = (n: number) => nf.format(Math.round(n));

/** Fraction in [0,1] -> percent string, e.g. 0.7239 -> "72.4%". */
export const fmtPct = (frac: number | null, digits = 1) =>
  frac == null ? "—" : `${(Number(frac) * 100).toFixed(digits)}%`;

/** A value already expressed in percentage points, e.g. 42.7 -> "42.7%". */
export const fmtPctPoints = (pts: number | null, digits = 1) =>
  pts == null ? "—" : `${Number(pts).toFixed(digits)}%`;

/** Plain decimal, e.g. 0.7829 -> "0.783". */
export const fmtDecimal = (n: number | null, digits = 3) =>
  n == null ? "—" : Number(n).toFixed(digits);

/** Multiplier, e.g. 2.1415 -> "2.14×". */
export const fmtMultiple = (n: number | null, digits = 2) =>
  n == null ? "—" : `${Number(n).toFixed(digits)}×`;

/** Compact currency, e.g. 17743429 -> "$17.7M", 14567.99 -> "$14.6K". */
export function fmtCurrencyCompact(n: number | null): string {
  if (n == null) return "—";
  const v = Number(n);
  const abs = Math.abs(v);
  const sign = v < 0 ? "-" : "";
  if (abs >= 1_000_000_000) return `${sign}$${(abs / 1_000_000_000).toFixed(1)}B`;
  if (abs >= 1_000_000) return `${sign}$${(abs / 1_000_000).toFixed(1)}M`;
  if (abs >= 1_000) return `${sign}$${(abs / 1_000).toFixed(1)}K`;
  return `${sign}$${abs.toFixed(0)}`;
}

/** Full currency with thousands separators, e.g. 14567.99 -> "$14,568". */
export const fmtCurrency = (n: number | null) =>
  n == null ? "—" : `$${nf.format(Math.round(Number(n)))}`;

/** Human-readable label for a raw model feature name. */
const FEATURE_LABELS: Record<string, string> = {
  recency_days: "Recency (days)",
  frequency: "Frequency (orders)",
  monetary: "Monetary (spend)",
  tenure_days: "Tenure (days)",
  avg_basket_value: "Avg basket value",
  unique_products: "Unique products",
  is_uk: "Is UK",
  country_freq: "Country frequency",
};
export const featureLabel = (key: string): string =>
  FEATURE_LABELS[key] ??
  key.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

/** Bar width as a percentage of a max, clamped to [0,100]. */
export function barWidthPct(value: number, max: number): number {
  if (!(max > 0)) return 0;
  return Math.max(0, Math.min(100, (value / max) * 100));
}

/**
 * RFM segment palette + one-line playbook. Indigo brand family plus supporting
 * accents so Champions read as the strongest tone and Hibernating the faintest.
 */
export const SEGMENT_META: Record<string, { color: string; blurb: string }> = {
  Champions: {
    color: "#4338ca",
    blurb: "Recent, frequent, high-spend — reward and ask for referrals.",
  },
  Loyal: {
    color: "#4f46e5",
    blurb: "Steady repeat buyers — upsell and protect the relationship.",
  },
  Potential: {
    color: "#6366f1",
    blurb: "Recent but light — nurture toward a second and third order.",
  },
  "At-Risk": {
    color: "#f59e0b",
    blurb: "Formerly valuable, now lapsing — win back before they churn.",
  },
  Hibernating: {
    color: "#94a3b8",
    blurb: "Long dormant, low value — low-cost reactivation only.",
  },
};

export const segmentColor = (segment: string): string =>
  SEGMENT_META[segment]?.color ?? "#6366f1";
