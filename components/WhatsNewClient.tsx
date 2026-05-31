"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

type ChangeKind = "new"|"improved"|"fixed"|"removed"|"security";
interface Change { kind: ChangeKind; text: string; }
interface Release {
  version: string; date: string; tag?: "latest"|"major"|"hotfix";
  headline: string; summary: string; changes: Change[]; highlight?: string;
}

const RELEASES: Release[] = [
  {
    version:"3.4.6", date:"May 28 2026", tag:"latest",
    headline:"Smarter AI suggestions & streak shields",
    summary:"This release polishes the AI assistant, adds a streak-shield consumable so one bad day doesn't break your chain, and fixes a handful of timezone edge-cases.",
    highlight:"Streak Shield",
    changes:[
      {kind:"new",     text:"Streak Shield: earn one shield every 7 days. Activate it to protect your streak when life happens."},
      {kind:"new",     text:"AI assistant now suggests personalised daily limits based on your 14-day average."},
      {kind:"improved",text:"AI prompt context now includes hourly breakdown, making suggestions significantly more accurate."},
      {kind:"improved",text:"Heatmap tooltip now shows exact minutes instead of a generic intensity label."},
      {kind:"fixed",   text:"Timezone bug that caused midnight reset to fire 1 hour early in GMT+5:30 (IST) regions."},
      {kind:"fixed",   text:"Focus mode occasionally failed to redirect already-open tabs — now blocked on activation."},
      {kind:"fixed",   text:"Streak counter showed incorrect value after manual date change in system clock."},
    ],
  },
  {
    version:"3.4.0", date:"Apr 14 2026", tag:"major",
    headline:"AI Assistant — chat with your data",
    summary:"The biggest release since v3.0. Tab Time Tracker now ships with a built-in AI chat panel powered by the Anthropic API. Ask it anything about your habits and get actionable advice.",
    highlight:"AI Assistant",
    changes:[
      {kind:"new",     text:"AI Assistant tab: natural language chat about your browsing data. Bring your own Anthropic API key."},
      {kind:"new",     text:"Context-aware prompts: daily summary, hourly breakdown, top 10 sites, and productivity score are all injected automatically."},
      {kind:"new",     text:"Suggested questions shown on first open to help new users explore the feature."},
      {kind:"new",     text:"API key stored securely in chrome.storage.local, never transmitted to our servers."},
      {kind:"improved",text:"Analytics tab redesigned with tabbed view: 7-day, 30-day, and all-time charts."},
      {kind:"improved",text:"Productivity score algorithm updated — now weights recency and penalises late-night sessions."},
      {kind:"fixed",   text:"Bar chart x-axis labels overlapping on narrow popup widths."},
      {kind:"fixed",   text:"Per-site limit notification sometimes fired twice for the same domain."},
    ],
  },
  {
    version:"3.3.2", date:"Mar 02 2026", tag:"hotfix",
    headline:"Hotfix: notification loop on Chrome 124",
    summary:"Chrome 124 changed how alarms fire when the browser is throttled. This caused limit notifications to loop indefinitely. Patched within 6 hours of reports.",
    changes:[
      {kind:"fixed",text:"Notification loop caused by Chrome 124 alarm throttling — de-duplicated by storing last-notified timestamp."},
      {kind:"fixed",text:"Edge case where the popup showed NaN% if a site was visited for < 1 second."},
    ],
  },
  {
    version:"3.3.0", date:"Feb 17 2026",
    headline:"Scheduled work-hour limits",
    summary:"You can now set different browsing limits for work hours vs. leisure time. Pair this with a strict block list to build a real deep-work routine.",
    highlight:"Work-Hour Scheduling",
    changes:[
      {kind:"new",     text:"Work-hours schedule: configure start/end time and separate daily limit for that window."},
      {kind:"new",     text:"Quick-toggle in the popup header to temporarily suspend work-hour limits (max 30 min snooze)."},
      {kind:"new",     text:"Block list now supports wildcard patterns, e.g. *.reddit.com to block all subdomains."},
      {kind:"improved",text:"Settings page reorganised into labelled sections — much easier to navigate."},
      {kind:"improved",text:"Focus mode countdown now visible as a badge on the extension icon."},
      {kind:"fixed",   text:"Import from CSV failed silently when the file had Windows-style CRLF line endings."},
      {kind:"removed", text:"Legacy 'simple mode' toggle removed — all users now on the full UI."},
    ],
  },
  {
    version:"3.2.1", date:"Jan 09 2026",
    headline:"Export, CSV import & site labels",
    summary:"Data portability update. Export everything as JSON or CSV, import old data back, and label sites as Productive/Neutral/Distracting to power the productivity score.",
    changes:[
      {kind:"new",     text:"Export data as CSV or JSON from Settings → Export."},
      {kind:"new",     text:"Import CSV to restore a previous export or merge data from another device."},
      {kind:"new",     text:"Site labels: tag any domain as Productive, Neutral, or Distracting."},
      {kind:"new",     text:"Productivity score (0–100) visible on the Summary tab, with a 7-day trend arrow."},
      {kind:"improved",text:"All-time totals now shown alongside today's figures in the Summary tab."},
      {kind:"fixed",   text:"Ignore-list entries weren't being persisted after browser restart."},
    ],
  },
  {
    version:"3.1.0", date:"Nov 30 2025",
    headline:"35-day activity heatmap",
    summary:"Inspired by GitHub's contribution graph, the new heatmap gives you a bird's-eye view of your browsing intensity over the past 35 days.",
    highlight:"Activity Heatmap",
    changes:[
      {kind:"new",      text:"35-day heatmap on the Analytics tab. Hover any cell to see exact time for that day."},
      {kind:"new",      text:"Streak counter visible in the popup header and on the heatmap."},
      {kind:"improved", text:"Heatmap colour scale now adapts to your personal usage range, not a fixed scale."},
      {kind:"improved", text:"Summary tab loads 60% faster by lazy-loading the chart library."},
      {kind:"fixed",    text:"Bar chart sometimes showed yesterday's data after midnight reset."},
      {kind:"security", text:"Content script no longer reads page content — reduced to URL-only access."},
    ],
  },
  {
    version:"3.0.0", date:"Sep 08 2025", tag:"major",
    headline:"Full redesign — Manifest V3 & Pomodoro",
    summary:"Tab Time Tracker 3.0 is a ground-up rebuild for Chrome's Manifest V3. The popup UI is completely redesigned, Pomodoro focus mode ships for the first time.",
    highlight:"Pomodoro Focus Mode",
    changes:[
      {kind:"new",     text:"Rebuilt for Manifest V3 — service worker replaces background page."},
      {kind:"new",     text:"Pomodoro focus mode with 25 / 45 / 60 min presets and per-session site blocking."},
      {kind:"new",     text:"Per-site daily limits with browser notifications."},
      {kind:"new",     text:"Completely redesigned popup with Summary, Analytics, Focus, and Settings tabs."},
      {kind:"new",     text:"7-day and 30-day bar charts using Chart.js (bundled, no CDN dependency)."},
      {kind:"new",     text:"Ignore list: exclude internal company domains or localhost from tracking."},
      {kind:"improved",text:"Tracking accuracy improved — idle gaps > 60s are excluded automatically."},
      {kind:"improved",text:"Midnight reset is now alarm-based — no more missed resets."},
      {kind:"removed", text:"MV2 background.js and popup from v2.x — not compatible with new architecture."},
    ],
  },
  {
    version:"2.8.3", date:"Jun 21 2025",
    headline:"Final MV2 release",
    summary:"Last maintenance release on the Manifest V2 architecture before the 3.0 rebuild.",
    changes:[
      {kind:"fixed",   text:"Background page crashed on Chrome 115 due to deprecated chrome.tabs.onActivated argument shape."},
      {kind:"fixed",   text:"Total time occasionally double-counted when switching tabs faster than 500ms."},
      {kind:"improved",text:"Added deprecation notice prompting users to update to v3 when available."},
    ],
  },
];

