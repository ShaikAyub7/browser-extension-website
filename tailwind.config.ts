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
        snow:   { 50:"#F8FBF9", 100:"#EEF4F1", 200:"#DCE7E1", 300:"#C2D2CA" },
        ink:    { 400:"#8FA89C", 500:"#587064", 700:"#24382F", 900:"#0B1F17" },
        violet: { 50:"#ECFDF5", 100:"#D1FAE5", 200:"#A7F3D0", 400:"#34D399", 500:"#10B981", 600:"#059669" },
        indigo: { 400:"#0EA5E9" },
      },
      backgroundImage: {
        "dot-grid": "radial-gradient(circle, #A7F3D0 1px, transparent 1px)",
        "radial-violet": "radial-gradient(ellipse 70% 55% at 50% 0%, rgba(16,185,129,0.09) 0%, transparent 70%)",
        "radial-indigo": "radial-gradient(ellipse 60% 50% at 85% 50%, rgba(14,165,233,0.07) 0%, transparent 65%)",
      },
    },
  },
  plugins: [],
};
export default config;
