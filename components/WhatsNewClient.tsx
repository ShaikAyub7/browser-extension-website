"use client";
import { useEffect, useRef, useState } from "react";
import Footer from "@/components/Footer";
import { KIND_CONFIG,  RELEASES, TAG_CONFIG } from "@/data";
import {ChangeKind, Release} from "@/types";


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

function VersionTag({tag}:{tag:"latest"|"major"|"hotfix"|"comingSoon"|"failed"}) {
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
          <span className="font-display font-extrabold text-2xl ">v{release.version}</span>
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
          <h2 className="font-display font-bold text-xl  leading-snug">{release.headline}</h2>
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
    <div className="flex flex-wrap gap-2 justify-center mb-12 sticky top-7 z-10">
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
      <main className="min-h-screen relative">
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

            <h1 className="font-display font-extrabold text-5xl md:text-6xl  leading-tight mb-4">
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
                className="w-full bg-white rounded-xl pl-11 pr-4 py-3 text-sm  placeholder-ink-400 outline-none border border-snow-300 focus:border-violet-400 transition-colors shadow-card"
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

        <section className="px-6 pt-10 max-w-5xl mx-auto  z-10">
          <StatStrip/>
          <FilterBar active={filter} onChange={setFilter}/>
        </section>

        <section className="px-6 pb-28 max-w-5xl mx-auto">
          {filtered.length===0 ? (
            <div className="text-center py-20">
              <p className="text-4xl mb-4">🔍</p>
              <p className="font-display font-bold text-xl  mb-2">No results</p>
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
            <h2 className="font-display font-bold text-2xl mb-2">Always improving</h2>
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