const KIND_CONFIG: Record<ChangeKind,{label:string;color:string;bg:string;border:string;icon:string}> = {
  new:      {label:"New",      color:"#10B981",bg:"#ECFDF5",border:"#A7F3D0",icon:"✦"},
  improved: {label:"Improved", color:"#3B82F6",bg:"#EFF6FF",border:"#BFDBFE",icon:"↑"},
  fixed:    {label:"Fixed",    color:"#F97316",bg:"#FFF7ED",border:"#FED7AA",icon:"✓"},
  removed:  {label:"Removed",  color:"#EF4444",bg:"#FEF2F2",border:"#FECACA",icon:"−"},
  security: {label:"Security", color:"#8B5CF6",bg:"#F5F3FF",border:"#DDD6FE",icon:"🔒"},
};

const TAG_CONFIG = {
  latest:  {label:"Latest",  color:"#10B981",bg:"#ECFDF5",border:"#A7F3D0"},
  major:   {label:"Major",   color:"#7C3AED",bg:"#F5F3FF",border:"#DDD6FE"},
  hotfix:  {label:"Hotfix",  color:"#F97316",bg:"#FFF7ED",border:"#FED7AA"},
};

const ALL_KINDS: ChangeKind[] = ["new","improved","fixed","security","removed"];

