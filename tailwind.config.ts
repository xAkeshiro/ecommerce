import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        page: "var(--bg-primary)",
        card: "var(--bg-card)",
        elevated: "var(--bg-elevated)",
        inset: "var(--bg-inset)",
        line: "var(--border-primary)",
        "line-subtle": "var(--border-subtle)",
        "line-hover": "var(--border-hover)",
        ink: "var(--text-primary)",
        "ink-2": "var(--text-secondary)",
        "ink-3": "var(--text-tertiary)",
        "ink-muted": "var(--text-muted)",
        "ink-faint": "var(--text-faint)",
        "btn-bg": "var(--btn-bg)",
        "btn-text": "var(--btn-text)",
        "btn-hover": "var(--btn-hover)",
        badge: "var(--badge-bg)",
        "badge-border": "var(--badge-border)",
        "badge-text": "var(--badge-text)",
      },
      fontFamily: {
        mono: ["'Space Mono'", "monospace"],
        sans: ["'DM Sans'", "'Helvetica Neue'", "sans-serif"],
      },
      keyframes: {
        fadeUp: {
          from: { opacity: "0", transform: "translateY(20px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        slideIn: {
          from: { opacity: "0", transform: "translateX(40px)" },
          to: { opacity: "1", transform: "translateX(0)" },
        },
      },
      animation: {
        "fade-up": "fadeUp 0.6s ease both",
        "fade-in": "fadeIn 0.5s ease both",
        "slide-in": "slideIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) both",
      },
    },
  },
  plugins: [],
};

export default config;
