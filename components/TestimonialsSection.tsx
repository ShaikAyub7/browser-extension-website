"use client";
import { TESTIMONIALS } from "@/data";
import { useEffect, useRef } from "react";



function TestCard({ t }: { t: typeof TESTIMONIALS[0] }) {
  return (
    <div className="bg-white rounded-2xl p-6 w-72 flex-shrink-0 mx-2 border border-snow-200 shadow-card feature-card">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-9 h-9 rounded-xl flex items-center justify-center font-display font-bold text-xs"
          style={{background:t.bg,color:t.color}}>
          {t.avatar}
        </div>
        <div>
          <p className="font-display font-bold text-ink-900 text-sm">{t.name}</p>
          <p className="text-ink-400 text-xs font-mono">{t.handle}</p>
        </div>
        <div className="ml-auto flex gap-0.5">
          {Array.from({length:t.stars}).map((_,i) => <span key={i} className="text-amber-400 text-xs">★</span>)}
        </div>
      </div>
      <p className="text-ink-600 text-sm leading-relaxed overflow-clip">"{t.text}"</p>
    </div>
  );
}

export default function TestimonialsSection() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("visible")),
      { threshold: 0.1 }
    );
    ref.current?.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="relative py-28 overflow-hidden bg-white">
      <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-snow-50 to-transparent pointer-events-none"/>
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-snow-50 to-transparent pointer-events-none"/>

      <div className="text-center mb-14 px-6 reveal">
        <div className="pill mx-auto mb-5"> What users say</div>
        <h2 className="font-display font-extrabold text-4xl md:text-5xl text-ink-900">
          From the Edge Add-on
        </h2>
      </div>
 <div className="max-w-7xl mx-auto px-6 overflow-hidden">
      <div className="flex overflow mb-6 ">
        <div className="marquee-track flex">
          {[...TESTIMONIALS,...TESTIMONIALS].map((t,i) => <TestCard key={i} t={t}/>)}
        </div>
      </div>

      <div className="flex mt-5">
        <div className="flex" style={{animation:"marquee 34s linear infinite reverse",whiteSpace:"nowrap"}}>
          {[...TESTIMONIALS.slice(3),...TESTIMONIALS.slice(3)].map((t,i) => <TestCard key={i} t={t}/>)}
        </div>
      </div></div>
    </section>
  );
}
