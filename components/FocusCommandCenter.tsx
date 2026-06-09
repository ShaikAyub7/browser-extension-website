"use client";

import { motion } from "framer-motion";
import { AlarmClock, ArrowRight, BrainCircuit, Clock3, Gauge, ShieldCheck, Sparkles } from "lucide-react";

const timeline = [
  { time: "09:00", label: "Work limits turn on", tone: "#10B981" },
  { time: "11:30", label: "Focus block protects deep work", tone: "#7C3AED" },
  { time: "16:45", label: "AI suggests tomorrow's cap", tone: "#F97316" },
];

const controls = [
  { icon: Clock3, label: "Work window", value: "9 AM - 5 PM", color: "#3B82F6" },
  { icon: Gauge, label: "Daily cap", value: "4h 30m", color: "#7C3AED" },
  { icon: ShieldCheck, label: "Blocked sites", value: "12 active", color: "#EF4444" },
];

export default function FocusCommandCenter() {
  return (
    <section id="command-center" className="relative overflow-hidden px-6 py-28 section-base">
      <div className="absolute inset-0 bg-radial-indigo pointer-events-none" />
      <div className="absolute inset-x-0 top-0 h-px animated-gradient-line" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[0.9fr_1.1fr]">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="pill mb-5">
            <Sparkles className="h-3.5 w-3.5" />
            New workflow layer
          </div>
          <h2 className="font-display text-4xl font-extrabold leading-tight md:text-5xl" style={{ color: "var(--text-heading)" }}>
            Turn tracking into
            <span className="font-serif italic gradient-text"> automatic guardrails.</span>
          </h2>
          <p className="mt-5 max-w-xl text-lg leading-relaxed" style={{ color: "var(--text-muted)" }}>
            Combine scheduled limits, focus blocks, smart nudges, and local-only analytics into a routine that reacts before distractions take over.
          </p>

          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {controls.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.label}
                  className="rounded-2xl border p-4 shadow-card"
                  style={{ background: "var(--card-bg)", borderColor: "var(--card-border)" }}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08, duration: 0.45 }}
                >
                  <Icon className="mb-3 h-5 w-5" style={{ color: item.color }} />
                  <p className="text-xs font-mono uppercase tracking-widest" style={{ color: "var(--text-faint)" }}>
                    {item.label}
                  </p>
                  <p className="mt-1 font-display text-sm font-bold" style={{ color: "var(--text-heading)" }}>
                    {item.value}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        <motion.div
          className="command-panel relative rounded-[28px] border p-4 shadow-card"
          style={{ background: "var(--card-bg)", borderColor: "var(--card-border)" }}
          initial={{ opacity: 0, x: 28, scale: 0.96 }}
          whileInView={{ opacity: 1, x: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="rounded-3xl border p-5" style={{ borderColor: "var(--border)", background: "var(--bg-soft)" }}>
            <div className="mb-5 flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-mono uppercase tracking-widest" style={{ color: "var(--text-faint)" }}>
                  Focus Command Center
                </p>
                <h3 className="mt-1 font-display text-2xl font-extrabold" style={{ color: "var(--text-heading)" }}>
                  Today's protection plan
                </h3>
              </div>
              <div className="rounded-2xl px-3 py-2 text-xs font-bold" style={{ background: "rgba(16,185,129,0.12)", color: "#10B981" }}>
                Live
              </div>
            </div>

            <div className="grid gap-4 lg:grid-cols-[1fr_0.8fr]">
              <div className="space-y-3">
                {timeline.map((item, index) => (
                  <motion.div
                    key={item.time}
                    className="relative overflow-hidden rounded-2xl border p-4"
                    style={{ background: "var(--card-bg)", borderColor: "var(--card-border)" }}
                    initial={{ opacity: 0, x: -18 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + index * 0.1, duration: 0.45 }}
                  >
                    <div className="scan-line" />
                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl font-mono text-xs font-bold" style={{ background: `${item.tone}14`, color: item.tone }}>
                        {item.time}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="font-display text-sm font-bold" style={{ color: "var(--text-heading)" }}>
                          {item.label}
                        </p>
                        <div className="mt-2 h-2 overflow-hidden rounded-full" style={{ background: "var(--bg-muted)" }}>
                          <motion.div
                            className="h-full rounded-full"
                            style={{ background: item.tone }}
                            initial={{ width: "0%" }}
                            whileInView={{ width: `${72 - index * 13}%` }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.35 + index * 0.1, duration: 0.9 }}
                          />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="rounded-2xl border p-5" style={{ background: "var(--card-bg)", borderColor: "var(--card-border)" }}>
                <div className="mb-5 flex items-center justify-between">
                  <AlarmClock className="h-5 w-5 text-violet-500" />
                  <span className="font-mono text-xs" style={{ color: "var(--text-faint)" }}>23:18 left</span>
                </div>
                <div className="focus-ring relative mx-auto mb-5 h-36 w-36 rounded-full">
                  <div className="absolute inset-4 rounded-full" style={{ background: "var(--bg-soft)" }} />
                  <div className="absolute inset-0 grid place-items-center">
                    <div className="text-center">
                      <p className="font-display text-4xl font-extrabold gradient-text">82</p>
                      <p className="text-xs font-mono" style={{ color: "var(--text-faint)" }}>focus score</p>
                    </div>
                  </div>
                </div>
                <div className="rounded-2xl p-4" style={{ background: "var(--bg-soft)" }}>
                  <div className="mb-2 flex items-center gap-2">
                    <BrainCircuit className="h-4 w-4 text-violet-500" />
                    <p className="text-sm font-bold" style={{ color: "var(--text-heading)" }}>AI nudge</p>
                  </div>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
                    Move YouTube to a 35 minute evening cap. Your focus score is highest before lunch.
                  </p>
                </div>
              </div>
            </div>

            <a href="#install" className="mt-5 inline-flex items-center gap-2 rounded-2xl px-5 py-3 text-sm font-bold btn-primary">
              Build my routine
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
