"use client";
import { useEffect, useRef } from "react";

const TESTIMONIALS = [
  {
    name: "Alex K.",
    handle: "@alexk_dev",
    avatar: "AK",
    text: "I had no idea I was spending 3 hours a day on YouTube until Tab Time Tracker showed me. Changed my habits in a week.",
    stars: 5,
    color: "#8B5CF6",
  },
  {
    name: "Sarah M.",
    handle: "@sarahm_ux",
    avatar: "SM",
    text: "The Pomodoro + site blocking combo is *chef's kiss*. Finally a focus tool that actually blocks the sites I tell it to.",
    stars: 5,
    color: "#22D3EE",
  },
  {
    name: "Diego R.",
    handle: "@diego_builds",
    avatar: "DR",
    text: "The AI chat feature is surprisingly useful. I asked it to analyze my distraction patterns and it gave me an actual strategy.",
    stars: 5,
    color: "#A3E635",
  },
  {
    name: "Priya N.",
    handle: "@priya_writes",
    avatar: "PN",
    text: "The heatmap is addictive to look at. I now compete with myself to keep it green. 10/10 gamification.",
    stars: 5,
    color: "#FB923C",
  },
  {
    name: "James T.",
    handle: "@jamescode",
    avatar: "JT",
    text: "Privacy-first approach sold me immediately. No account, no cloud, data stays in my browser. Rare these days.",
    stars: 5,
    color: "#F472B6",
  },
  {
    name: "Mei L.",
    handle: "@mei_product",
    avatar: "ML",
    text: "Scheduled work limits are genius. 2h limit during work hours keeps me honest, then I can relax after 5pm.",
    stars: 5,
    color: "#FBBF24",
  },
];

function TestCard({ t }: { t: typeof TESTIMONIALS[0] }) {
  return (
    <div className="glass rounded-2xl p-6 w-72 flex-shrink-0 mx-2 feature-card">
      <div className="flex items-center gap-3 mb-3">
        <div
          className="w-9 h-9 rounded-xl flex items-center justify-center text-white font-display font-bold text-xs"
          style={{ background: `${t.color}30`, border: `1px solid ${t.color}40`, color: t.color }}
        >
          {t.avatar}
        </div>
        <div>
          <p className="text-white text-sm font-semibold font-display">{t.name}</p>
          <p className="text-slate-600 text-xs font-mono">{t.handle}</p>
        </div>
        <div className="ml-auto flex gap-0.5">
          {Array.from({ length: t.stars }).map((_, i) => (
            <span key={i} className="text-yellow-400 text-xs">★</span>
          ))}
        </div>
      </div>
      <p className="text-slate-300 text-sm leading-relaxed">"{t.text}"</p>
    </div>
  );
}

export default function TestimonialsSection() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("visible")),
      { threshold: 0.1 }
    );
    ref.current?.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="relative py-28 overflow-hidden">
      <div className="absolute inset-0 bg-radial-violet opacity-30 pointer-events-none" />

      <div className="relative z-10">
        <div className="text-center mb-14 px-6 reveal">
          <span className="inline-block font-mono text-xs text-violet-400 tracking-widest uppercase mb-4 bg-violet-500/10 px-4 py-1.5 rounded-full border border-violet-500/20">
            What users say
          </span>
          <h2 className="font-display font-extrabold text-4xl md:text-5xl text-white">
            From the Chrome Web Store
          </h2>
        </div>

        {/* Marquee row 1 */}
        <div className="flex overflow-hidden mb-4">
          <div className="marquee-track flex">
            {[...TESTIMONIALS, ...TESTIMONIALS].map((t, i) => (
              <TestCard key={i} t={t} />
            ))}
          </div>
        </div>

        {/* Marquee row 2 — reverse */}
        <div className="flex overflow-hidden">
          <div className="flex" style={{ animation: "marquee 34s linear infinite reverse", whiteSpace: "nowrap" }}>
            {[...TESTIMONIALS.slice(3), ...TESTIMONIALS.slice(3)].map((t, i) => (
              <TestCard key={i} t={t} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
