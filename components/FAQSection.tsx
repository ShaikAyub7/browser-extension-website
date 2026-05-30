"use client";
import { useEffect, useRef, useState } from "react";

const FAQS = [
  {
    q: "Is Tab Time Tracker really free?",
    a: "Yes — completely free, no premium tier, no subscription, no ads inside the extension. The extension will always be free.",
  },
  {
    q: "Does it send my data to any server?",
    a: "No. All data is stored in Chrome's local storage on your device. Nothing leaves your browser unless you use the AI chat feature, which calls the Anthropic API with your own API key.",
  },
  {
    q: "Will it slow down my browser?",
    a: "No. The tracking runs in a lightweight service worker that fires every second and writes < 100 bytes to storage. There is no measurable performance impact.",
  },
  {
    q: "What permissions does it need?",
    a: "It requests storage (to save your data), activeTab & tabs (to see which site is active), notifications (for limit alerts), alarms (for the midnight cache reset), and scripting (for focus mode blocking). It does NOT request broad host permissions — only <all_urls> for the content script, which only reads the URL.",
  },
  {
    q: "How does the AI assistant work?",
    a: "The AI tab uses the Anthropic API. You provide your own API key in the settings. Your browsing summary is included in the prompt so the AI can give personalized advice — the key and data never leave your device except in the direct API call.",
  },
  {
    q: "Can I export my data?",
    a: "Yes. Go to Settings → Export data and download a CSV or JSON file containing your full browsing history stored locally.",
  },
  {
    q: "Does it track incognito tabs?",
    a: "Only if you explicitly enable the extension in incognito mode via Chrome's extension settings (chrome://extensions). It is disabled in incognito by default.",
  },
  {
    q: "How do streaks work?",
    a: "You earn a streak day by staying under your daily browsing limit. Miss a day and your streak resets. The streak counter is shown in the popup header and the Settings tab.",
  },
];

export default function FAQSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState<number | null>(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("visible")),
      { threshold: 0.1 }
    );
    ref.current?.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="faq" ref={ref} className="relative py-28 px-6">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-14 reveal">
          <span className="inline-block font-mono text-xs text-cyan-400 tracking-widest uppercase mb-4 bg-cyan-500/10 px-4 py-1.5 rounded-full border border-cyan-500/20">
            FAQ
          </span>
          <h2 className="font-display font-extrabold text-4xl md:text-5xl text-white">
            Questions answered.
          </h2>
        </div>

        <div className="space-y-3 reveal reveal-delay-1">
          {FAQS.map((faq, i) => (
            <div
              key={i}
              className={`glass rounded-2xl transition-all duration-300 ${open === i ? "border-violet-500/40" : "border-transparent hover:border-violet-500/20"} border`}
            >
              <button
                className="w-full px-6 py-5 flex items-center justify-between text-left group"
                onClick={() => setOpen(open === i ? null : i)}
              >
                <span className="font-display font-semibold text-white text-sm pr-4 group-hover:text-violet-300 transition-colors">
                  {faq.q}
                </span>
                <div
                  className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300"
                  style={open === i ? { background: "rgba(139,92,246,0.2)", color: "#A78BFA" } : { background: "rgba(255,255,255,0.05)", color: "#71717A" }}
                >
                  <svg className={`w-3 h-3 transition-transform duration-300 ${open === i ? "rotate-180" : ""}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </button>
              <div className={`faq-answer ${open === i ? "open" : ""}`}>
                <p className="px-6 pb-5 text-slate-400 text-sm leading-relaxed">{faq.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
