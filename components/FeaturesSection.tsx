"use client";
import { FEATURES } from "@/data";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { BarChart3, BellRing, Brain, CalendarClock, Download, Flame, Lock, TimerReset } from "lucide-react";

const featureIcons = [BarChart3, BellRing, TimerReset, CalendarClock, BarChart3, Brain, Flame, Download];


export default function FeaturesSection() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("visible")),
      { threshold: 0.08, rootMargin: "0px 0px -50px 0px" }
    );
    ref.current?.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="features" ref={ref} className="relative py-28 px-6 section-tint">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 reveal">
          <div className="pill mx-auto mb-5">✦ Everything you need</div>
          <h2 className="font-display font-extrabold text-4xl md:text-5xl  leading-tight">
            A full productivity stack,<br/>
            <span className="font-serif italic gradient-text">inside one tiny popup.</span>
          </h2>
          <p className="mt-4 text-ink-500 text-lg max-w-xl mx-auto">
            8 powerful features. Zero subscriptions. Completely private — all data lives in your browser.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {FEATURES.map((f, i) => {
            const Icon = featureIcons[i] || Lock;
            return (
            <motion.div key={f.title}
              className={`feature-card group relative overflow-hidden p-6 reveal reveal-delay-${(i % 4) + 1}`}
              initial={{ opacity: 0, y: 28, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.22 }}
              transition={{ duration: 0.45, delay: i * 0.04, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -8, rotateX: 2, rotateY: -2 }}>
              <div className="absolute inset-x-0 top-0 h-px opacity-0 group-hover:opacity-100 transition-opacity animated-gradient-line" />
              <div
                className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl"
                style={{ background: `${f.accent}14`, color: f.accent }}
              >
                <Icon className="h-5 w-5" />
              </div>
              <span className="inline-block text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full mb-3 border"
                style={{color:f.accent,background:`${f.accent}12`,borderColor:`${f.accent}28`}}>
                {f.tag}
              </span>
              <h3 className="font-display font-bold  text-[15px] mb-2">{f.title}</h3>
              <p className="text-ink-500 text-sm leading-relaxed">{f.desc}</p>
            </motion.div>
          )})}
        </div>
      </div>
    </section>
  );
}
