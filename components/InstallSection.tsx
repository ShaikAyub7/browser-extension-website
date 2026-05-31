"use client";
import Image from "next/image";
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
    <section id="install" ref={ref} className="relative py-28 px-6 overflow-hidden section-violet">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[360px] bg-violet-200 rounded-full blur-3xl opacity-40 pointer-events-none"/>

      <div className="max-w-3xl mx-auto relative z-10">
        <div className="bg-white rounded-3xl p-12 md:p-16 text-center shadow-[0_20px_80px_rgba(124,58,237,0.14)] border border-violet-200 reveal">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br  flex items-center justify-center mx-auto mb-6 shadow-violet">
            <Image src="/image.png" alt="TabTime Logo" width={32} height={32} />
          </div>

          <h2 className="font-display font-extrabold text-4xl md:text-5xl text-ink-900 mb-4 leading-tight">
            Start tracking in<br/>
            <span className="font-serif italic gradient-text">30 seconds.</span>
          </h2>
          <p className="text-ink-500 text-lg mb-8 max-w-md mx-auto">
            Free forever. No sign-up. Your data never leaves your device.
          </p>

          <a href="https://microsoftedge.microsoft.com/addons/detail/tab-time-tracker/aoecofhfffbfnkekppdgicmnfjmfdmoe" target="_blank" rel="noopener noreferrer"
            className="btn-primary inline-flex items-center gap-3 px-10 py-4 rounded-2xl font-display font-bold text-lg mb-6">
            Add to Edge — It's Free
          </a>

          <p className="text-xs font-mono text-ink-400 mb-8">
            v3.4.6 · Edge & Chromium-based browsers · Manifest V3
          </p>

          <div className="flex flex-wrap items-center justify-center gap-6">
            {[
              {icon:"🔒",label:"100% private"},
              {icon:"⚡",label:"Zero performance impact"},
              {icon:"🆓",label:"Free forever"},
              {icon:"🧩",label:"Manifest V3"},
            ].map((b) => (
              <div key={b.label} className="flex items-center gap-1.5 text-ink-500 text-sm">
                {/* <span>{b.icon}</span> */}
                <span>{b.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
