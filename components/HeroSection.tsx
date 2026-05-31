"use client";
import { SITES } from "@/data";
import Image from "next/image";
import { useEffect, useState } from "react";



function MockPopup() {
  const [activeBar, setActiveBar] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setActiveBar((p) => (p + 1) % SITES.length), 1800);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="bg-white rounded-2xl p-5 w-[320px] shadow-[0_20px_60px_rgba(60,40,120,0.18)] border border-snow-200 select-none">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg flex items-center justify-center">
           <Image src="/image.png" alt="TabTime Logo" width={16} height={16} />
          </div>
          <span className="font-display font-bold text-ink-900 text-sm">Tab Time Tracker</span>
        </div>
        <div className="flex gap-1">
          {["Summary","Analytics","Focus"].map((t,i) => (
            <span key={t} className={`text-[9px] px-2 py-0.5 rounded-full font-semibold transition-all ${
              i===0 ? "bg-violet-500 text-white" : "text-ink-400 bg-snow-100"
            }`}>{t}</span>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-[10px] font-mono text-ink-400 uppercase tracking-widest">Today</p>
          <p className="text-ink-900 font-display font-extrabold text-3xl mt-0.5">4h 38m</p>
        </div>
        <svg viewBox="0 0 36 36" className="w-16 h-16">
          <path fill="none" stroke="#E4E2F0" strokeWidth="3"
            d="M18 2.0845 a15.9155 15.9155 0 0 1 0 31.831 a15.9155 15.9155 0 0 1 0 -31.831"/>
          <path fill="none" stroke="#7C3AED" strokeWidth="3" strokeLinecap="round"
            strokeDasharray="58,100"
            d="M18 2.0845 a15.9155 15.9155 0 0 1 0 31.831 a15.9155 15.9155 0 0 1 0 -31.831"
            style={{filter:"drop-shadow(0 0 3px rgba(124,58,237,0.5))"}}/>
          <text x="18" y="20.5" textAnchor="middle" fill="#3A3555" style={{fontSize:"8px",fontWeight:"700",fontFamily:"monospace"}}>58%</text>
        </svg>
      </div>

      <div className="space-y-2.5">
        {SITES.map((s, i) => (
          <div key={s.name} className={`transition-all duration-300 ${i===activeBar?"opacity-100":"opacity-60"}`}>
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full" style={{background:s.color}}/>
                <span className="text-[11px] font-medium text-ink-700">{s.name}</span>
              </div>
              <span className="text-[11px] font-mono text-ink-400">{s.time}</span>
            </div>
            <div className="h-1.5 rounded-full bg-snow-200 overflow-hidden">
              <div className="h-full rounded-full transition-all duration-700"
                style={{width:`${s.pct}%`,background:s.color,opacity:i===activeBar?1:0.5}}/>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 pt-3 border-t border-snow-200 flex items-center justify-between">
        <span className="text-[9px] font-mono text-ink-400">5 domains tracked</span>
        <div className="flex items-center gap-1">
          <span className="text-[9px]">🔥</span>
          <span className="text-[9px] font-bold text-orange-500">7 day streak</span>
        </div>
      </div>
    </div>
  );
}

function FloatingBadge({ children, className }: { children: React.ReactNode; className: string }) {
  return (
    <div className={`bg-white rounded-xl px-3 py-2 text-xs font-semibold text-ink-700 shadow-card border border-snow-200 ${className}`}>
      {children}
    </div>
  );
}

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      <div className="absolute inset-0 bg-radial-violet pointer-events-none" />
      <div className="absolute inset-0 dot-grid bg-dot-grid bg-[size:28px_28px] opacity-60 pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-violet-100 rounded-full blur-3xl opacity-60 animate-pulse-glow pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/3 w-56 h-56 bg-indigo-100 rounded-full blur-3xl opacity-50 animate-pulse-glow pointer-events-none" style={{animationDelay:"1.5s"}}/>

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[680px] h-[680px] orbit-ring pointer-events-none"/>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[880px] h-[880px] orbit-ring-rev pointer-events-none"/>

<div className="relative z-10 lg:min-w-[1340px] md:max-w-7xl  mx-auto x-6 lg:px-12 grid lg:grid-cols-2 items-center gap-16 xl:gap-24">
          <div>
          <div className="pill mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"/>
            v3.4.6 — Free Edge Extension
          </div>

          <h1 className="font-display font-extrabold text-5xl lg:text-6xl xl:text-[68px] leading-[1.04] tracking-tight text-ink-900 mb-6">
            Know where<br/>
            <span className="font-serif italic gradient-text">your time </span> <br/>
            really goes.
          </h1>

          <p className="text-ink-500 text-lg leading-relaxed mb-8 max-w-md">
            Tab Time Tracker watches every browser tab so you don't have to. Real-time stats, daily limits, AI insights, and Pomodoro focus — all in one popup.
          </p>

          <div className="flex flex-wrap gap-3 mb-10">
            <a href="#install"
              className="btn-primary px-7 py-3.5 rounded-2xl font-display font-bold text-base flex items-center gap-2.5">
          
              Add to Edge — Free
            </a>
            <a href="#features"
              className="btn-secondary px-7 py-3.5 rounded-2xl font-display font-bold text-base">
              See features →
            </a>
          </div>

          <div className="flex flex-wrap gap-6">
            {[
              { n: "80+", label: "Active users" },
              { n: "4.7★", label: "Edge Add-ons rating" },
              { n: "100%", label: "Free forever" },
            ].map((s) => (
              <div key={s.label}>
                <p className="font-display font-extrabold text-xl text-ink-900">{s.n}</p>
                <p className="text-xs text-ink-400 mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative flex justify-center">
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-64 h-64 bg-violet-200 rounded-full blur-3xl opacity-30"/>
          </div>

          <FloatingBadge className="absolute -top-5 -left-2 animate-float-slow z-10">7 day streak!</FloatingBadge>
          <FloatingBadge className="absolute -bottom-3 -left-6 animate-float-fast z-10" >Daily limit: 6h</FloatingBadge>
          <FloatingBadge className="absolute top-6 -right-4 animate-float-slow z-10" > AI insights ready</FloatingBadge>
          <FloatingBadge className="absolute bottom-10 -right-2 animate-float-fast z-10">Focus: 23:00 left</FloatingBadge>

          <div className="relative animate-float-slow">
            <MockPopup />
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
        <span className="text-xs font-mono text-ink-400 tracking-widest uppercase">Scroll</span>
        <div className="w-0.5 h-8 bg-gradient-to-b from-violet-400 to-transparent animate-pulse"/>
      </div>
    </section>
  );
}
