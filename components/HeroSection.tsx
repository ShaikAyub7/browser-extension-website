"use client";
import { useEffect, useRef, useState } from "react";

const SITES = [
  { name: "youtube.com", time: "2h 14m", color: "#FF4444", pct: 78 },
  { name: "twitter.com", time: "1h 03m", color: "#1DA1F2", pct: 52 },
  { name: "github.com", time: "47m", color: "#A3E635", pct: 35 },
  { name: "reddit.com", time: "38m", color: "#FF6314", pct: 28 },
  { name: "figma.com", time: "22m", color: "#A78BFA", pct: 16 },
];

function MockPopup() {
  const [activeBar, setActiveBar] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setActiveBar((p) => (p + 1) % SITES.length), 1800);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="glass rounded-2xl p-4 w-[340px] shadow-2xl glow-violet select-none">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded bg-violet-600 flex items-center justify-center">
            <svg viewBox="0 0 20 20" fill="white" className="w-3 h-3">
              <path d="M10 2a8 8 0 100 16A8 8 0 0010 2zm.5 5H9v4l3.5 2.1.75-1.23L10.5 10.5V7z"/>
            </svg>
          </div>
          <span className="font-display font-semibold text-white text-sm">Tab Time Tracker</span>
        </div>
        <div className="flex gap-1.5">
          {["Summary","Analytics","Focus"].map((t, i) => (
            <span key={t} className={`text-[9px] px-2 py-0.5 rounded-full font-medium transition-all ${i===0 ? "bg-violet-600 text-white" : "text-slate-500 bg-ink-700"}`}>
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* Total time */}
      <div className="mb-4 flex items-center justify-between">
        <div>
          <p className="text-slate-500 text-[10px] uppercase tracking-widest font-mono">Today</p>
          <p className="text-white font-display font-bold text-2xl mt-0.5 text-glow-violet">4h 38m</p>
        </div>
        {/* Circle progress */}
        <svg viewBox="0 0 36 36" className="w-14 h-14">
          <path className="stroke-[#1E1E3F]" fill="none" strokeWidth="3"
            d="M18 2.0845 a15.9155 15.9155 0 0 1 0 31.831 a15.9155 15.9155 0 0 1 0 -31.831"/>
          <path fill="none" strokeWidth="3" stroke="#8B5CF6"
            strokeDasharray="58,100" strokeLinecap="round"
            d="M18 2.0845 a15.9155 15.9155 0 0 1 0 31.831 a15.9155 15.9155 0 0 1 0 -31.831"
            style={{filter:"drop-shadow(0 0 4px rgba(139,92,246,0.7))"}}
          />
          <text x="18" y="20.5" textAnchor="middle" className="fill-white font-mono text-[8px] font-bold">58%</text>
        </svg>
      </div>

      {/* Site bars */}
      <div className="space-y-2">
        {SITES.map((s, i) => (
          <div key={s.name} className={`transition-all duration-300 ${i === activeBar ? "opacity-100" : "opacity-70"}`}>
            <div className="flex items-center justify-between mb-0.5">
              <span className="text-[11px] text-slate-300 font-medium">{s.name}</span>
              <span className="text-[11px] text-slate-400 font-mono">{s.time}</span>
            </div>
            <div className="h-1.5 rounded-full bg-ink-700 overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-700"
                style={{
                  width: i === activeBar ? `${s.pct}%` : `${s.pct * 0.9}%`,
                  background: s.color,
                  boxShadow: i === activeBar ? `0 0 8px ${s.color}80` : "none",
                }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="mt-3 pt-3 border-t border-violet-900/40 flex items-center justify-between">
        <span className="text-[9px] text-slate-600 font-mono">5 domains tracked</span>
        <div className="flex items-center gap-1">
          <span className="text-[9px] text-orange-400">🔥</span>
          <span className="text-[9px] text-orange-400 font-semibold">7 day streak</span>
        </div>
      </div>
    </div>
  );
}

function FloatingBadge({ children, className }: { children: React.ReactNode; className: string }) {
  return (
    <div className={`glass-light rounded-xl px-3 py-2 text-xs font-medium text-slate-300 shadow-xl animate-float-slow ${className}`}>
      {children}
    </div>
  );
}

export default function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    const onMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      const x = (clientX / innerWidth - 0.5) * 20;
      const y = (clientY / innerHeight - 0.5) * 20;
      el.style.setProperty("--mx", `${x}px`);
      el.style.setProperty("--my", `${y}px`);
    };
    window.addEventListener("mousemove", onMouseMove);
    return () => window.removeEventListener("mousemove", onMouseMove);
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
    >
      {/* Background layers */}
      <div className="absolute inset-0 bg-grid-pattern bg-[size:40px_40px] opacity-100" />
      <div className="absolute inset-0 bg-radial-violet" />
      <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse-glow" />
      <div className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-violet-600/10 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: "1.5s" }} />

      {/* Orbit rings (decorative) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] orbit-ring opacity-30" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] orbit-ring-rev opacity-20" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
        {/* Left: Copy */}
        <div>
          <div className="inline-flex items-center gap-2 glass-light rounded-full px-4 py-1.5 mb-6 text-xs font-mono text-violet-300 border border-violet-500/30">
            <span className="w-1.5 h-1.5 rounded-full bg-lime-400 animate-pulse" />
            v3.4.6 — Free Chrome Extension
          </div>

          <h1 className="font-display font-extrabold text-5xl lg:text-6xl xl:text-7xl leading-[1.05] tracking-tight text-white mb-6">
            Know where
            <br />
            <span className="gradient-text">your time</span>
            <br />
            really goes.
          </h1>

          <p className="text-slate-400 text-lg leading-relaxed mb-8 max-w-md">
            Tab Time Tracker watches every browser tab so you don't have to. Real-time stats, daily limits, AI insights, and Pomodoro focus — all in one popup.
          </p>

          <div className="flex flex-wrap gap-3 mb-10">
            <a
              href="#install"
              className="btn-primary px-7 py-3.5 rounded-2xl text-white font-display font-semibold text-base flex items-center gap-2.5"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"/>
              </svg>
              Add to Chrome — Free
            </a>
            <a
              href="#features"
              className="btn-secondary px-7 py-3.5 rounded-2xl text-white font-display font-semibold text-base"
            >
              See features →
            </a>
          </div>

          <div className="flex flex-wrap gap-5">
            {[
              { n: "50k+", label: "Active users" },
              { n: "4.9★", label: "Chrome store" },
              { n: "100%", label: "Free forever" },
            ].map((s) => (
              <div key={s.label}>
                <p className="font-display font-bold text-xl text-white">{s.n}</p>
                <p className="text-xs text-slate-500 mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Mock UI + floating badges */}
        <div className="relative flex justify-center">
          {/* Glow behind popup */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-72 h-72 bg-violet-600/20 rounded-full blur-3xl" />
          </div>

          {/* Floating badges */}
          <FloatingBadge className="absolute -top-6 -left-4 animate-float-slow">
            🔥 7 day streak!
          </FloatingBadge>
          <FloatingBadge className="absolute -bottom-4 -left-8 animate-float-fast" style={{ animationDelay: "1s" } as React.CSSProperties}>
            ✅ Daily limit set: 6h
          </FloatingBadge>
          <FloatingBadge className="absolute top-8 -right-6 animate-float-slow" style={{ animationDelay: "0.5s" } as React.CSSProperties}>
            🤖 AI insights ready
          </FloatingBadge>
          <FloatingBadge className="absolute bottom-12 -right-4 animate-float-fast" style={{ animationDelay: "2s" } as React.CSSProperties}>
            🍅 Focus: 23:00 left
          </FloatingBadge>

          {/* Popup */}
          <div className="relative animate-float-slow">
            <MockPopup />
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
        <span className="text-xs text-slate-500 font-mono tracking-widest uppercase">Scroll</span>
        <div className="w-0.5 h-8 bg-gradient-to-b from-violet-500 to-transparent animate-pulse" />
      </div>
    </section>
  );
}
