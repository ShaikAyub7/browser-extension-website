"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { links } from "@/data";
import Image from "next/image";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "py-3 shadow-sm" : "bg-transparent py-5"
      }`}
      style={
        scrolled
          ? {
              background: "var(--navbar-bg)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              borderBottom: "1px solid var(--navbar-border)",
            }
          : {}
      }
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-1.5 group">
          <div className="w-8 h-8 rounded-xl flex items-center justify-center shadow-violet group-hover:scale-105 transition-transform">
            <Image src="/image.png" alt="TabTime Logo" width={28} height={28} />
          </div>
          <span className="font-display font-bold text-[17px] tracking-tight" style={{ color: "var(--text-heading)" }}>
            Tab<span className="text-violet-500">Time</span>Tracker
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-7">
          {links.map((l) =>
            l.href.startsWith("/") ? (
              <Link
                key={l.href}
                href={l.href}
                className="flex items-center gap-1.5 text-sm font-medium transition-colors hover:text-violet-500"
                style={{ color: "var(--text-muted)" }}
              >
                {l.label}
                {l.badge && (
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse inline-block" />
                )}
              </Link>
            ) : (
              <a
                key={l.href}
                href={l.href}
                className="text-sm font-medium transition-colors hover:text-violet-500"
                style={{ color: "var(--text-muted)" }}
              >
                {l.label}
              </a>
            )
          )}
        </div>

        <div className="hidden md:flex items-center gap-2">
          <ThemeToggle />
          <a
            href="https://microsoftedge.microsoft.com/addons/detail/tab-time-tracker/aoecofhfffbfnkekppdgicmnfjmfdmoe"
            className="btn-primary px-5 py-2.5 rounded-xl text-sm font-bold font-display"
          >
            Add to
            
    
            
             Edge — Free
          </a>
        </div>

        <button
          className="md:hidden transition-colors"
          style={{ color: "var(--text-muted)" }}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {mobileOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {mobileOpen && (
        <div
          className="md:hidden px-6 py-4 flex flex-col gap-4"
          style={{
            background: "var(--navbar-bg)",
            borderTop: "1px solid var(--navbar-border)",
            backdropFilter: "blur(20px)",
          }}
        >
          <ThemeToggle />
          {links.map((l) =>
            l.href.startsWith("/") ? (
              <Link
                key={l.href}
                href={l.href}
                className="flex items-center gap-2 text-sm font-medium"
                style={{ color: "var(--text-body)" }}
                onClick={() => setMobileOpen(false)}
              >
                {l.label}
                {l.badge && <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />}
              </Link>
            ) : (
              <a
                key={l.href}
                href={l.href}
                className="text-sm font-medium"
                style={{ color: "var(--text-body)" }}
                onClick={() => setMobileOpen(false)}
              >
                {l.label}
              </a>
            )
          )}
          <a
            href="https://microsoftedge.microsoft.com/addons/detail/tab-time-tracker/aoecofhfffbfnkekppdgicmnfjmfdmoe"
            className="btn-primary px-5 py-2.5 rounded-xl text-sm font-bold text-center"
            onClick={() => setMobileOpen(false)}
          >
            Add to Edge — Free
          </a>
        </div>
      )}
    </nav>
  );
}
