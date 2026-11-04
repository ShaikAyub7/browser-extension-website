import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["'Plus Jakarta Sans'", "sans-serif"],
        serif:   ["'Instrument Serif'", "serif"],
        body:    ["'Plus Jakarta Sans'", "sans-serif"],
        mono:    ["'Geist Mono'", "monospace"],
      },
        maxWidth: {
      '8xl': '90rem', // 1440px
    },
      colors: {
        snow:   { 50:"#FAF8F7", 100:"#F3F0EE", 200:"#E8E3E0", 300:"#CFC8C4" },
        ink:    { 400:"#A09A96", 500:"#6B6460", 700:"#2E2A2A", 900:"#0F0D0D" },
        violet: { 50:"#FFF3F3", 100:"#FDE3E4", 200:"#F8C4C8", 400:"#F0525E", 500:"#E11D2E", 600:"#B91222" },
        indigo: { 400:"#FF5A64" },
      },
      backgroundImage: {
        "dot-grid": "radial-gradient(circle, #F8C4C8 1px, transparent 1px)",
        "radial-violet": "radial-gradient(ellipse 70% 55% at 50% 0%, rgba(225,29,46,0.09) 0%, transparent 70%)",
        "radial-indigo": "radial-gradient(ellipse 60% 50% at 85% 50%, rgba(255,90,100,0.07) 0%, transparent 65%)",
      },
    },
  },
  plugins: [],
};
export default config;
