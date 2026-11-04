"use client";
import { motion } from "framer-motion";
import { Timer, ShieldBan, BarChart3, Keyboard, MousePointerClick, LayoutDashboard, Lock, CalendarRange } from "lucide-react";

const F = [
  { i: BarChart3, t: "Per-site analytics", d: "Daily, weekly and monthly breakdowns with a heatmap of your most distracted hours.", c: "md:col-span-2 md:row-span-2", big: true },
  { i: Timer, t: "Pomodoro focus", d: "Timed sessions that auto-block your worst offenders.", c: "" },
  { i: ShieldBan, t: "Site limits & quick-block", d: "Cap sites or right-click to block instantly.", c: "" },
  { i: MousePointerClick, t: "Cursor time alerts", d: "A gentle nudge when a tab has had you for too long.", c: "" },
  { i: Keyboard, t: "Keyboard shortcuts", d: "Start, pause and block without leaving the page.", c: "" },
  { i: LayoutDashboard, t: "Full-page dashboard", d: "Trends, top sites and goals on one screen.", c: "md:col-span-2" },
  { i: CalendarRange, t: "Weekly report", d: "A Monday-morning recap: wins, slips and streaks.", c: "" },
  { i: Lock, t: "Private by design", d: "Data stays in your browser. No account, no tracking.", c: "" },
];

export default function FeaturesSection() {
  return (
    <section id="features" className="py-24 section-tint">
      <div className="max-w-7xl mx-auto px-6">
        <p className="font-mono text-xs uppercase tracking-widest" style={{ color: "var(--violet-500)" }}>Features</p>
        <h2 className="mt-3 font-display font-extrabold text-4xl sm:text-6xl tracking-tight max-w-2xl" style={{ color: "var(--text-heading)" }}>
          Everything you need. <span className="font-serif italic font-normal">Nothing you don’t.</span>
        </h2>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-4 auto-rows-[minmax(170px,auto)] gap-4">
          {F.map(({ i: Icon, t, d, c, big }, n) => (
            <motion.div key={t} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: n * 0.05 }}
              onMouseMove={e => { const r = e.currentTarget.getBoundingClientRect(); e.currentTarget.style.setProperty("--x", `${e.clientX - r.left}px`); e.currentTarget.style.setProperty("--y", `${e.clientY - r.top}px`); }}
              className={`spot feature-card rounded-3xl p-6 flex flex-col justify-between ${c}`}
              style={big ? { background: "var(--violet-500)", color: "#fff", border: "none" } : undefined}>
              <Icon size={big ? 34 : 24} style={{ color: big ? "#fff" : "var(--violet-500)" }} />
              <div>
                <h3 className={`font-display font-bold ${big ? "text-3xl" : "text-lg"}`} style={big ? undefined : { color: "var(--text-heading)" }}>{t}</h3>
                <p className="mt-2 text-sm" style={{ color: big ? "rgba(255,255,255,.85)" : "var(--text-muted)" }}>{d}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
