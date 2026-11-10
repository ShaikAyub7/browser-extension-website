"use client";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Pause, Play } from "lucide-react";

const S = [
  { k: "Track", c: "Every tab, timed automatically." },
  { k: "Limit", c: "Cap distracting sites. Block at the limit." },
  { k: "Focus", c: "Pomodoro sessions that lock you in." },
  { k: "Report", c: "Your focus score, every week." },
];
const D = 4, TOTAL = D * S.length;
const SITES: [string, number][] = [["github.com", 78], ["youtube.com", 52], ["docs.google.com", 34], ["reddit.com", 18]];
const Ring = ({ p, children }: { p: number; children: React.ReactNode }) => (
  <div className="relative w-44 h-44">
    <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
      <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(255,255,255,.12)" strokeWidth="7" />
      <circle cx="50" cy="50" r="42" fill="none" stroke="url(#g)" strokeWidth="7" strokeLinecap="round" strokeDasharray={264} strokeDashoffset={264 * (1 - p)} />
      <defs><linearGradient id="g"><stop offset="0" stopColor="#34D399" /><stop offset="1" stopColor="#84CC16" /></linearGradient></defs>
    </svg>
    <div className="absolute inset-0 grid place-items-center text-center text-white">{children}</div>
  </div>
);

function Scene({ i, p }: { i: number; p: number }) {
  const e = Math.min(1, p * 1.5);
  if (i === 0) return (
    <div className="w-full max-w-sm space-y-4">
      {SITES.map(([s, w]) => (
        <div key={s}><div className="flex justify-between text-sm text-white/80"><span>{s}</span><span className="font-mono">{Math.round(w * e * 1.6)}m</span></div>
          <div className="h-2.5 rounded-full bg-white/10 mt-1"><div className="h-full rounded-full" style={{ width: `${w * e}%`, background: "linear-gradient(90deg,#34D399,#84CC16)" }} /></div></div>
      ))}
    </div>);
  if (i === 1) return (
    <Ring p={Math.min(1, p / 0.7)}>
      {p > 0.7 ? <div><div className="font-display font-extrabold text-xl">BLOCKED</div><div className="text-xs text-white/60">youtube.com</div></div>
        : <div><div className="font-mono text-3xl font-bold">{Math.round(Math.min(1, p / 0.7) * 30)}m</div><div className="text-xs text-white/60">of 30m limit</div></div>}
    </Ring>);
  if (i === 2) {
    const sec = Math.round(1500 * (1 - p * 0.25));
    return <Ring p={p * 0.25 + 0.05}><div><div className="font-mono text-4xl font-bold">{String(Math.floor(sec / 60)).padStart(2, "0")}:{String(sec % 60).padStart(2, "0")}</div><div className="text-xs text-white/60">Focus session</div></div></Ring>;
  }
  return (
    <div className="text-center text-white">
      <div className="font-display font-extrabold text-7xl">{Math.round(86 * e)}</div>
      <div className="text-xs font-mono text-white/60">FOCUS SCORE</div>
      <div className="mt-5 flex items-end gap-2 h-16 justify-center">
        {[40, 62, 55, 80, 70, 92, 86].map((h, n) => <div key={n} className="w-5 rounded-t" style={{ height: `${h * e}%`, background: "linear-gradient(#34D399,#0EA5E9)" }} />)}
      </div>
    </div>);
}

export default function ProductFilm() {
  const [t, setT] = useState(0);
  const [play, setPlay] = useState(true);
  const bar = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!play) return;
    const id = setInterval(() => setT(x => (x + 0.05) % TOTAL), 50);
    return () => clearInterval(id);
  }, [play]);
  const i = Math.floor(t / D), p = (t % D) / D;
  const seek = (e: React.MouseEvent) => { const r = bar.current!.getBoundingClientRect(); setT(((e.clientX - r.left) / r.width) * TOTAL); };
  const fmt = (x: number) => `0:${String(Math.floor(x)).padStart(2, "0")}`;
  return (
    <div className="rounded-3xl overflow-hidden shadow-hover" style={{ background: "#06100C", border: "1px solid rgba(255,255,255,.12)" }}>
      <div className="flex items-center gap-1.5 px-4 py-3 bg-white/5">
        {["#FF5F57", "#FEBC2E", "#28C840"].map(c => <span key={c} className="w-3 h-3 rounded-full" style={{ background: c }} />)}
        <span className="ml-3 text-xs font-mono text-white/50">tabtime · product film</span>
      </div>
      <div className="relative aspect-video grid place-items-center overflow-hidden" style={{ background: "radial-gradient(60% 80% at 50% 0%, rgba(16,185,129,.25), transparent), #06100C" }}>
        <AnimatePresence mode="wait">
          <motion.div key={i} initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} className="flex flex-col items-center gap-6 px-6 w-full">
            <Scene i={i} p={p} />
            <p className="text-white/80 text-sm sm:text-base text-center">{S[i].c}</p>
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="flex items-center gap-4 px-4 py-3 bg-white/5 text-white">
        <button onClick={() => setPlay(v => !v)} aria-label={play ? "Pause" : "Play"}>{play ? <Pause size={18} /> : <Play size={18} />}</button>
        <div ref={bar} onClick={seek} className="relative flex-1 h-6 flex items-center cursor-pointer">
          <div className="w-full h-1.5 rounded-full bg-white/15 relative">
            <div className="absolute inset-y-0 left-0 rounded-full" style={{ width: `${(t / TOTAL) * 100}%`, background: "linear-gradient(90deg,#34D399,#84CC16)" }} />
            {S.map((_, n) => n > 0 && <span key={n} className="absolute top-0 h-full w-0.5 bg-black/60" style={{ left: `${(n / S.length) * 100}%` }} />)}
          </div>
        </div>
        <span className="font-mono text-xs text-white/60 w-20 text-right">{fmt(t)} / {fmt(TOTAL)}</span>
      </div>
    </div>
  );
}
