"use client";
import { FEATURES } from "@/data";
import { useEffect, useRef } from "react";



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
          <h2 className="font-display font-extrabold text-4xl md:text-5xl text-ink-900 leading-tight">
            A full productivity stack,<br/>
            <span className="font-serif italic gradient-text">inside one tiny popup.</span>
          </h2>
          <p className="mt-4 text-ink-500 text-lg max-w-xl mx-auto">
            8 powerful features. Zero subscriptions. Completely private — all data lives in your browser.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {FEATURES.map((f, i) => (
            <div key={f.title}
              className={`feature-card p-6 reveal reveal-delay-${(i % 4) + 1}`}>
              {/* <div className="w-11 h-11 rounded-xl flex items-center justify-center text-xl mb-4"
                style={{background: f.bg}}>
                {f.icon}
              </div> */}
              <span className="inline-block text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full mb-3 border"
                style={{color:f.accent,background:`${f.accent}12`,borderColor:`${f.accent}28`}}>
                {f.tag}
              </span>
              <h3 className="font-display font-bold text-ink-900 text-[15px] mb-2">{f.title}</h3>
              <p className="text-ink-500 text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
