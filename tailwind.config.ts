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
        midnight: {
          DEFAULT: "#0B1628",
          light: "#152545",
          mid: "#0F1D35",
        },
        accent: {
          DEFAULT: "#4DA3E8",
          bright: "#5CB8FF",
          soft: "#7EC8FF",
          dark: "#2B7CC4",
          pale: "#EBF5FF",
          ice: "#E8F4FD",
          glow: "rgba(77,163,232,0.12)",
        },
        surface: {
          DEFAULT: "#F8FAFC",
          alt: "#F1F5F9",
          white: "#FFFFFF",
        },
        charcoal: "#0F172A",
        ink: "#1E293B",
      },
      fontFamily: {
        display: ["'Playfair Display'", "Georgia", "serif"],
        heading: ["'Sora'", "sans-serif"],
        body: ["'DM Sans'", "sans-serif"],
        mono: ["'JetBrains Mono'", "monospace"],
      },
      animation: {
        "fade-up": "fadeUp 0.8s cubic-bezier(0.16,1,0.3,1) forwards",
        "slide-r": "slideR 0.9s cubic-bezier(0.16,1,0.3,1) forwards",
        float: "float 6s ease-in-out infinite",
        "float-delayed": "float 8s ease-in-out 2s infinite",
      },
      keyframes: {
        fadeUp: {
          from: { opacity: "0", transform: "translateY(28px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        slideR: {
          from: { opacity: "0", transform: "translateX(40px)" },
          to: { opacity: "1", transform: "translateX(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
