"use client";
import { useRef, useState } from "react";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";

const D = [
  { t: "08:40", h: "Coffee, then “just checking”", s: "reddit.com", m: "23 min gone before work even starts.", v: 8 },
  { t: "11:15", h: "Deep work… until it isn’t", s: "youtube.com", m: "Tab Time Tracker nudges you at 30 min.", v: 35 },
  { t: "14:00", h: "Pomodoro kicks in", s: "docs.google.com", m: "25 min locked in. Distractions blocked.", v: 78 },
  { t: "18:30", h: "The honest recap", s: "Focus score 86", m: "You won back 1h 47m today.", v: 100 },
];

export default function DayTimeline() {
  const ref = useRef<HTMLDivElement>(null);
  const [i, setI] = useState(0);
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start start", "end end"] });
  useMotionValueEvent(p, "change", v => setI(Math.min(D.length - 1, Math.floor(v * D.length))));
  const d = D[i];
  return (
    <section ref={ref} className="relative h-[320vh] section-tint">
      <div className="sticky top-0 h-screen flex items-center">
        <div className="max-w-6xl mx-auto px-6 w-full grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="font-mono text-xs uppercase tracking-widest" style={{ color: "var(--violet-500)" }}>A day in your tabs</p>
            <AnimatePresence mode="wait">
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -30 }} transition={{ duration: 0.35 }}>
                <div className="mt-4 font-mono text-7xl sm:text-8xl font-bold" style={{ color: "var(--violet-500)" }}>{d.t}</div>
                <h3 className="mt-4 font-display font-extrabold text-3xl sm:text-5xl tracking-tight" style={{ color: "var(--text-heading)" }}>{d.h}</h3>
                <p className="mt-3 text-lg" style={{ color: "var(--text-muted)" }}>{d.m}</p>
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="rounded-3xl p-8 shadow-hover" style={{ background: "var(--card-bg)", border: "1px solid var(--card-border)" }}>
            <div className="flex justify-between font-mono text-xs" style={{ color: "var(--text-muted)" }}><span>NOW TRACKING</span><span className="animate-pulse-glow">● LIVE</span></div>
            <div className="mt-3 font-display text-4xl font-extrabold" style={{ color: "var(--text-heading)" }}>{d.s}</div>
            <div className="mt-8 h-3 rounded-full" style={{ background: "var(--bg-muted)" }}>
              <motion.div animate={{ width: `${d.v}%` }} transition={{ type: "spring", stiffness: 80, damping: 18 }} className="h-full rounded-full" style={{ background: "var(--violet-500)" }} />
            </div>
            <div className="mt-6 flex gap-2">{D.map((_, n) => <span key={n} className="h-1.5 flex-1 rounded-full" style={{ background: n <= i ? "var(--violet-500)" : "var(--bg-muted)" }} />)}</div>
          </div>
        </div>
      </div>
    </section>
  );
}
