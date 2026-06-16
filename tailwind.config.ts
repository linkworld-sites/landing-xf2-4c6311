import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: "#0A0B0D",
        surface: "#111318",
        "surface-2": "#16191F",
        accent: "#00D4FF",
        gold: "#C8A96E",
        "text-primary": "#F0F2F5",
        "text-secondary": "#6B7280",
        border: "#1E2028",
      },
      fontFamily: {
        display: ["var(--font-rajdhani)", "sans-serif"],
        body: ["var(--font-inter)", "sans-serif"],
        mono: ["'Roboto Mono'", "monospace"],
      },
      animation: {
        "pulse-cyan": "pulse-cyan 1.8s ease-in-out infinite",
        "float": "float 4s ease-in-out infinite",
        "lock-click": "lock-click 0.3s cubic-bezier(0.22, 1, 0.36, 1) forwards",
      },
      keyframes: {
        "pulse-cyan": {
          "0%, 100%": { boxShadow: "0 0 0px 0px #00D4FF00", opacity: "0" },
          "50%": { boxShadow: "0 0 0px 12px #00D4FF1A", opacity: "0.6" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
        "lock-click": {
          "0%": { transform: "scale(1.05)", opacity: "0.8" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
      },
      transitionTimingFunction: {
        expo: "cubic-bezier(0.16, 1, 0.3, 1)",
        "expo-out": "cubic-bezier(0.22, 1, 0.36, 1)",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};

export default config;
