export const appAccents = {
  shelter: {
    50: "#ecfdf3",
    100: "#d0f8de",
    200: "#a8efbf",
    300: "#6fe39b",
    400: "#39ca6c",
    500: "#16a34a",
    600: "#0b7a3b",
    700: "#095e2e",
    800: "#074a25",
    900: "#05331a",
  },
  care: {
    50: "#ecfdf3",
    100: "#d0f8de",
    200: "#a8efbf",
    300: "#6fe39b",
    400: "#39ca6c",
    500: "#16a34a",
    600: "#0b7a3b",
    700: "#095e2e",
    800: "#074a25",
    900: "#05331a",
  },
  pulse: {
    50: "#eef2fc",
    100: "#d6e0f7",
    200: "#b8c7ef",
    300: "#7f9ae0",
    400: "#4e6fce",
    500: "#2a49b8",
    600: "#142d8c",
    700: "#102270",
    800: "#0d1b59",
    900: "#0a1642",
  },
  transit: {
    50: "#eef2fc",
    100: "#d6e0f7",
    200: "#b8c7ef",
    300: "#7f9ae0",
    400: "#4e6fce",
    500: "#2a49b8",
    600: "#142d8c",
    700: "#102270",
    800: "#0d1b59",
    900: "#0a1642",
  },
  market: {
    50: "#eef2fc",
    100: "#d6e0f7",
    200: "#b8c7ef",
    300: "#7f9ae0",
    400: "#4e6fce",
    500: "#2a49b8",
    600: "#142d8c",
    700: "#102270",
    800: "#0d1b59",
    900: "#0a1642",
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
  danger: "#c81e29",
  info: "#0284c7",
} as const;

export const flagPalettes = {
  haiti: {
    blue: appAccents.pulse,
    white: "#ffffff",
    red: { 500: "#e0323d", 600: "#c81e29", 700: "#a3141d" },
  },
  panAfrican: {
    black: "#0a0a0a",
    red: { 500: "#e0323d", 600: "#c81e29", 700: "#a3141d" },
    green: appAccents.care,
  },
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
