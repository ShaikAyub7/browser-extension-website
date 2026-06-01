"use client";
import { TIPS } from "@/data";
import {  Lightbulb  } from "lucide-react";
import { useState, useEffect } from "react";



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
