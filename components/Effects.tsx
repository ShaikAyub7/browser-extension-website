"use client";
import { useEffect, useRef } from "react";

export default function Effects() {
  const bar = useRef<HTMLDivElement>(null);
  const glow = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const mv = (e: MouseEvent) => { if (glow.current) glow.current.style.transform = `translate(${e.clientX - 250}px,${e.clientY - 250}px)`; };
    const sc = () => {
      const h = document.documentElement;
      if (bar.current) bar.current.style.transform = `scaleX(${h.scrollTop / Math.max(1, h.scrollHeight - h.clientHeight)})`;
    };
    window.addEventListener("mousemove", mv); window.addEventListener("scroll", sc, { passive: true });
    return () => { window.removeEventListener("mousemove", mv); window.removeEventListener("scroll", sc); };
  }, []);
  return (
    <>
      <div ref={bar} className="fixed top-0 left-0 right-0 h-[3px] z-[110] origin-left scale-x-0" style={{ background: "var(--violet-500)" }} />
      <div ref={glow} aria-hidden className="pointer-events-none fixed top-0 left-0 z-0 hidden md:block w-[500px] h-[500px] rounded-full"
        style={{ background: "radial-gradient(circle, rgba(16,185,129,0.10), transparent 65%)", transition: "transform .15s ease-out" }} />
    </>
  );
}
