"use client";
import { useEffect, useRef } from "react";
import Link from "next/link";
import { Calendar, Notebook, ShieldEllipsis, User } from "lucide-react";

const UPDATES = [
  {
    version: "3.4.6",
    date: "May 28 2026",
    badge: "latest",
    badgeColor: "#10B981",
    badgeBg: "rgba(16,185,129,0.12)",
    icon: ShieldEllipsis,
    title: "Streak Shield + smarter AI suggestions",
    items: [
      "Earn a Streak Shield every 7 days — use it to protect your chain",
      "AI now suggests personalized limits from your 14-day average",
      "Fixed GMT+5:30 timezone midnight-reset bug",
    ],
  },
  {
    version: "3.4.0",
    date: "Apr 14 2026",
    badge: "major",
    badgeColor: "#7C3AED",
    badgeBg: "rgba(124,58,237,0.12)",
    icon: User,
    title: "AI Assistant — chat with your data",
    items: [
      "Natural language chat about your browsing habits",
      "Bring your own Anthropic API key — stays on your device",
      "Analytics tab redesigned with 7-day, 30-day & all-time views",
    ],
  },
  {
    version: "3.3.0",
    date: "Feb 22 2026",
    badge: "feature",
    badgeColor: "#3B82F6",
    badgeBg: "rgba(59,130,246,0.12)",
    icon:Calendar,
    title: "Scheduled work limits",
    items: [
      "Stricter site limits during work hours (9–5 default, configurable)",
      "Different caps for work vs leisure time windows",
      "Heatmap now shows 35 days with hover tooltips",
    ],
  },
];

export default function ChangelogStrip() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const obs = new IntersectionObserver(
      (e) => e.forEach((en) => en.isIntersecting && en.target.classList.add("visible")),
      { threshold: 0.05 }
    );
    ref.current?.querySelectorAll(".reveal").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={ref} className="relative py-24 section-base overflow-hidden">
      <div className="max-w-5xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4 reveal">
          <div>
            <div className="pill mb-5">
                <Notebook className="w-4 h-4 mr-1" />
                Changelog</div>
            <h2 className="font-display font-extrabold text-4xl md:text-5xl" style={{ color: "var(--text-heading)" }}>
              Always getting{" "}
              <span className="gradient-text italic font-serif">better.</span>
            </h2>
          </div>
          <Link
            href="/whats-new"
            className="btn-secondary px-5 py-2.5 rounded-xl text-sm font-bold font-display self-start md:self-auto flex items-center gap-2"
          >
            Full changelog
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          </Link>
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div
            className="absolute left-[22px] top-4 bottom-4 w-px hidden md:block"
            style={{ background: "linear-gradient(180deg, #7C3AED, transparent)" }}
          />

          <div className="space-y-6">
            {UPDATES.map((u, i) => {
                const Icon = u.icon;
            return  <div
                key={u.version}
                className={`reveal reveal-delay-${i + 1} flex gap-6 items-start`}
              >
                {/* Dot */}
                <div
                  className="hidden md:flex w-11 h-11 rounded-xl items-center justify-center text-lg flex-shrink-0 relative z-10"
                  style={{ background: u.badgeBg, border: `1px solid ${u.badgeColor}30` }}
                >
                    <Icon className="w-5 h-5" style={{ color: u.badgeColor }} />
                </div>

                {/* Card */}
                <div
                  className="flex-1 rounded-2xl p-6 transition-all hover:translate-y-[-2px]"
                  style={{
                    background: "var(--card-bg)",
                    border: "1px solid var(--border)",
                    boxShadow: "var(--card-shadow)",
                    transitionProperty: "transform, box-shadow",
                    transitionDuration: "0.25s",
                  }}
                >
                  <div className="flex flex-wrap items-center gap-3 mb-3">
                    <span className="font-mono font-bold text-sm" style={{ color: "var(--text-heading)" }}>
                      v{u.version}
                    </span>
                    <span
                      className="text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wide"
                      style={{ background: u.badgeBg, color: u.badgeColor }}
                    >
                      {u.badge}
                    </span>
                    <span className="text-xs font-mono ml-auto" style={{ color: "var(--text-faint)" }}>
                      {u.date}
                    </span>
                  </div>

                  <h3 className="font-display font-bold text-base mb-3" style={{ color: "var(--text-heading)" }}>
                    {u.title}
                  </h3>

                  <ul className="space-y-1.5">
                    {u.items.map((item, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm" style={{ color: "var(--text-body)" }}>
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: u.badgeColor }} />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
})}
          </div>
        </div>
      </div>
    </section>
  );
}