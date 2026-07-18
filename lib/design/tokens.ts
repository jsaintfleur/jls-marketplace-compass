export const appAccents = {
  shelter: {
    50: "#f0fdfa",
    100: "#ccfbf1",
    200: "#99f6e4",
    300: "#5eead4",
    400: "#2dd4bf",
    500: "#14b8a6",
    600: "#0d9488",
    700: "#0f766e",
    800: "#115e59",
    900: "#134e4a",
  },
  care: {
    50: "#ecfdf5",
    100: "#d1fae5",
    200: "#a7f3d0",
    300: "#6ee7b7",
    400: "#34d399",
    500: "#10b981",
    600: "#059669",
    700: "#047857",
    800: "#065f46",
    900: "#064e3b",
  },
  pulse: {
    50: "#fffbeb",
    100: "#fef3c7",
    200: "#fde68a",
    300: "#fcd34d",
    400: "#fbbf24",
    500: "#f59e0b",
    600: "#d97706",
    700: "#b45309",
    800: "#92400e",
    900: "#78350f",
  },
  transit: {
    50: "#f0f9ff",
    100: "#e0f2fe",
    200: "#bae6fd",
    300: "#7dd3fc",
    400: "#38bdf8",
    500: "#0ea5e9",
    600: "#0284c7",
    700: "#0369a1",
    800: "#075985",
    900: "#0c4a6e",
  },
  market: {
    50: "#eef2ff",
    100: "#e0e7ff",
    200: "#c7d2fe",
    300: "#a5b4fc",
    400: "#818cf8",
    500: "#6366f1",
    600: "#4f46e5",
    700: "#4338ca",
    800: "#3730a3",
    900: "#312e81",
  },
} as const;

export const neutral = {
  0: "#ffffff",
  25: "#fcfcfd",
  50: "#f8fafc",
  100: "#f1f5f9",
  200: "#e2e8f0",
  300: "#cbd5e1",
  400: "#94a3b8",
  500: "#64748b",
  600: "#475569",
  700: "#334155",
  800: "#1e293b",
  900: "#0f172a",
  950: "#020617",
} as const;

export const semantic = {
  success: "#059669",
  warning: "#d97706",
  danger: "#dc2626",
  info: "#0284c7",
} as const;

export const typeScale = {
  display: ["3.75rem", "1", "700"],
  h1: ["2.75rem", "1.08", "700"],
  h2: ["2rem", "1.16", "650"],
  h3: ["1.5rem", "1.24", "650"],
  h4: ["1.125rem", "1.35", "650"],
  body: ["1rem", "1.65", "400"],
  caption: ["0.8125rem", "1.45", "500"],
  data: ["1.875rem", "1.08", "650"],
} as const;

export const spacing = {
  1: "0.25rem",
  2: "0.5rem",
  3: "0.75rem",
  4: "1rem",
  5: "1.25rem",
  6: "1.5rem",
  8: "2rem",
  10: "2.5rem",
  12: "3rem",
  16: "4rem",
} as const;

export const radii = {
  sm: "0.375rem",
  md: "0.5rem",
  lg: "0.75rem",
  xl: "1rem",
  full: "999px",
} as const;

export const elevation = {
  1: "0 1px 2px rgba(15, 23, 42, 0.05)",
  2: "0 8px 24px rgba(15, 23, 42, 0.08)",
  3: "0 18px 44px rgba(15, 23, 42, 0.12)",
} as const;

export const motion = {
  fast: "150ms cubic-bezier(0.16, 1, 0.3, 1)",
  base: "200ms cubic-bezier(0.16, 1, 0.3, 1)",
  slow: "250ms cubic-bezier(0.16, 1, 0.3, 1)",
} as const;
