import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "#E5DEFF",
          foreground: "#1A1F2C",
        },
        secondary: {
          DEFAULT: "#FEF7CD",
          foreground: "#1A1F2C",
        },
        accent: {
          DEFAULT: "#F2FCE2",
          foreground: "#1A1F2C",
        },
        success: {
          DEFAULT: "#86efac",
          foreground: "#1A1F2C",
        },
      },
      keyframes: {
        "bounce-scale": {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.05)" },
        },
        celebrate: {
          "0%": { transform: "scale(0.8) rotate(-10deg)" },
          "50%": { transform: "scale(1.2) rotate(10deg)" },
          "100%": { transform: "scale(1) rotate(0deg)" },
        },
      },
      animation: {
        "bounce-scale": "bounce-scale 0.6s ease-in-out",
        celebrate: "celebrate 0.6s ease-in-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;