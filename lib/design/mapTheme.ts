export const mapTheme = {
  light: {
    background: "#eef2f4",
    land: "#f8fafc",
    boundary: "#cbd5e1",
    label: "#334155",
    water: "#dbeafe",
  },
  dark: {
    background: "#07111f",
    land: "#0f172a",
    boundary: "#334155",
    label: "#cbd5e1",
    water: "#082f49",
  },
  choroplethStops: [
    [20, "var(--accent-100)"],
    [40, "var(--accent-300)"],
    [60, "var(--accent-500)"],
    [80, "var(--accent-700)"],
    [100, "var(--accent-900)"],
  ],
} as const;
