"use client";
import { FAQS } from "@/data";
import {  ShieldQuestion } from "lucide-react";
import { useEffect, useRef, useState } from "react";



export default function FAQSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState<number|null>(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("visible")),
      { threshold: 0.1 }
    );
    ref.current?.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="faq" ref={ref} className="relative py-22 px-6 section-tint">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-14 reveal">
          <div className="pill mx-auto mb-5">
            
            <h2 className="flex items-center  text-lg">
            <ShieldQuestion className="w-6 h-6 text-violet-500" />
            FAQ
              </h2>
              </div>
          <h2 className="font-display font-extrabold text-4xl md:text-5xl text-ink-900">
            Questions <span className="font-serif italic gradient-text">answered.</span>
          </h2>
        </div>

        <div className="space-y-3 reveal reveal-delay-1">
          {FAQS.map((faq, i) => (
            <div key={i}
              className={`bg-white rounded-2xl border transition-all duration-300 shadow-card ${
                open===i ? "border-violet-200 shadow-hover" : "border-snow-200"
              }`}>
              <button
                className="w-full px-6 py-5 flex items-center justify-between text-left group"
                onClick={() => setOpen(open===i ? null : i)}>
                <span className="font-display font-semibold text-ink-900 text-sm pr-4 group-hover:text-violet-600 transition-colors">
                  {faq.q}
                </span>
                <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                  open===i ? "bg-violet-100 text-violet-600" : "bg-snow-100 text-ink-400"
                }`}>
                  <svg className={`w-3 h-3 transition-transform duration-300 ${open===i?"rotate-180":""}`}
                    viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"/>
                  </svg>
                </div>
              </button>
              <div className={`faq-answer ${open===i?"open":""}`}>
                <p className="px-6 pb-5 text-ink-500 text-sm leading-relaxed">{faq.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
