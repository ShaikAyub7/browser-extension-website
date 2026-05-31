"use client";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [dark, setDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const isDark = saved ? saved === "dark" : prefersDark;
    setDark(isDark);
    document.documentElement.classList.toggle("dark", isDark);
  }, []);

  const toggle = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
  };

  if (!mounted) return <div className="w-14 h-7" />;

  return (
    <button
      onClick={toggle}
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
      className="relative inline-flex items-center w-7 h-7 rounded-full border transition-all duration-300 mr-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500"
      style={{
        background: dark
          ? "linear-gradient(135deg,#6025C9,#7C3AED)"
          : "linear-gradient(135deg,#e2d9ff,#c4b5fd)",
        borderColor: dark ? "rgba(139,92,246,0.4)" : "#D3C0FF",
      }}
    >
      {/* Track icons */}
      <span className="absolute left-1.5 text-[10px] select-none pointer-events-none">
        {dark ? 
        <Moon className="w-4 h-4" /> 
        : 
        <Sun className="w-4 h-4" />}
        
      </span>
      
    </button>
  );
}
