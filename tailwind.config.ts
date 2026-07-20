import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "var(--accent-50)",
          100: "var(--accent-100)",
          200: "var(--accent-200)",
          300: "var(--accent-300)",
          400: "var(--accent-400)",
          500: "var(--accent-500)",
          600: "var(--accent-600)",
          700: "var(--accent-700)",
          800: "var(--accent-800)",
          900: "var(--accent-900)",
        },
        accent: {
          50: "var(--accent-50)",
          100: "var(--accent-100)",
          200: "var(--accent-200)",
          300: "var(--accent-300)",
          400: "var(--accent-400)",
          500: "var(--accent-500)",
          600: "var(--accent-600)",
          700: "var(--accent-700)",
          800: "var(--accent-800)",
          900: "var(--accent-900)",
        },
        ink: {
          DEFAULT: "var(--text-primary)",
          soft: "var(--text-secondary)",
          muted: "var(--text-tertiary)",
          faint: "var(--text-disabled)",
        },
        text: {
          primary: "var(--text-primary)",
          secondary: "var(--text-secondary)",
          tertiary: "var(--text-tertiary)",
          disabled: "var(--text-disabled)",
          inverse: "var(--text-inverse)",
        },
        canvas: "var(--bg-canvas)",
        panel: "var(--bg-panel)",
        surface: "var(--bg-surface)",
        inset: "var(--bg-inset)",
        border: {
          DEFAULT: "var(--border-default)",
          subtle: "var(--border-subtle)",
          strong: "var(--border-strong)",
        },
        success: "var(--success)",
        warning: "var(--warning)",
        danger: "var(--danger)",
        info: "var(--info)",
      },
      borderRadius: {
        sm: "var(--radius-sm)",
        md: "var(--radius-md)",
        lg: "var(--radius-lg)",
        xl: "var(--radius-xl)",
        "2xl": "var(--radius-2xl)",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "SFMono-Regular", "monospace"],
      },
      fontSize: {
        display: ["var(--text-display)", { lineHeight: "var(--leading-display)", fontWeight: "700" }],
        h1: ["var(--text-h1)", { lineHeight: "var(--leading-heading)", fontWeight: "700" }],
        h2: ["var(--text-h2)", { lineHeight: "var(--leading-heading)", fontWeight: "650" }],
        h3: ["var(--text-h3)", { lineHeight: "var(--leading-heading)", fontWeight: "650" }],
        h4: ["var(--text-h4)", { lineHeight: "var(--leading-heading)", fontWeight: "650" }],
        data: ["var(--text-data)", { lineHeight: "1", fontWeight: "650" }],
      },
      boxShadow: {
        1: "var(--shadow-1)",
        2: "var(--shadow-2)",
        3: "var(--shadow-3)",
        card: "var(--shadow-1)",
      },
      transitionDuration: {
        150: "150ms",
        200: "200ms",
        250: "250ms",
      },
      transitionTimingFunction: {
        out: "var(--ease-out)",
      },
    },
  },
  plugins: [],
};
export default config;
