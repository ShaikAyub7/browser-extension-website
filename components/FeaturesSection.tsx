"use client";
import { useEffect, useRef } from "react";

const FEATURES = [
  {
    icon: "📊",
    title: "Real-time tracking",
    desc: "Every tab, every second. Time accumulates silently while you browse — no action required. Gaps > 1 min are automatically ignored.",
    accent: "#8B5CF6",
    tag: "Core",
  },
  {
    icon: "🔔",
    title: "Daily & per-site limits",
    desc: "Set a global daily cap or per-site minute limits. Get a browser notification the moment you cross your threshold.",
    accent: "#22D3EE",
    tag: "Limits",
  },
  {
    icon: "🍅",
    title: "Pomodoro focus mode",
    desc: "25 / 45 / 60 minute timers with site blocking. Distracting domains redirect to a new tab the moment focus starts.",
    accent: "#F87171",
    tag: "Focus",
  },
  {
    icon: "📅",
    title: "Scheduled work limits",
    desc: "Stricter browsing limits during work hours (9–5 by default). Different caps for work vs. leisure time.",
    accent: "#A3E635",
    tag: "Schedule",
  },
  {
    icon: "📈",
    title: "Analytics & heatmap",
    desc: "7 or 30-day bar charts, top-site leaderboard, productivity score, and a 35-day activity heatmap — all in one popup.",
    accent: "#FB923C",
    tag: "Analytics",
  },
  {
    icon: "🤖",
    title: "AI assistant",
    desc: "Chat with an AI about your browsing data. Ask 'What was my most distracted day?' or 'Suggest a focus strategy.'",
    accent: "#818CF8",
    tag: "AI",
  },
  {
    icon: "🏆",
    title: "Streak & goals",
    desc: "Build a daily streak by staying under your limit. Visual streak counter keeps you motivated and accountable.",
    accent: "#FBBF24",
    tag: "Gamification",
  },
  {
    icon: "💾",
    title: "Export your data",
    desc: "Download your full browsing history as CSV or JSON. Your data stays local — never uploaded to any server.",
    accent: "#34D399",
    tag: "Privacy",
  },
];

export default function FeaturesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("visible");
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -60px 0px" }
    );
    const reveals = sectionRef.current?.querySelectorAll(".reveal");
    reveals?.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="features" ref={sectionRef} className="relative py-28 px-6">
      {/* Background accent */}
      <div className="absolute inset-0 bg-radial-cyan opacity-50 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section header */}
        <div className="text-center mb-16 reveal">
          <span className="inline-block font-mono text-xs text-violet-400 tracking-widest uppercase mb-4 bg-violet-500/10 px-4 py-1.5 rounded-full border border-violet-500/20">
            Everything you need
          </span>
          <h2 className="font-display font-extrabold text-4xl md:text-5xl text-white leading-tight">
            A full productivity stack,<br />
            <span className="gradient-text">inside one tiny popup.</span>
          </h2>
          <p className="mt-4 text-slate-400 text-lg max-w-xl mx-auto">
            8 powerful features. Zero subscriptions. Completely private — all data lives in your browser.
          </p>
        </div>

        {/* Feature grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {FEATURES.map((f, i) => (
            <div
              key={f.title}
              className={`feature-card glass rounded-2xl p-6 relative overflow-hidden reveal reveal-delay-${(i % 4) + 1}`}
            >
              {/* Glow corner */}
              <div
                className="absolute -top-6 -right-6 w-24 h-24 rounded-full blur-2xl opacity-20"
                style={{ background: f.accent }}
              />
              {/* Tag */}
              <span
                className="inline-block text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full mb-4 border"
                style={{
                  color: f.accent,
                  background: `${f.accent}18`,
                  borderColor: `${f.accent}30`,
                }}
              >
                {f.tag}
              </span>
              {/* Icon */}
              {/* <div className="text-3xl mb-3">{f.icon}</div> */}
              {/* Content */}
              <h3 className="font-display font-semibold text-white text-base mb-2">{f.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
