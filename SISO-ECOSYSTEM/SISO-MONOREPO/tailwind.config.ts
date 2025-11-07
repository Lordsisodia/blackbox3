import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    container: {
      center: true,
      padding: "1.5rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        display: ["Inter", "sans-serif"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(circle at bottom center, var(--tw-gradient-stops))",
      },
      colors: {
        siso: {
          black: "var(--siso-black)",
          orange: "rgb(var(--siso-orange-rgb) / <alpha-value>)",
          red: "rgb(var(--siso-red-rgb) / <alpha-value>)",
          "bg-primary": "var(--siso-bg-primary)",
          "bg-secondary": "var(--siso-bg-secondary)",
          "bg-tertiary": "var(--siso-bg-tertiary)",
          "bg-hover": "var(--siso-bg-hover)",
          "bg-active": "var(--siso-bg-active)",
          "text-primary": "var(--siso-text-primary)",
          "text-secondary": "var(--siso-text-secondary)",
          "text-muted": "var(--siso-text-muted)",
          "text-disabled": "var(--siso-text-disabled)",
          border: "var(--siso-border-primary)",
          "border-secondary": "var(--siso-border-secondary)",
          "border-hover": "var(--siso-border-hover)",
          "border-active": "var(--siso-border-active)",
          success: "var(--siso-success)",
          warning: "var(--siso-warning)",
          error: "var(--siso-error)",
          info: "var(--siso-info)",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      keyframes: {
        "drawer-in": {
          from: { transform: "translateX(-100%)" },
          to: { transform: "translateX(0)" },
        },
        "drawer-out": {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-100%)" },
        },
        "sheet-up": {
          from: { transform: "translateY(100%)" },
          to: { transform: "translateY(0)" },
        },
        "sheet-down": {
          from: { transform: "translateY(0)" },
          to: { transform: "translateY(100%)" },
        },
        glow: {
          "0%, 100%": { boxShadow: "var(--siso-glow-orange)" },
          "50%": { boxShadow: "var(--siso-glow-red)" },
        },
      },
      animation: {
        "drawer-in": "drawer-in 0.25s ease-out",
        "drawer-out": "drawer-out 0.25s ease-in",
        "sheet-up": "sheet-up 0.25s ease-out",
        "sheet-down": "sheet-down 0.25s ease-in",
        glow: "glow 3s ease-in-out infinite",
        "spin-slow": "spin 4s linear infinite",
      },
      boxShadow: {
        siso: "var(--siso-shadow-md)",
      },
    },
  },
  plugins: [],
};

export default config;
