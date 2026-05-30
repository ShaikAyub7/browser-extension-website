"use client";
import { useEffect, useRef, useState } from "react";

const STEPS = [
  {
    num: "01",
    title: "Install in one click",
    desc: "Add Tab Time Tracker from the Chrome Web Store. No sign-up, no account, no permissions beyond what's listed.",
    icon: "🧩",
    detail: "Requires: storage, activeTab, tabs, notifications, alarms",
    color: "#8B5CF6",
  },
  {
    num: "02",
    title: "Browse normally",
    desc: "The background service worker silently tracks every active tab. Nothing changes about your browsing experience.",
    icon: "🌐",
    detail: "Tracking starts automatically. Gaps > 1 min are ignored.",
    color: "#22D3EE",
  },
  {
    num: "03",
    title: "Open the popup",
    desc: "Click the extension icon. See today's time per site, charts, heatmap, and productivity score instantly.",
    icon: "📊",
    detail: "Data loads from local storage — no network call needed.",
    color: "#A3E635",
  },
  {
    num: "04",
    title: "Set limits & focus",
    desc: "Configure daily caps, per-site limits, work-hours schedule, and start Pomodoro sessions to block distractions.",
    icon: "⚙️",
    detail: "Notifications fire the moment you hit any limit.",
    color: "#FB923C",
  },
];

export default function HowItWorks() {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setActive((p) => (p + 1) % STEPS.length), 3000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("visible")),
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );
    ref.current?.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="how-it-works" ref={ref} className="relative py-28 px-6 overflow-hidden">
      <div className="absolute inset-0 bg-radial-violet opacity-40 pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16 reveal">
          <span className="inline-block font-mono text-xs text-cyan-400 tracking-widest uppercase mb-4 bg-cyan-500/10 px-4 py-1.5 rounded-full border border-cyan-500/20">
            How it works
          </span>
          <h2 className="font-display font-extrabold text-4xl md:text-5xl text-white leading-tight">
            Up and running in <span className="gradient-text">30 seconds.</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Steps */}
          <div className="space-y-4 reveal reveal-delay-1">
            {STEPS.map((s, i) => (
              <button
                key={s.num}
                onClick={() => setActive(i)}
                className={`w-full text-left glass rounded-2xl p-5 transition-all duration-300 border ${
                  active === i
                    ? "border-violet-500/50 shadow-lg"
                    : "border-transparent opacity-60 hover:opacity-90"
                }`}
                style={active === i ? { boxShadow: `0 0 30px ${s.color}25` } : {}}
              >
                <div className="flex items-start gap-4">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-lg flex-shrink-0 transition-all"
                    style={active === i ? { background: `${s.color}25`, boxShadow: `0 0 16px ${s.color}40` } : { background: "rgba(139,92,246,0.08)" }}
                  >
                    {s.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-mono text-xs text-slate-600">{s.num}</span>
                      <h3 className="font-display font-semibold text-white text-sm">{s.title}</h3>
                    </div>
                    <p className="text-slate-400 text-sm leading-relaxed">{s.desc}</p>
                    {active === i && (
                      <p className="mt-2 text-xs font-mono text-slate-600 bg-ink-800 rounded-lg px-3 py-1.5 inline-block">
                        {s.detail}
                      </p>
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Visual */}
          <div className="reveal reveal-delay-2 flex justify-center">
            <div className="relative w-full max-w-sm">
              <div className="absolute inset-0 bg-violet-600/10 rounded-3xl blur-3xl" />
              <div className="glass rounded-3xl p-8 relative">
                {/* Progress ring */}
                <div className="flex justify-center mb-6">
                  <div className="relative w-32 h-32">
                    <svg viewBox="0 0 120 120" className="w-full h-full -rotate-90">
                      <circle cx="60" cy="60" r="50" fill="none" stroke="#1E1E3F" strokeWidth="8"/>
                      <circle
                        cx="60" cy="60" r="50" fill="none"
                        stroke={STEPS[active].color}
                        strokeWidth="8" strokeLinecap="round"
                        strokeDasharray={`${((active+1)/4)*314.16} 314.16`}
                        style={{ transition: "stroke-dasharray 0.6s ease, stroke 0.4s ease", filter: `drop-shadow(0 0 8px ${STEPS[active].color}80)` }}
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-3xl">{STEPS[active].icon}</span>
                      <span className="font-mono text-xs text-slate-400 mt-1">Step {active + 1}/4</span>
                    </div>
                  </div>
                </div>

                <h3 className="font-display font-bold text-white text-xl text-center mb-2">
                  {STEPS[active].title}
                </h3>
                <p className="text-slate-400 text-sm text-center leading-relaxed">
                  {STEPS[active].desc}
                </p>

                {/* Dot indicators */}
                <div className="flex justify-center gap-2 mt-5">
                  {STEPS.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setActive(i)}
                      className="w-2 h-2 rounded-full transition-all duration-300"
                      style={i === active ? { background: STEPS[active].color, width: "20px" } : { background: "#3F3F5A" }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
