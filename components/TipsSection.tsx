"use client";
import { Apple, BarChart, Brain, Lightbulb, Moon, Trophy } from "lucide-react";
import { useState, useEffect } from "react";

const TIPS = [
  { icon: Brain, title: "The 2-minute rule", tip: "If you catch yourself on a distracting site, set a 2-minute timer. When it rings, decide consciously whether to stay. Most of the time, you'll leave.", tag: "Psychology" },
  { icon: Apple, title: "Why 25 minutes?", tip: "Francesco Cirillo tested dozens of intervals. 25 minutes was the sweet spot where focus is deep but fatigue hasn't set in. Our brains work in ~90-minute ultradian cycles.", tag: "Science" },
  { icon: BarChart, title: "The average person…", tip: "…switches tasks every 40 seconds when at a computer. It takes ~23 minutes to fully regain deep focus after each switch. Tracking helps you see the true cost.", tag: "Research" },
  { icon: Lightbulb, title: "Notifications vs alerts", tip: "Browser notifications are fine — they bring you back. But site-visit alerts (like Tab Time Tracker's limit warnings) are 3× more effective at reducing overuse than app-level blocks.", tag: "Tip" },
  { icon: Trophy, title: "Streaks work", tip: "A 7-day streak triggers the \"sunk cost\" commitment effect. Users who hit 7 days are 4× more likely to maintain healthy habits for 30+ days. Don't break the chain.", tag: "Motivation" },
  { icon: Moon, title: "Evening = danger zone", tip: "The hour before bed is when most people exceed their limits. Your willpower is lowest then. Pre-scheduling a stricter evening cap removes the need for willpower entirely.", tag: "Strategy" },
  { icon: BarChart, title: "Awareness > willpower", tip: "People who track their time spend 22% less on distracting sites — even without setting any limits. Just seeing the number is enough to change behavior.", tag: "Data" },
  { icon: Lightbulb, title: "Your data stays local", tip: "Tab Time Tracker never sends your browsing data to any server. It lives in your browser's local storage. You own it — export as CSV or JSON any time.", tag: "Privacy" },
];

export default function TipsSection() {
  const [current, setCurrent] = useState(0);
  const [fading, setFading] = useState(false);

  const goTo = (idx: number) => {
    setFading(true);
    setTimeout(() => {
      setCurrent(idx);
      setFading(false);
    }, 250);
  };

  useEffect(() => {
    const id = setInterval(() => {
      goTo((current + 1) % TIPS.length);
    }, 6000);
    return () => clearInterval(id);
  }, [current]);

  const tip = TIPS[current];
  const Icon = tip.icon;

  return (
    <section className="relative py-20 section-violet overflow-hidden">
      <div className="absolute inset-0 dot-grid opacity-20 pointer-events-none" />
      <div className="max-w-3xl mx-auto px-6 relative z-10">
        <div className="text-center mb-10">
          <div className="pill mx-auto mb-4"><Lightbulb className="w-4 h-4 mr-2" /> Did you know?</div>
          <h2 className="font-display font-extrabold text-3xl md:text-4xl" style={{ color: "var(--text-heading)" }}>
            Daily productivity insights
          </h2>
        </div>

        <div
          className="feature-card p-8 md:p-12 text-center transition-all duration-250"
          style={{ opacity: fading ? 0 : 1, transform: fading ? "translateY(8px)" : "translateY(0)" }}
        >
          <div className="text-5xl mb-4">
            <Icon className="mx-auto" />


          </div>
          <div
            className="pill mx-auto mb-4"
            style={{ background: "var(--violet-100)", color: "var(--violet-500)", borderColor: "var(--border-violet)" }}
          >
            {tip.tag}
          </div>
          <h3 className="font-display font-extrabold text-xl mb-3" style={{ color: "var(--text-heading)" }}>
            {tip.title}
          </h3>
          <p className="text-base leading-relaxed max-w-xl mx-auto" style={{ color: "var(--text-body)" }}>
            {tip.tip}
          </p>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-6">
          {TIPS.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className="rounded-full transition-all duration-300"
              style={{
                width: i === current ? "24px" : "8px",
                height: "8px",
                background: i === current ? "#7C3AED" : "var(--border-soft)",
              }}
              aria-label={`Tip ${i + 1}`}
            />
          ))}
        </div>
        <p className="text-center text-xs font-mono mt-3" style={{ color: "var(--text-faint)" }}>
          Auto-advances · click dots to browse
        </p>
      </div>
    </section>
  );
}
