"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function AnnouncementBanner() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const key = "announcement-v346";
    if (!sessionStorage.getItem(key)) {
      setShow(true);
      document.documentElement.style.setProperty("--banner-h", "40px");
    }
  }, []);

  const dismiss = () => {
    setShow(false);
    sessionStorage.setItem("announcement-v346", "1");
    document.documentElement.style.setProperty("--banner-h", "0px");
  };

  if (!show) return null;

  return (
    <div
      className="absolute left-0 top-32 right-0 z-[70] flex items-center justify-center gap-3 px-4 text-sm font-medium text-center"
      style={{
        top: 0,
        height: "40px",
        background: "linear-gradient(90deg,#4C1D95,#6025C9,#7C3AED,#6366F1)",
        color: "#fff",
      }}
    >
      <span className="text-base">🎉</span>
      <span>
        <strong>v3.4.6 is live</strong> — Streak Shield &amp; smarter AI now
        available.{" "}
        <Link
          href="/whats-new"
          className="underline underline-offset-2 opacity-90 hover:opacity-100 font-bold"
        >
          See what&apos;s new →
        </Link>
      </span>
      <button
        onClick={dismiss}
        aria-label="Dismiss"
        className="ml-auto p-1 rounded-full opacity-70 hover:opacity-100 transition-opacity flex-shrink-0"
      >
        <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
          <path
            d="M4 4l8 8M12 4l-8 8"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </button>
    </div>
  );
}
