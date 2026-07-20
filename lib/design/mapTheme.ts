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
    [20, "var(--data-sequential-1)"],
    [40, "var(--data-sequential-2)"],
    [60, "var(--data-sequential-3)"],
    [80, "var(--data-sequential-4)"],
    [100, "var(--data-sequential-5)"],
  ],
} as const;
