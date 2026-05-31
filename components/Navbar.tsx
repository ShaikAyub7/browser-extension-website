"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { links } from "@/data";
import Image from "next/image";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

 

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? "bg-white/90 backdrop-blur-xl border-b border-snow-200 py-3 shadow-sm" : "bg-transparent py-5"
    }`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">

        <Link href="/" className="flex items-center gap-1.5 group">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br flex items-center justify-center shadow-violet group-hover:scale-105 transition-transform">
           <Image src="/image.png" alt="TabTime Logo" width={28} height={28} />
          </div>
          <span className="font-display font-bold text-ink-900 text-[17px] tracking-tight">
            Tab<span className="text-violet-500">Time</span>Tracker
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-7">
          {links.map((l) =>
            l.href.startsWith("/") ? (
              <Link key={l.href} href={l.href}
                className="flex items-center gap-1.5 text-sm font-medium text-ink-500 hover:text-violet-600 transition-colors">
                {l.label}
                {l.badge && <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse inline-block" />}
              </Link>
            ) : (
              <a key={l.href} href={l.href}
                className="text-sm font-medium text-ink-500 hover:text-violet-600 transition-colors">
                {l.label}
              </a>
            )
          )}
        </div>

        <div className="hidden md:block">
          <a href="#install"
            className="btn-primary px-5 py-2.5 rounded-xl text-sm font-bold font-display">
            Add to Edge — Free
          </a>
        </div>

        <button className="md:hidden text-ink-500 hover:text-ink-900 transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle menu">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {mobileOpen
              ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/>
              : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16"/>}
          </svg>
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-snow-200 px-6 py-4 flex flex-col gap-4 shadow-sm">
          {links.map((l) =>
            l.href.startsWith("/") ? (
              <Link key={l.href} href={l.href}
                className="flex items-center gap-2 text-sm font-medium text-ink-700"
                onClick={() => setMobileOpen(false)}>
                {l.label}
                {l.badge && <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />}
              </Link>
            ) : (
              <a key={l.href} href={l.href}
                className="text-sm font-medium text-ink-700"
                onClick={() => setMobileOpen(false)}>
                {l.label}
              </a>
            )
          )}
          <a href="https://microsoftedge.microsoft.com/addons/detail/tab-time-tracker/aoecofhfffbfnkekppdgicmnfjmfdmoe"
            className="btn-primary px-5 py-2.5 rounded-xl text-sm font-bold text-center"
            onClick={() => setMobileOpen(false)}>
            Add to Edge — Free
          </a>
        </div>
      )}
    </nav>
  );
}
