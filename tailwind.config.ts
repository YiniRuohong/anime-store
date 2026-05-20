import type { Config } from "tailwindcss"
import forms from "@tailwindcss/forms"

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        sakura: {
          50: "#fff5f8",
          100: "#ffe7ef",
          200: "#ffcfe1",
          300: "#fda4c8",
          400: "#fb6ea6",
          500: "#ec4899",
          600: "#d61f78",
        },
        ink: {
          900: "#182033",
          700: "#334155",
          500: "#64748b",
        },
        aqua: {
          100: "#dff8f6",
          400: "#43c6bc",
          600: "#168b86",
        },
        yuzu: {
          100: "#fff3cd",
          400: "#f8c84b",
          600: "#c68910",
        },
      },
      boxShadow: {
        soft: "0 18px 60px rgba(236, 72, 153, 0.12)",
        panel: "0 12px 40px rgba(15, 23, 42, 0.08)",
      },
      borderRadius: {
        "card": "8px",
      },
    },
  },
  plugins: [forms],
}

export default config
