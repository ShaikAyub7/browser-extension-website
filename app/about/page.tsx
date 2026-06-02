import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About — Tab Time Tracker",
  description: "About Tab Time Tracker, the privacy-first browser extension for time tracking and focus.",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen px-6 py-20 section-violet">
      <div className="max-w-4xl mx-auto">
        <Link href="/" className="text-violet-600 dark:text-violet-300 text-sm hover:underline mb-8 inline-block">
          ← Back to home
        </Link>

        <div className="glass rounded-[2rem] p-8 md:p-12">
          <p className="pill mb-5">About the product</p>
          <h1 className="font-display font-extrabold text-4xl md:text-5xl tracking-tight mb-5" style={{ color: "var(--text-heading)" }}>
            Tab Time Tracker helps people understand where their browsing time goes.
          </h1>
          <p className="text-lg leading-relaxed mb-8" style={{ color: "var(--text-muted)" }}>
            We built Tab Time Tracker as a privacy-first browser extension for tracking time spent on websites,
            setting limits, and staying focused without sending personal browsing data to a server.
          </p>

          <div className="grid md:grid-cols-2 gap-4">
            <section className="rounded-2xl border border-violet-100/70 bg-white/70 dark:bg-white/5 p-5">
              <h2 className="font-display font-bold text-xl mb-3" style={{ color: "var(--text-heading)" }}>
                What it does
              </h2>
              <ul className="space-y-2 text-sm" style={{ color: "var(--text-muted)" }}>
                <li>Tracks time spent on active browser tabs.</li>
                <li>Helps users set daily and per-site limits.</li>
                <li>Supports focus sessions and usage awareness.</li>
                <li>Stores extension data locally in the browser.</li>
              </ul>
            </section>

            <section className="rounded-2xl border border-violet-100/70 bg-white/70 dark:bg-white/5 p-5">
              <h2 className="font-display font-bold text-xl mb-3" style={{ color: "var(--text-heading)" }}>
                Why this site exists
              </h2>
              <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
                This website explains the extension, hosts support pages, shares product updates, and provides
                the legal information that helps users and ad reviewers understand the site.
              </p>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}