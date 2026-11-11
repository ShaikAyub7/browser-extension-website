"use client";
import { useState } from "react";
import { motion } from "framer-motion";

export default function TimeCalculator() {
  const [h, setH] = useState(3);
  const [age, setAge] = useState(22);
  const years = (h * 365 * (80 - age)) / (24 * 365);
  const wakingPct = Math.round((h / 16) * 100);
  const saved = years * 0.4;
  const FIELDS = [
    {
      l: "Hours online per day (distracting)",
      v: h,
      s: setH,
      mn: 1,
      mx: 12,
      u: "h",
    },
    { l: "Your age", v: age, s: setAge, mn: 13, mx: 70, u: "" },
  ];
  return (
    <section className="py-24 section-base">
      <div className="max-w-5xl mx-auto px-6">
        <p
          className="font-mono text-xs uppercase tracking-widest"
          style={{ color: "var(--violet-500)" }}
        >
          Reality check
        </p>
        <h2
          className="mt-3 font-display font-extrabold text-4xl sm:text-6xl tracking-tight"
          style={{ color: "var(--text-heading)" }}
        >
          How much of your life is{" "}
          <span className="font-serif italic font-normal">one tab?</span>
        </h2>
        <div
          className="mt-12 grid md:grid-cols-2 gap-8 rounded-3xl p-8 shadow-card"
          style={{
            background: "var(--card-bg)",
            border: "1px solid var(--card-border)",
          }}
        >
          <div className="space-y-8">
            {FIELDS.map(({ l, v, s, mn, mx, u }) => (
              <label key={l} className="block">
                <div
                  className="flex justify-between text-sm font-mono"
                  style={{ color: "var(--text-muted)" }}
                >
                  <span>{l}</span>
                  <b style={{ color: "var(--text-heading)" }}>
                    {v}
                    {u}
                  </b>
                </div>
                <input
                  type="range"
                  min={mn}
                  max={mx}
                  value={v}
                  onChange={(e) => s(+e.target.value)}
                  className="w-full mt-3 accent-[#10B981]"
                />
              </label>
            ))}
            <div
              className="h-3 rounded-full overflow-hidden"
              style={{ background: "var(--bg-muted)" }}
            >
              <motion.div
                animate={{ width: `${wakingPct}%` }}
                className="h-full"
                style={{ background: "var(--violet-500)" }}
              />
            </div>
            <p
              className="text-xs font-mono"
              style={{ color: "var(--text-muted)" }}
            >
              {wakingPct}% of your waking day
            </p>
          </div>
          <div className="flex flex-col justify-center">
            <p
              className="text-sm font-mono"
              style={{ color: "var(--text-muted)" }}
            >
              By age 80 that’s
            </p>
            <motion.div
              key={years.toFixed(1)}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-display font-extrabold text-7xl"
              style={{ color: "var(--violet-500)" }}
            >
              {years.toFixed(1)}
              <span className="text-3xl"> years</span>
            </motion.div>
            <p className="mt-4" style={{ color: "var(--text-body)" }}>
              Cut it by 40% with limits and focus sessions and you win back{" "}
              <b>{saved.toFixed(1)} years</b>.
            </p>
            <a
              href="#install"
              className="btn-primary mt-6 self-start px-6 py-3 rounded-2xl font-display font-bold"
            >
              Win it back
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
