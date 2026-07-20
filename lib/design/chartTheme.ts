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
    "var(--data-primary)",
    "var(--info)",
    "var(--success)",
    "var(--warning)",
    "var(--danger)",
    "#64748b",
  ],
  uncertainty: "var(--data-band)",
} as const;
