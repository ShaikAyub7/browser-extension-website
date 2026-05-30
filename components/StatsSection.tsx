"use client";
import { useEffect, useRef, useState } from "react";

const STATS = [
  { value: 80, suffix: "+", label: "Active users", icon: "👥", color: "#8B5CF6" },
  { value: 4.9, suffix: "★", label: "Edge store rating", icon: "⭐", color: "#FBBF24" },
  { value: 100, suffix: "+", label: "Hours tracked daily", icon: "⏱️", color: "#22D3EE" },
  { value: 100, suffix: "%", label: "Private — no server", icon: "🔒", color: "#A3E635" },
];

function useCountUp(target: number, decimals = 0, active: boolean) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!active) return;
    let start: number | null = null;
    const duration = 1800;
    const step = (ts: number) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      setVal(parseFloat((ease * target).toFixed(decimals)));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [active, target, decimals]);
  return val;
}

function CountStat({ stat, active }: { stat: typeof STATS[0]; active: boolean }) {
  const isDecimal = !Number.isInteger(stat.value);
  const val = useCountUp(stat.value, isDecimal ? 1 : 0, active);
  return (
    <div className="feature-card glass rounded-2xl p-8 text-center relative overflow-hidden">
      <div className="absolute inset-0 opacity-5 flex items-center justify-center">
        <span className="text-8xl">{stat.icon}</span>
      </div>
      <div className="relative z-10">
        <div
          className="text-5xl font-display font-extrabold mb-2"
          style={{ color: stat.color, textShadow: `0 0 30px ${stat.color}60` }}
        >
          {isDecimal ? val.toFixed(1) : val.toLocaleString()}{stat.suffix}
        </div>
        <p className="text-slate-400 text-sm font-medium">{stat.label}</p>
      </div>
    </div>
  );
}

// Heatmap mock
const HEAT_LEVELS = [0, 1, 2, 3, 4, 3, 2, 4, 1, 0, 3, 4, 2, 1, 3, 4, 0, 2, 3, 1, 4, 2, 3, 0, 1, 3, 4, 2, 1, 0, 3, 2, 4, 1, 3];
const HEAT_COLORS = ["#1E1E3F", "#3B1FA3", "#5B21D4", "#7C3AED", "#A78BFA"];

export default function StatsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
            setStarted(true);
          }
        });
      },
      { threshold: 0.2 }
    );
    ref.current?.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="stats" ref={ref} className="relative py-28 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 reveal">
          <span className="inline-block font-mono text-xs text-lime-400 tracking-widest uppercase mb-4 bg-lime-500/10 px-4 py-1.5 rounded-full border border-lime-500/20">
            By the numbers
          </span>
          <h2 className="font-display font-extrabold text-4xl md:text-5xl text-white">
            Trusted by thousands who
            <br />
            <span className="gradient-text-warm">reclaimed their time.</span>
          </h2>
        </div>

        {/* Stat cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-16 reveal reveal-delay-1">
          {STATS.map((s, i) => (
            <CountStat key={s.label} stat={s} active={started} />
          ))}
        </div>

        {/* Heatmap demo */}
        <div className="glass rounded-3xl p-8 reveal reveal-delay-2">
          <div className="flex items-center justify-between mb-5">
            <div>
              <p className="font-display font-semibold text-white text-lg">Activity heatmap</p>
              <p className="text-slate-500 text-sm mt-0.5">Last 35 days of browsing intensity</p>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <span>Less</span>
              {HEAT_COLORS.map((c, i) => (
                <div key={i} className="w-3 h-3 rounded-sm" style={{ background: c }} />
              ))}
              <span>More</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {HEAT_LEVELS.map((level, i) => (
              <div
                key={i}
                className="heatmap-cell w-7 h-7 rounded-md cursor-pointer"
                style={{
                  background: HEAT_COLORS[level],
                  boxShadow: level >= 3 ? `0 0 8px ${HEAT_COLORS[level]}80` : "none",
                  transition: `all 0.15s ease ${i * 20}ms`,
                  opacity: started ? 1 : 0,
                  transform: started ? "scale(1)" : "scale(0.5)",
                }}
                title={`Day ${i + 1}: ${["None","Low","Medium","High","Very High"][level]} activity`}
              />
            ))}
          </div>
        </div>

        {/* Productivity breakdown mock */}
        <div className="glass rounded-3xl p-8 mt-5 reveal reveal-delay-3">
          <p className="font-display font-semibold text-white text-lg mb-5">Productivity breakdown</p>
          <div className="flex items-center gap-6">
            <div className="text-center">
              <p className="font-display font-extrabold text-4xl gradient-text">72</p>
              <p className="text-xs text-slate-500 mt-1">Productivity score</p>
            </div>
            <div className="flex-1 space-y-3">
              {[
                { label: "Productive", pct: 48, color: "#A3E635" },
                { label: "Neutral", pct: 24, color: "#22D3EE" },
                { label: "Distracting", pct: 28, color: "#F87171" },
              ].map((b) => (
                <div key={b.label}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-400">{b.label}</span>
                    <span className="font-mono text-slate-500">{b.pct}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-ink-700 overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-1000"
                      style={{
                        width: started ? `${b.pct}%` : "0%",
                        background: b.color,
                        boxShadow: `0 0 8px ${b.color}60`,
                        transitionDelay: "0.3s",
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
