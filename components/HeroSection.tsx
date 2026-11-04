"use client";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight, Timer, ShieldBan, BarChart3 } from "lucide-react";

const STORE = "https://microsoftedge.microsoft.com/addons/detail/tab-time-tracker/aoecofhfffbfnkekppdgicmnfjmfdmoe";
const SITES = [["github.com", 78, "2h 14m"], ["youtube.com", 52, "1h 31m"], ["docs.google.com", 34, "58m"], ["reddit.com", 18, "31m"]] as const;

export default function HeroSection() {
  const mx = useMotionValue(0), my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-1, 1], [8, -8]), { stiffness: 120, damping: 14 });
  const ry = useSpring(useTransform(mx, [-1, 1], [-10, 10]), { stiffness: 120, damping: 14 });
  const onMove = (e: React.MouseEvent<HTMLDivElement>) => { const r = e.currentTarget.getBoundingClientRect(); mx.set(((e.clientX - r.left) / r.width) * 2 - 1); my.set(((e.clientY - r.top) / r.height) * 2 - 1); };
  const onLeave = () => { mx.set(0); my.set(0); };
  return (
    <section className="relative pt-32 pb-24 overflow-hidden section-base">
      <div className="absolute inset-0 dot-grid opacity-40 pointer-events-none" />
      <div className="mesh absolute inset-0 pointer-events-none" />
      <div className="relative max-w-7xl mx-auto px-6 grid lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7">
          <motion.span initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="pill inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono">
            <span className="w-1.5 h-1.5 rounded-full animate-pulse-glow" style={{ background: "var(--violet-500)" }} /> v4.0 · free · no sign-up
          </motion.span>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }}
            className="mt-6 font-display font-extrabold tracking-tight leading-[0.95] text-5xl sm:text-7xl" style={{ color: "var(--text-heading)" }}>
            Your tabs are <span className="font-serif italic font-normal" style={{ color: "var(--violet-500)" }}>stealing</span> your day.
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="mt-6 max-w-xl text-lg" style={{ color: "var(--text-muted)" }}>
            See exactly where your browsing time goes, cap the sites that drain you, and lock in with Pomodoro focus sessions. Private by design.
          </motion.p>
          <div className="mt-9 flex flex-wrap gap-3">
            <a href={STORE} target="_blank" rel="noopener noreferrer" className="btn-primary px-7 py-3.5 rounded-2xl font-display font-bold flex items-center gap-2">Add to browser <ArrowUpRight size={18} /></a>
            <a href="#features" className="btn-secondary px-7 py-3.5 rounded-2xl font-display font-bold">Explore features</a>
          </div>
          <dl className="mt-12 grid grid-cols-3 max-w-md gap-6 font-mono text-xs" style={{ color: "var(--text-muted)" }}>
            {[["100%", "local data"], ["0", "accounts"], ["<1MB", "footprint"]].map(([a, b]) => (
              <div key={b}><dt className="font-display text-2xl font-extrabold" style={{ color: "var(--text-heading)" }}>{a}</dt><dd>{b}</dd></div>
            ))}
          </dl>
        </div>

        <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.25 }} onMouseMove={onMove} onMouseLeave={onLeave} className="lg:col-span-5" style={{ perspective: 1000 }}>
          <motion.div style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }}>
          <div className="rounded-3xl p-6 shadow-hover" style={{ background: "var(--card-bg)", border: "1px solid var(--card-border)" }}>
            <div className="flex items-center justify-between font-mono text-xs" style={{ color: "var(--text-muted)" }}><span>TODAY</span><span>Focus score 86</span></div>
            <div className="mt-2 font-display text-5xl font-extrabold" style={{ color: "var(--text-heading)" }}>5h 12m</div>
            <div className="mt-6 space-y-4">
              {SITES.map(([s, w, t], i) => (
                <div key={s}>
                  <div className="flex justify-between text-sm" style={{ color: "var(--text-body)" }}><span>{s}</span><span className="font-mono">{t}</span></div>
                  <div className="mt-1.5 h-2 rounded-full" style={{ background: "var(--bg-muted)" }}>
                    <motion.div initial={{ width: 0 }} animate={{ width: `${w}%` }} transition={{ delay: 0.5 + i * 0.12, duration: 0.8 }} className="h-full rounded-full" style={{ background: "var(--violet-500)" }} />
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 grid grid-cols-3 gap-2 text-xs font-mono">
              {[[Timer, "Pomodoro"], [ShieldBan, "Blocking"], [BarChart3, "Reports"]].map(([Icon, l]: any) => (
                <div key={l} className="pill rounded-xl py-2 flex items-center justify-center gap-1.5"><Icon size={13} />{l}</div>
              ))}
            </div>
          </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
