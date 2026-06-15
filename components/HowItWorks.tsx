"use client";
import { STEPS } from "@/data";
import { useEffect, useRef, useState } from "react";



export default function HowItWorks() {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const ActiveIcon = STEPS[active].icon;

  useEffect(() => {
    const id = setInterval(() => setActive((p) => (p + 1) % STEPS.length), 3000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("visible")),
      { threshold: 0.1, rootMargin:"0px 0px -40px 0px" }
    );
    ref.current?.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="how-it-works" ref={ref} className="relative py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16 reveal">
          <div className="pill mx-auto mb-5">↓ How it works</div>
          <h2 className="font-display font-extrabold text-4xl md:text-5xl  leading-tight">
            Up and running in{" "}
            <span className="font-serif italic gradient-text">30 seconds.</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div className="space-y-3 reveal reveal-delay-1">
            {STEPS.map((s, i) => {
              const Icon = s.icon;
              return <button key={s.num} onClick={() => setActive(i)}
                className={`w-full text-left rounded-2xl p-5 transition-all duration-300 border ${
                  active === i
                    ? " border-snow-300 shadow-hover"
                    : "bg-snow-50 border-transparent hover:border-snow-300 hover:shadow-card"
                }`}>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center text-lg flex-shrink-0 transition-all"
                    style={active===i ? {background:s.bg,boxShadow:`0 0 0 3px ${s.color}20`} : {background:"#F1F0F7"}}>
                    <Icon className="w-5 h-5" style={active===i ? {color:s.color} : {color:"#C8C2D1"}}/>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-mono text-[10px] text-ink-400">{s.num}</span>
                      <h3 className="font-display font-bold  text-sm">{s.title}</h3>
                    </div>
                    <p className=" text-sm leading-relaxed">{s.desc}</p>
                    {active===i && (
                      <p className="mt-2 text-[11px] font-mono text-ink-400 bg-snow-100 rounded-lg px-3 py-1.5 inline-block border border-snow-300">
                        {s.detail}
                      </p>
                    )}
                  </div>
                </div>
              </button>
})}
          </div>

          <div className="reveal reveal-delay-2 flex justify-center">
            <div className="relative w-full max-w-xs">
              <div className="absolute inset-0 bg-violet-100 rounded-3xl blur-3xl opacity-40"/>
              <div className=" rounded-3xl p-8 shadow-card border border-snow-200 relative">
                <div className="flex justify-center mb-6">
                  <div className="relative w-32 h-32">
                    <svg viewBox="0 0 120 120" className="w-full h-full -rotate-90">
                      <circle cx="60" cy="60" r="50" fill="none" stroke="#E4E2F0" strokeWidth="8"/>
                      <circle cx="60" cy="60" r="50" fill="none"
                        stroke={STEPS[active].color} strokeWidth="8" strokeLinecap="round"
                        strokeDasharray={`${((active+1)/4)*314.16} 314.16`}
                        style={{transition:"stroke-dasharray 0.6s ease, stroke 0.4s ease"}}/>
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <ActiveIcon className="w-8 h-8 text-3xl" style={{color:STEPS[active].color}} />
                      <span className="font-mono text-[10px] text-ink-400 mt-1">Step {active+1}/4</span>
                    </div>
                  </div>
                </div>

                <h3 className="font-display font-bold  text-xl text-center mb-2">{STEPS[active].title}</h3>
                <p className=" text-sm text-center leading-relaxed">{STEPS[active].desc}</p>

                <div className="flex justify-center gap-2 mt-5">
                  {STEPS.map((_, i) => (
                    <button key={i} onClick={() => setActive(i)}
                      className="h-2 rounded-full transition-all duration-300"
                      style={i===active
                        ? {background:STEPS[active].color, width:"20px"}
                        : {background:"#CCC8E0", width:"8px"}}/>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
