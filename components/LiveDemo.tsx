"use client";
import { Bird, Figma, FileStack, Gamepad, Github, HandHelpingIcon, Medal, Play, X, Youtube } from "lucide-react";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";

const DEMO_SITES = [
  { name: "youtube.com", emoji: Youtube, color: "#EF4444", time: 134, limit: 120 },
  { name: "twitter.com", emoji: X, color: "#3B82F6", time: 63, limit: 90 },
  { name: "github.com", emoji: Github, color: "#10B981", time: 47, limit: 180 },
  { name: "reddit.com", emoji: FileStack, color: "#F97316", time: 38, limit: 60 },
  { name: "figma.com", emoji: Figma, color: "#8B5CF6", time: 22, limit: 120 },
];

function fmt(mins: number) {
  if (mins < 60) return `${mins}m`;
  return `${Math.floor(mins / 60)}h ${mins % 60}m`;
}

export default function LiveDemo() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [tab, setTab] = useState<"summary" | "analytics" | "focus">("summary");
  const [sites, setSites] = useState(DEMO_SITES);
  const [focusActive, setFocusActive] = useState(false);
  const [focusSecs, setFocusSecs] = useState(25 * 60);
  const [streak, setStreak] = useState(7);
  const [notification, setNotification] = useState<string | null>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (e) => e.forEach((en) => en.isIntersecting && setVisible(true)),
      { threshold: 0.1 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  // Live tick: add time to youtube every 3s
  useEffect(() => {
    if (!visible) return;
    const id = setInterval(() => {
      setSites((prev) =>
        prev.map((s, i) =>
          i === 0 ? { ...s, time: s.time + 1 } : s
        )
      );
    }, 3000);
    return () => clearInterval(id);
  }, [visible]);

  // Focus timer countdown
  useEffect(() => {
    if (!focusActive) return;
    const id = setInterval(() => {
      setFocusSecs((s) => {
        if (s <= 1) {
          setFocusActive(false);
          setStreak((x) => x + 1);
          showNotif("🎉 Focus session complete! Streak +1");
          return 25 * 60;
        }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [focusActive]);

  const showNotif = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  const addLimit = (idx: number) => {
    setSites((prev) =>
      prev.map((s, i) => (i === idx ? { ...s, limit: s.limit - 10 } : s))
    );
    showNotif(`⏱ Limit reduced for ${sites[idx].name}`);
  };

  const total = sites.reduce((a, s) => a + s.time, 0);
  const focusMins = Math.floor(focusSecs / 60);
  const focusSecRem = focusSecs % 60;
  const score = Math.max(0, 100 - Math.round((sites.filter((s) => s.time > s.limit).length / sites.length) * 60));

  return (
    <section ref={ref} className="relative py-24 overflow-hidden section-base">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-14">
          <div className="pill mx-auto mb-5">
            <Gamepad className="w-4 h-4 mr-1" />
             Interactive Demo</div>
          <h2 className="font-display font-extrabold text-4xl md:text-5xl mb-4" style={{ color: "var(--text-heading)" }}>
            Try it{" "}
            <span className="gradient-text italic font-serif">right now</span>
          </h2>
          <p style={{ color: "var(--text-muted)" }}>
            This is a live simulation — times update in real time. Click around!
          </p>
        </div>

        <div
          className={`flex justify-center transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
        >
          <div
            className="rounded-3xl w-full max-w-sm shadow-2xl border overflow-hidden"
            style={{
              background: "var(--card-bg)",
              borderColor: "var(--border-violet)",
              boxShadow: "0 20px 60px rgba(124,58,237,0.18)",
            }}
          >
            {/* Header */}
            <div className="px-5 pt-5 pb-3" style={{ borderBottom: "1px solid var(--border)" }}>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-1">
                  <div className="w-5 h-5 rounded-lg bg-gradient-to-br flex items-center justify-center text-[10px]">
<Image src="/image.png" alt="Tab Time Tracker" width={16} height={16} />

                  </div>
                  <span className="font-display font-bold text-sm" style={{ color: "var(--text-heading)" }}>
                    Tab Time Tracker
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-xs font-mono" style={{ color: "var(--text-faint)" }}>🔥 {streak} streak</span>
                </div>
              </div>

              {/* Tabs */}
              <div className="flex gap-1">
                {(["summary", "analytics", "focus"] as const).map((t) => (
                  <button
                    key={t}
                    onClick={() => setTab(t)}
                    className="text-[10px] px-2.5 py-1 rounded-full font-semibold capitalize transition-all"
                    style={{
                      background: tab === t ? "#7C3AED" : "var(--bg-muted)",
                      color: tab === t ? "#fff" : "var(--text-muted)",
                    }}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* Notification */}
            {notification && (
              <div
                className="mx-4 mt-3 px-3 py-2 rounded-xl text-xs font-semibold text-center"
                style={{ background: "var(--violet-50)", color: "var(--violet-600)", border: "1px solid var(--border-violet)" }}
              >
                {notification}
              </div>
            )}

            {/* Content */}
            <div className="p-5">
              {tab === "summary" && (
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-[10px] font-mono uppercase tracking-widest" style={{ color: "var(--text-faint)" }}>Today</p>
                      <p className="font-display font-extrabold text-3xl" style={{ color: "var(--text-heading)" }}>{fmt(total)}</p>
                    </div>
                    <div
                      className="text-center px-3 py-1.5 rounded-xl"
                      style={{ background: score >= 80 ? "#ECFDF5" : score >= 60 ? "#FFF7ED" : "#FEF2F2" }}
                    >
                      <p className="text-lg font-extrabold font-display" style={{ color: score >= 80 ? "#10B981" : score >= 60 ? "#F97316" : "#EF4444" }}>
                        {score}
                      </p>
                      <p className="text-[9px] font-mono" style={{ color: "var(--text-faint)" }}>score</p>
                    </div>
                  </div>

                  <div className="space-y-2.5">
                    {sites.map((s, i) => {
                      const over = s.time > s.limit;
                      const pct = Math.min(100, Math.round((s.time / s.limit) * 100));
                      const Icon = s.emoji;
                      return (
                        <div key={s.name}>
                          <div className="flex items-center justify-between mb-1">
                            <div className="flex items-center gap-1.5">
                              <span className="text-xs">
                                <Icon className="text-center" />
                              </span>
                              <span className="text-[11px] font-medium" style={{ color: "var(--text-body)" }}>{s.name}</span>
                              {over && <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-red-100 text-red-600 font-bold">OVER</span>}
                            </div>
                            <div className="flex items-center gap-1.5">
                              <span className="text-[11px] font-mono" style={{ color: "var(--text-muted)" }}>{fmt(s.time)}/{fmt(s.limit)}</span>
                              <button
                                onClick={() => addLimit(i)}
                                className="text-[9px] px-1.5 py-0.5 rounded-full transition-all hover:scale-110"
                                style={{ background: "var(--violet-50)", color: "#7C3AED", border: "1px solid var(--border-violet)" }}
                                title="Reduce limit by 10m"
                              >
                                −
                              </button>
                            </div>
                          </div>
                          <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "var(--bg-muted)" }}>
                            <div
                              className="h-full rounded-full transition-all duration-1000"
                              style={{
                                width: `${pct}%`,
                                background: over
                                  ? "#EF4444"
                                  : `linear-gradient(90deg, ${s.color}99, ${s.color})`,
                              }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <p className="text-[9px] font-mono mt-3 text-center" style={{ color: "var(--text-faint)" }}>
                    ↑ Times update live · click − to tighten limits
                  </p>
                </div>
              )}

              {tab === "analytics" && (
                <div>
                  <p className="text-xs font-semibold mb-3" style={{ color: "var(--text-muted)" }}>7-day activity</p>
                  <div className="flex items-end gap-1 h-24 mb-4">
                    {[60, 90, 75, 130, 55, 100, total].map((h, i) => (
                      <div key={i} className="flex-1 flex flex-col items-center gap-1">
                        <div
                          className="w-full rounded-t-md transition-all duration-500"
                          style={{
                            height: `${Math.round((h / 140) * 80)}px`,
                            background:
                              i === 6
                                ? "linear-gradient(180deg,#7C3AED,#9B6EFF)"
                                : "var(--bg-muted)",
                            border: i === 6 ? "none" : "1px solid var(--border)",
                          }}
                        />
                        <span className="text-[8px] font-mono" style={{ color: "var(--text-faint)" }}>
                          {["M", "T", "W", "T", "F", "S", "T"][i]}
                        </span>
                      </div>
                    ))}
                  </div>

                  <p className="text-xs font-semibold mb-2" style={{ color: "var(--text-muted)" }}>Heatmap (35 days)</p>
                  <div className="grid gap-0.5" style={{ gridTemplateColumns: "repeat(7,1fr)" }}>
                    {Array.from({ length: 35 }, (_, i) => {
                      const lvl = [0, 1, 2, 3, 4, 3, 2, 4, 1, 0, 3, 4, 2, 1, 3, 4, 0, 2, 3, 1, 4, 2, 3, 0, 1, 3, 4, 2, 1, 0, 3, 2, 4, 1, 3][i];
                      const colors = ["var(--heat-0)", "var(--heat-1)", "var(--heat-2)", "var(--heat-3)", "var(--heat-4)"];
                      return (
                        <div
                          key={i}
                          className="aspect-square rounded-sm heatmap-cell"
                          style={{ background: colors[lvl] }}
                          title={`${lvl * 60 + 30}m`}
                        />
                      );
                    })}
                  </div>
                  <p className="text-[9px] font-mono mt-2 text-center" style={{ color: "var(--text-faint)" }}>
                    Hover cells to see daily time
                  </p>
                </div>
              )}

              {tab === "focus" && (
                <div className="text-center">
                  <div
                    className="w-32 h-32 rounded-full mx-auto mb-5 flex flex-col items-center justify-center border-4 transition-all"
                    style={{
                      borderColor: focusActive ? "#7C3AED" : "var(--border)",
                      boxShadow: focusActive ? "0 0 32px rgba(124,58,237,0.3)" : "none",
                      background: "var(--bg-soft)",
                    }}
                  >
                    <span className="font-display font-extrabold text-2xl" style={{ color: "var(--text-heading)" }}>
                      {String(focusMins).padStart(2, "0")}:{String(focusSecRem).padStart(2, "0")}
                    </span>
                    <span className="text-[10px] font-mono" style={{ color: "var(--text-faint)" }}>
                      {focusActive ? "focusing..." : "ready"}
                    </span>
                  </div>

                  <button
                    onClick={() => {
                      setFocusActive(!focusActive);
                      if (!focusActive) showNotif("🍅 Focus session started! Distractions blocked.");
                    }}
                    className={`px-8 py-3 rounded-xl font-display font-bold text-sm mb-4 transition-all ${
                      focusActive ? "btn-secondary" : "btn-primary"
                    }`}
                  >
                    {focusActive ? "⏸ Pause" 
                    
                    :
                    <p className="flex items-center gap-2 justify-center">
                    
                    <Play/>Start Focus
                    </p>
                    }
                  </button>

                  <div className="flex gap-2 justify-center">
                    {[25, 45, 60].map((m) => (
                      <button
                        key={m}
                        onClick={() => { setFocusSecs(m * 60); setFocusActive(false); }}
                        className="text-[10px] px-2.5 py-1 rounded-full font-semibold transition-all"
                        style={{
                          background: focusMins === m && !focusActive ? "#7C3AED" : "var(--bg-muted)",
                          color: focusMins === m && !focusActive ? "#fff" : "var(--text-muted)",
                        }}
                      >
                        {m}m
                      </button>
                    ))}
                  </div>

                  <p className="text-[9px] font-mono mt-4" style={{ color: "var(--text-faint)" }}>
                    {focusActive ? "Blocking: youtube.com, twitter.com, reddit.com" : "Start to block distracting sites"}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
