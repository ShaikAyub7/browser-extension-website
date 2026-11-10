"use client";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import AuroraCanvas from "./AuroraCanvas";
import ProductFilm from "./ProductFilm";

const STORE = "https://microsoftedge.microsoft.com/addons/detail/tab-time-tracker/aoecofhfffbfnkekppdgicmnfjmfdmoe";

export default function HeroSection() {
  return (
    <section className="relative pt-32 pb-20 overflow-hidden section-base">
      <AuroraCanvas />
      <div className="relative max-w-5xl mx-auto px-6 text-center">
        <motion.span initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="pill inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono">
          <span className="w-1.5 h-1.5 rounded-full animate-pulse-glow" style={{ background: "var(--violet-500)" }} /> v4.0 · free · no sign-up
        </motion.span>
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }}
          className="mt-6 font-display font-extrabold tracking-tight leading-[0.95] text-5xl sm:text-8xl" style={{ color: "var(--text-heading)" }}>
          Watch your time <span className="font-serif italic font-normal grad-text">flow back.</span>
        </motion.h1>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="mt-6 mx-auto max-w-xl text-lg" style={{ color: "var(--text-muted)" }}>
          Track every tab, cap what drains you, and lock in with focus sessions. Private by design.
        </motion.p>
        <div className="mt-9 flex flex-wrap gap-3 justify-center">
          <a href={STORE} target="_blank" rel="noopener noreferrer" className="btn-primary px-7 py-3.5 rounded-2xl font-display font-bold flex items-center gap-2">Add to browser <ArrowUpRight size={18} /></a>
          <a href="#features" className="btn-secondary px-7 py-3.5 rounded-2xl font-display font-bold">Explore features</a>
        </div>
        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35, duration: 0.7 }} className="mt-16 text-left">
          <ProductFilm />
        </motion.div>
      </div>
    </section>
  );
}
