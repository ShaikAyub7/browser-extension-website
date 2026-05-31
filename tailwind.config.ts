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
        snow:   { 50:"#F8F8FC", 100:"#F1F0F7", 200:"#E4E2F0", 300:"#CCC8E0" },
        ink:    { 400:"#9B95B8", 500:"#6B6488", 700:"#3A3555", 900:"#1A1730" },
        violet: { 50:"#F4F0FF", 100:"#EAE0FF", 200:"#D3C0FF", 400:"#9B6EFF", 500:"#7C3AED", 600:"#6025C9" },
        indigo: { 400:"#6366F1" },
      },
      backgroundImage: {
        "dot-grid": "radial-gradient(circle, #D3C0FF 1px, transparent 1px)",
        "radial-violet": "radial-gradient(ellipse 70% 55% at 50% 0%, rgba(124,58,237,0.09) 0%, transparent 70%)",
        "radial-indigo": "radial-gradient(ellipse 60% 50% at 85% 50%, rgba(99,102,241,0.07) 0%, transparent 65%)",
      },
    },
  },
  plugins: [],
};
export default config;
