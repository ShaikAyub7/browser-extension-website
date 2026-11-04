"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";

const ITEMS = [
  { l: "Home", h: "/" }, { l: "Features", h: "/features" }, { l: "How it works", h: "/how-it-works" },
  { l: "Live stats", h: "/stats" }, { l: "What's new", h: "/whats-new" }, { l: "Dashboard", h: "/dashboard" },
  { l: "Beta program", h: "/beta" }, { l: "FAQ", h: "/faq" }, { l: "Contact", h: "/contact" },
  { l: "Install extension", h: "/#install" },
];

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const router = useRouter();
  useEffect(() => {
    const f = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") { e.preventDefault(); setOpen(o => !o); }
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", f);
    return () => window.removeEventListener("keydown", f);
  }, []);
  const list = ITEMS.filter(i => i.l.toLowerCase().includes(q.toLowerCase()));
  const go = (h: string) => { setOpen(false); setQ(""); router.push(h); };
  if (!open) return (
    <button onClick={() => setOpen(true)} aria-label="Open command palette"
      className="fixed bottom-5 right-5 z-40 hidden md:flex items-center gap-2 px-3.5 py-2 rounded-full glass text-xs font-mono"
      style={{ color: "var(--text-muted)", border: "1px solid var(--border)" }}>
      <Search size={13} /> Jump to <kbd className="px-1.5 py-0.5 rounded" style={{ background: "var(--bg-muted)" }}>⌘K</kbd>
    </button>
  );
  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[18vh] bg-black/60 backdrop-blur-sm" onClick={() => setOpen(false)}>
      <div className="w-full max-w-lg mx-4 rounded-2xl overflow-hidden shadow-hover" style={{ background: "var(--card-bg)", border: "1px solid var(--border)" }} onClick={e => e.stopPropagation()}>
        <input autoFocus value={q} onChange={e => setQ(e.target.value)} placeholder="Where to?"
          onKeyDown={e => e.key === "Enter" && list[0] && go(list[0].h)}
          className="w-full px-5 py-4 bg-transparent outline-none font-display" style={{ color: "var(--text-heading)", borderBottom: "1px solid var(--border)" }} />
        <ul className="max-h-72 overflow-auto p-2">
          {list.map(i => (
            <li key={i.h}><button onClick={() => go(i.h)} className="w-full text-left px-3 py-2.5 rounded-lg text-sm hover:bg-[var(--violet-50)]" style={{ color: "var(--text-body)" }}>{i.l}</button></li>
          ))}
          {!list.length && <li className="px-3 py-4 text-sm" style={{ color: "var(--text-muted)" }}>No matches</li>}
        </ul>
      </div>
    </div>
  );
}
