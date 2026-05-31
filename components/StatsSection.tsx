"use client";
import { STATS } from "@/data";
import { useEffect, useRef, useState } from "react";


const HEAT_LEVELS = [0,1,2,3,4,3,2,4,1,0,3,4,2,1,3,4,0,2,3,1,4,2,3,0,1,3,4,2,1,0,3,2,4,1,3];
const HEAT_COLORS = ["#E4E2F0","#D3C0FF","#B39DFF","#9B6EFF","#7C3AED"];

function useCountUp(target: number, decimals = 0, active: boolean) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!active) return;
    let start: number | null = null;
    const duration = 1800;
    const step = (ts: number) => {
      if (!start) start = ts;
      const p = Math.min((ts-start)/duration,1);
      const ease = 1-Math.pow(1-p,3);
      setVal(parseFloat((ease*target).toFixed(decimals)));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [active,target,decimals]);
  return val;
}

function CountCard({ stat, active }: { stat: typeof STATS[0]; active: boolean }) {
  const isDecimal = !Number.isInteger(stat.value);
  const val = useCountUp(stat.value, isDecimal?1:0, active);
    const Icon = stat.icon;

  return (
    <div className="feature-card p-8 text-center">
      <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl mx-auto mb-4" style={{background:stat.bg}}>
<Icon
          className="w-6 h-6"
          style={{ color: stat.color }}
        />      </div>
      <p className="font-display font-extrabold text-4xl mb-1" style={{color:stat.color}}>
        {isDecimal ? val.toFixed(1) : val.toLocaleString()}{stat.suffix}
      </p>
      <p className="text-ink-500 text-sm">{stat.label}</p>
    </div>
  );
}

export default function StatsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add("visible"); setStarted(true); }
      }),
      { threshold: 0.2 }
    );
    ref.current?.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="stats" ref={ref} className="relative py-28 px-6 section-tint">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16 reveal">
          <div className="pill mx-auto mb-5"> By the numbers</div>
          <h2 className="font-display font-extrabold text-4xl md:text-5xl leading-tight">
            Trusted by thousands who<br/>
            <span className="font-serif italic gradient-text-warm">reclaimed their time.</span>
          </h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10 reveal reveal-delay-1">
          {STATS.map((s) => <CountCard key={s.label} stat={s} active={started}/>)}
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-card border border-snow-200 mb-4 reveal reveal-delay-2">
          <div className="flex items-center justify-between mb-5">
            <div>
              <p className="font-display font-bold text-ink-900 text-lg">Activity heatmap</p>
              <p className="text-ink-400 text-sm mt-0.5">Last 35 days of browsing intensity</p>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-ink-400">
              <span>Less</span>
              {HEAT_COLORS.map((c,i) => <div key={i} className="w-3 h-3 rounded-sm" style={{background:c}}/>)}
              <span>More</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {HEAT_LEVELS.map((level, i) => (
              <div key={i} className="heatmap-cell w-7 h-7 rounded-md cursor-pointer border border-snow-200"
                style={{
                  background: HEAT_COLORS[level],
                  transition: `all 0.15s ease ${i*20}ms`,
                  opacity: started ? 1 : 0,
                  transform: started ? "scale(1)" : "scale(0.5)",
                }}
                title={`Day ${i+1}: ${["None","Low","Medium","High","Very High"][level]} activity`}/>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-card border border-snow-200 reveal reveal-delay-3">
          <p className="font-display font-bold text-ink-900 text-lg mb-5">Productivity breakdown</p>
          <div className="flex items-center gap-8">
            <div className="text-center">
              <p className="font-display font-extrabold text-5xl gradient-text">72</p>
              <p className="text-xs text-ink-400 mt-1">Score</p>
            </div>
            <div className="flex-1 space-y-3">
              {[
                { label:"Productive",  pct:48, color:"#10B981" },
                { label:"Neutral",     pct:24, color:"#6366F1" },
                { label:"Distracting", pct:28, color:"#EF4444" },
              ].map((b) => (
                <div key={b.label}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-ink-500 font-medium">{b.label}</span>
                    <span className="font-mono text-ink-400">{b.pct}%</span>
                  </div>
                  <div className="h-2.5 rounded-full bg-snow-200 overflow-hidden">
                    <div className="h-full rounded-full transition-all duration-1000"
                      style={{width:started?`${b.pct}%`:"0%",background:b.color,transitionDelay:"0.3s"}}/>
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
