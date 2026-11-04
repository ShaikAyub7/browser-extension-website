"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";

const TEXT = "You don’t lose time in hours. You lose it in tabs. One quick look, one more video, one open loop at a time. Tab Time Tracker makes the invisible visible, so you can take your day back.";

function Word({ w, p, a, b }: { w: string; p: MotionValue<number>; a: number; b: number }) {
  const o = useTransform(p, [a, b], [0.12, 1]);
  return <motion.span style={{ opacity: o }} className="mr-3 inline-block">{w}</motion.span>;
}

export default function Manifesto() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start 0.8", "end 0.5"] });
  const words = TEXT.split(" ");
  return (
    <section className="py-32 section-base">
      <div ref={ref} className="max-w-5xl mx-auto px-6">
        <p className="font-mono text-xs uppercase tracking-widest mb-8" style={{ color: "var(--violet-500)" }}>The idea</p>
        <p className="font-display font-extrabold tracking-tight leading-[1.08] text-3xl sm:text-6xl" style={{ color: "var(--text-heading)" }}>
          {words.map((w, i) => <Word key={i} w={w} p={p} a={i / words.length} b={(i + 1.5) / words.length} />)}
        </p>
      </div>
    </section>
  );
}
