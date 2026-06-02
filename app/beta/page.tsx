import type { Metadata } from "next";
import Link from "next/link";
import { AlertTriangle, BugPlay, Download, ShieldCheck, Sparkles } from "lucide-react";
import UpcomingUiUx from "@/components/beta/UpcomingUiUx";
import UpcomingSyncData from "@/components/beta/UpcomingSyncData";
import UpcomingGamification from "@/components/beta/UpcomingGamification";

export const metadata: Metadata = {
  title: "Beta Download — Tab Time Tracker",
  description:
    "Download the beta zip of Tab Time Tracker and preview upcoming UI, sync, and gamification features before the stable release.",
};

const betaDownloadUrl = "/beta/tabtime-beta.zip";

function BetaStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/70 dark:bg-white/5 px-5 py-4 shadow-sm backdrop-blur-sm">
      <p className="text-xs uppercase tracking-[0.24em] text-violet-500 font-semibold">{label}</p>
      <p className="mt-2 text-lg font-display font-bold" style={{ color: "var(--text-heading)" }}>
        {value}
      </p>
    </div>
  );
}

export default function BetaPage() {
  return (
    <main className="relative overflow-hidden pt-28 pb-20 px-6 section-violet">
      <div className="absolute inset-0 bg-radial-violet pointer-events-none" />
      <div className="absolute top-24 left-10 w-72 h-72 rounded-full blur-3xl opacity-40 pointer-events-none" style={{ background: "var(--violet-100)" }} />
      <div className="absolute bottom-16 right-10 w-96 h-96 rounded-full blur-3xl opacity-30 pointer-events-none" style={{ background: "var(--violet-50)" }} />

      <div className="relative z-10 max-w-7xl mx-auto grid lg:grid-cols-[1.2fr_0.8fr] gap-10 items-start">
        <section className="glass rounded-[2rem] shadow-[0_24px_120px_rgba(124,58,237,0.12)] p-8 md:p-12">
          <div className="pill mb-6 inline-flex">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
            Beta testing build
          </div>

          <h1 className="font-display font-extrabold text-4xl md:text-6xl leading-[1.02] tracking-tight mb-5" style={{ color: "var(--text-heading)" }}>
            Try the next release
            <span className="block font-serif italic gradient-text">before everyone else.</span>
          </h1>

          <p className="text-lg md:text-xl leading-relaxed max-w-2xl mb-8" style={{ color: "var(--text-muted)" }}>
            This page is for testers who want pre-release builds, early fixes, and experimental features.
            Download the beta zip to try changes before they reach the stable Edge listing.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <a
              href={betaDownloadUrl}
              download
              className="btn-primary inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-2xl font-display font-bold text-base"
            >
              <Download className="w-4 h-4" />
              Download beta zip
            </a>

            <Link
              href="/"
              className="btn-secondary inline-flex items-center justify-center px-7 py-4 rounded-2xl font-display font-bold text-base"
            >
              Back to stable release
            </Link>
          </div>

          {/* <div className="rounded-2xl border border-amber-200/80 bg-amber-50/90 dark:bg-amber-500/10 px-4 py-4 text-sm text-amber-950 dark:text-amber-100 mb-8 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 mt-0.5 flex-shrink-0" />
            <p>
              Put your beta zip file at <span className="font-mono">public/beta/tabtime-beta.zip</span> so this button downloads the installer.
            </p>
          </div> */}

          <div className="grid sm:grid-cols-3 gap-4">
            <BetaStat label="For testers" value="Pre-release access" />
            <BetaStat label="Update cadence" value="Faster than stable" />
            <BetaStat label="Feedback loop" value="Report issues early" />
          </div>
        </section>

        <aside className="space-y-5">
          <div className="glass rounded-[1.75rem] p-6 shadow-[0_18px_70px_rgba(124,58,237,0.1)]">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-11 h-11 rounded-2xl bg-violet-100 text-violet-600 flex items-center justify-center">
                <BugPlay className="w-5 h-5" />
              </div>
              <div>
                <h2 className="font-display font-bold text-2xl" style={{ color: "var(--text-heading)" }}>
                  What beta means
                </h2>
                <p className="text-sm" style={{ color: "var(--text-faint)" }}>
                  A testing channel for upcoming changes
                </p>
              </div>
            </div>

            <ul className="space-y-4 text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
              <li className="flex gap-3">
                <Sparkles className="w-4 h-4 mt-1 text-violet-500 flex-shrink-0" />
                Try experimental features before the public release.
              </li>
              <li className="flex gap-3">
                <ShieldCheck className="w-4 h-4 mt-1 text-emerald-500 flex-shrink-0" />
                Stable install remains available on the home page.
              </li>
              <li className="flex gap-3">
                <AlertTriangle className="w-4 h-4 mt-1 text-amber-500 flex-shrink-0" />
                Beta builds may change quickly and can contain rough edges.
              </li>
            </ul>
          </div>

          <div className="glass rounded-[1.75rem] p-6 shadow-[0_10px_40px_rgba(15,23,42,0.06)]">
            <h3 className="font-display font-bold text-xl mb-3" style={{ color: "var(--text-heading)" }}>
              Testing checklist
            </h3>
            <ol className="space-y-3 text-sm" style={{ color: "var(--text-muted)" }}>
              <li>1. Install the beta zip from the button above.</li>
              <li>2. Use the extension for a few sessions.</li>
              <li>3. Share bugs, missing UI, or odd tracking behavior.</li>
              <li>4. Compare beta and stable before you switch over.</li>
            </ol>
          </div>
        </aside>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto mt-12 space-y-8">
        <UpcomingUiUx />
        <UpcomingSyncData />
        <UpcomingGamification />
      </div>
    </main>
  );
}