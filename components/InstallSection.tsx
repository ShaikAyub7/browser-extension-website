"use client";
import { useEffect, useRef } from "react";

export default function InstallSection() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("visible")),
      { threshold: 0.2 }
    );
    ref.current?.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="install" ref={ref} className="relative py-28 px-6 overflow-hidden">
      {/* Glow blobs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-violet-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="glass rounded-3xl p-12 md:p-16 text-center reveal border border-violet-500/20" style={{ boxShadow: "0 0 80px rgba(139,92,246,0.15)" }}>
          {/* Icon */}
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-violet-500 to-violet-800 flex items-center justify-center mx-auto mb-6 shadow-lg glow-violet">
            <svg viewBox="0 0 24 24" fill="white" className="w-10 h-10">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z"/>
              <path d="M12 2a10 10 0 100 20A10 10 0 0012 2zm-.5 14.5v-9l6 4.5-6 4.5z"/>
            </svg>
          </div>

          <h2 className="font-display font-extrabold text-4xl md:text-5xl text-white mb-4 leading-tight">
            Start tracking in
            <br />
            <span className="gradient-text">30 seconds.</span>
          </h2>
          <p className="text-slate-400 text-lg mb-8 max-w-md mx-auto">
            Free forever. No sign-up. Your data never leaves your device.
          </p>

          {/* Install button */}
          <a
            href="https://chrome.google.com/webstore"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary inline-flex items-center gap-3 px-10 py-4 rounded-2xl text-white font-display font-bold text-lg mb-6"
          >
            <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z"/>
            </svg>
            Add to Chrome — It's Free
          </a>

          <p className="text-xs text-slate-600 font-mono mb-8">
            v3.4.6 · Chrome & Chromium-based browsers · Manifest V3
          </p>

          {/* Trust badges */}
          <div className="flex flex-wrap items-center justify-center gap-6">
            {[
              { icon: "🔒", label: "100% private" },
              { icon: "⚡", label: "Zero performance impact" },
              { icon: "🆓", label: "Free forever" },
              { icon: "🧩", label: "Manifest V3" },
            ].map((b) => (
              <div key={b.label} className="flex items-center gap-1.5 text-slate-500 text-sm">
                <span>{b.icon}</span>
                <span>{b.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
