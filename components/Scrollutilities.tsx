"use client";
import { useEffect, useState } from "react";

export default function ScrollUtilities() {
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setProgress(pct);
      setVisible(scrollTop > 600);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <div
        className="fixed top-0 left-0 z-[60] h-0.5 transition-all duration-100"
        style={{
          width: `${progress}%`,
          background: "linear-gradient(90deg,#6025C9,#7C3AED,#9B6EFF)",
        }}
        aria-hidden
      />

      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Scroll to top"
        className="fixed bottom-6 right-6 z-50 w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300 shadow-violet"
        style={{
          background: "linear-gradient(135deg,#6025C9,#7C3AED)",
          opacity: visible ? 1 : 0,
          pointerEvents: visible ? "auto" : "none",
          transform: visible ? "scale(1) translateY(0)" : "scale(0.8) translateY(16px)",
        }}
      >
        <svg className="w-5 h-5 text-white" viewBox="0 0 20 20" fill="none">
          <path d="M10 15V5M5 10l5-5 5 5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
    </>
  );
}