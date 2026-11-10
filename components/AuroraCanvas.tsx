"use client";
import { useEffect, useRef } from "react";

const C = ["16,185,129", "132,204,22", "14,165,233", "52,211,153"];

export default function AuroraCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const cv = ref.current!, ctx = cv.getContext("2d")!;
    let w = 0, h = 0, raf = 0;
    const blobs = C.map((c, i) => ({ c, a: i * 1.7, s: 0.0004 + i * 0.00013, r: 0.35 + i * 0.05 }));
    const dots = Array.from({ length: 50 }, () => ({ x: Math.random(), y: Math.random(), v: 0.00005 + Math.random() * 0.0001 }));
    const size = () => { w = cv.width = cv.offsetWidth; h = cv.height = cv.offsetHeight; };
    size(); window.addEventListener("resize", size);
    const draw = (t: number) => {
      ctx.clearRect(0, 0, w, h);
      blobs.forEach(b => {
        const x = w * (0.5 + 0.4 * Math.cos(t * b.s + b.a)), y = h * (0.45 + 0.3 * Math.sin(t * b.s * 1.3 + b.a));
        const g = ctx.createRadialGradient(x, y, 0, x, y, w * b.r);
        g.addColorStop(0, `rgba(${b.c},.30)`); g.addColorStop(1, `rgba(${b.c},0)`);
        ctx.fillStyle = g; ctx.fillRect(0, 0, w, h);
      });
      dots.forEach(d => { d.y = (d.y - d.v * 16 + 1) % 1; ctx.fillStyle = "rgba(255,255,255,.35)"; ctx.fillRect(d.x * w, d.y * h, 2, 2); });
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", size); };
  }, []);
  return <canvas ref={ref} aria-hidden className="absolute inset-0 w-full h-full pointer-events-none" />;
}
