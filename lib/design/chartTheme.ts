export const chartTheme = {
  grid: "rgba(100, 116, 139, 0.22)",
  axis: "var(--text-tertiary)",
  text: "var(--text-secondary)",
  tooltip: {
    background: "var(--bg-panel)",
    border: "1px solid var(--border-default)",
    color: "var(--text-primary)",
    boxShadow: "var(--shadow-2)",
  },
  series: [
    "var(--accent-600)",
    "var(--info)",
    "var(--success)",
    "var(--warning)",
    "var(--danger)",
    "#64748b",
  ],
  uncertainty: "color-mix(in srgb, var(--accent-600) 18%, transparent)",
} as const;