function ChangeBadge({kind}:{kind:ChangeKind}) {
  const c = KIND_CONFIG[kind];
  return (
    <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold px-2 py-0.5 rounded-full flex-shrink-0 border"
      style={{color:c.color,background:c.bg,borderColor:c.border}}>
      {c.icon} {c.label}
    </span>
  );
}

function VersionTag({tag}:{tag:"latest"|"major"|"hotfix"}) {
  const c = TAG_CONFIG[tag];
  return (
    <span className="inline-block text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full border uppercase tracking-widest"
      style={{color:c.color,background:c.bg,borderColor:c.border}}>
      {c.label}
    </span>
  );
}

function ReleaseCard({release,index}:{release:Release;index:number}) {
  const ref = useRef<HTMLDivElement>(null);
  const isLatest = release.tag==="latest";

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("visible")),
      {threshold:0.06,rootMargin:"0px 0px -30px 0px"}
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  },[]);

  return (
    <div ref={ref} className="reveal relative grid md:grid-cols-[180px_1fr] gap-0 md:gap-10"
      style={{transitionDelay:`${Math.min(index*0.05,0.25)}s`}}>

      <div className="md:text-right pb-4 md:pb-0 md:pt-1 flex md:flex-col items-center md:items-end gap-3 md:gap-2">
        <div className="flex md:flex-col items-center md:items-end gap-2">
          <span className="font-display font-extrabold text-2xl text-ink-900">v{release.version}</span>
          {release.tag && <VersionTag tag={release.tag}/>}
        </div>
        <span className="text-xs text-ink-400 font-mono md:mt-1">{release.date}</span>
      </div>

      <div className="hidden md:block absolute left-[180px] top-0 bottom-0 w-10">
        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-violet-200 via-violet-100 to-transparent -translate-x-1/2"/>
        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-3.5 h-3.5 rounded-full border-2 transition-all"
          style={isLatest
            ? {background:"#7C3AED",borderColor:"#C4B5FD",boxShadow:"0 0 10px rgba(124,58,237,0.4)"}
            : {background:"#E4E2F0",borderColor:"#CCC8E0"}}/>
      </div>

      <div className={`bg-white rounded-2xl p-6 md:p-8 relative overflow-hidden feature-card border ${
        isLatest ? "border-violet-200 shadow-hover" : "border-snow-200 shadow-card"
      }`}>
        {isLatest && <div className="absolute -top-8 -right-8 w-32 h-32 bg-violet-100 rounded-full blur-2xl opacity-60 pointer-events-none"/>}

        <div className="mb-4">
          {release.highlight && (
            <span className="inline-block font-mono text-[10px] text-violet-600 tracking-widest uppercase mb-2 bg-violet-50 px-3 py-1 rounded-full border border-violet-200">
              ✦ {release.highlight}
            </span>
          )}
          <h2 className="font-display font-bold text-xl text-ink-900 leading-snug">{release.headline}</h2>
          <p className="text-ink-500 text-sm mt-2 leading-relaxed max-w-2xl">{release.summary}</p>
        </div>

        <ul className="space-y-2.5 mt-5 border-t border-snow-200 pt-5">
          {release.changes.map((c,i) => (
            <li key={i} className="flex items-start gap-3">
              <ChangeBadge kind={c.kind}/>
              <span className="text-ink-600 text-sm leading-relaxed">{c.text}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function StatStrip() {
  const total = RELEASES.reduce((a,r)=>a+r.changes.length,0);
  const newF  = RELEASES.reduce((a,r)=>a+r.changes.filter(c=>c.kind==="new").length,0);
  const fixed = RELEASES.reduce((a,r)=>a+r.changes.filter(c=>c.kind==="fixed").length,0);
  return (
    <div className="flex flex-wrap justify-center gap-4 mb-14">
      {[
        {label:"Versions",     value:RELEASES.length, color:"#7C3AED",bg:"#F5F3FF"},
        {label:"Total changes",value:total,           color:"#3B82F6",bg:"#EFF6FF"},
        {label:"New features", value:newF,            color:"#10B981",bg:"#ECFDF5"},
        {label:"Bugs squashed",value:fixed,           color:"#F97316",bg:"#FFF7ED"},
      ].map((s) => (
        <div key={s.label} className="bg-white rounded-2xl px-6 py-4 text-center min-w-[110px] shadow-card border border-snow-200">
          <p className="font-display font-extrabold text-2xl" style={{color:s.color}}>{s.value}</p>
          <p className="text-ink-400 text-xs mt-0.5">{s.label}</p>
        </div>
      ))}
    </div>
  );
}

function FilterBar({active,onChange}:{active:ChangeKind|null;onChange:(k:ChangeKind|null)=>void}) {
  return (
    <div className="flex flex-wrap gap-2 justify-center mb-12">
      <button onClick={()=>onChange(null)}
        className={`px-4 py-1.5 rounded-full text-xs font-mono font-bold border transition-all ${
          active===null ? "bg-violet-500 border-violet-500 text-white" : "bg-white border-snow-300 text-ink-500 hover:border-violet-300 hover:text-violet-600"
        }`}>
        All changes
      </button>
      {ALL_KINDS.map((k) => {
        const c = KIND_CONFIG[k];
        return (
          <button key={k} onClick={()=>onChange(active===k?null:k)}
            className="px-4 py-1.5 rounded-full text-xs font-mono font-bold border transition-all"
            style={active===k
              ? {background:c.color,borderColor:c.color,color:"#fff"}
              : {background:c.bg,borderColor:c.border,color:c.color}}>
            {c.icon} {c.label}
          </button>
        );
      })}
    </div>
  );
}

export default function WhatsNewClient() {
  const [filter, setFilter] = useState<ChangeKind|null>(null);
  const [search, setSearch] = useState("");

  const filtered = RELEASES.map((r) => ({
    ...r,
    changes: r.changes.filter((c) => {
      const okKind   = filter===null||c.kind===filter;
      const okSearch = search===""||c.text.toLowerCase().includes(search.toLowerCase())||r.headline.toLowerCase().includes(search.toLowerCase())||r.version.includes(search);
      return okKind && okSearch;
    }),
  })).filter((r) => r.changes.length>0||search==="");

  return (
    <>
      <Navbar/>
      <main className="min-h-screen bg-white">

        <section className="relative pt-32 pb-16 px-6 section-tint overflow-hidden">
          <div className="absolute inset-0 dot-grid bg-dot-grid bg-[size:28px_28px] opacity-50 pointer-events-none"/>
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-48 bg-violet-100 rounded-full blur-3xl opacity-60 pointer-events-none"/>

          <div className=" mx-auto text-center relative z-10">
            {/* <div className="w-full flex justify-between md:justify-center gap-5 mx-auto">

            <Link href="/" className="inline-flex items-center gap-2 text-violet-500 text-sm hover:text-violet-700 transition-colors mb-8 font-medium">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"/>
              </svg>
              Back to home
            </Link>

            <div className="pill  mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"/>
              Latest: v{RELEASES[0].version} — {RELEASES[0].date}
            </div>
            </div> */}

            <h1 className="font-display font-extrabold text-5xl md:text-6xl text-ink-900 leading-tight mb-4">
              What&apos;s{" "}
              <span className="font-serif italic gradient-text">new</span>
            </h1>
            <p className="text-ink-500 text-lg max-w-xl mx-auto">
              Every feature, fix, and improvement across all Tab Time Tracker releases — most recent first.
            </p>

            {/* <div className="relative mt-8 max-w-md mx-auto">
              <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 105 11a6 6 0 0012 0z"/>
              </svg>
              <input type="text" placeholder="Search releases…" value={search}
                onChange={(e)=>setSearch(e.target.value)}
                className="w-full bg-white rounded-xl pl-11 pr-4 py-3 text-sm text-ink-900 placeholder-ink-400 outline-none border border-snow-300 focus:border-violet-400 transition-colors shadow-card"
              />
              {search && (
                <button onClick={()=>setSearch("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-400 hover:text-ink-700">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
                  </svg>
                </button>
              )}
            </div> */}
          </div>
        </section>

        <section className="px-6 pt-10 max-w-5xl mx-auto">
          <StatStrip/>
          <FilterBar active={filter} onChange={setFilter}/>
        </section>

        <section className="px-6 pb-28 max-w-5xl mx-auto">
          {filtered.length===0 ? (
            <div className="text-center py-20">
              <p className="text-4xl mb-4">🔍</p>
              <p className="font-display font-bold text-xl text-ink-900 mb-2">No results</p>
              <p className="text-ink-500 text-sm">Try a different search or clear the filter.</p>
              <button onClick={()=>{setSearch("");setFilter(null);}}
                className="mt-5 btn-secondary px-5 py-2.5 rounded-xl text-sm font-bold">
                Clear all
              </button>
            </div>
          ) : (
            <div className="space-y-10">
              {filtered.map((release,i) => (
                <div key={release.version}>
                  <ReleaseCard release={release} index={i}/>
                  {(i+1)%3===0 && i<filtered.length-1 && (
                    <div className="mt-8 max-w-lg mx-auto">
                     
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </section>

        <section className="px-6 pb-24 max-w-3xl mx-auto">
          <div className="section-violet rounded-3xl p-10 text-center border border-violet-200 shadow-card">
            <h2 className="font-display font-bold text-2xl text-ink-900 mb-2">Always improving</h2>
            <p className="text-ink-500 text-sm mb-6 max-w-sm mx-auto">
              New releases ship regularly. Add Tab Time Tracker and updates install automatically.
            </p>
            <a href="https://microsoftedge.microsoft.com/addons/detail/tab-time-tracker/aoecofhfffbfnkekppdgicmnfjmfdmoe" target="_blank" rel="noopener noreferrer"
              className="btn-primary inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl font-display font-bold text-sm">
              Add to Edge — Free
            </a>
          </div>
        </section>
      </main>
      <Footer/>
    </>
  );
}
