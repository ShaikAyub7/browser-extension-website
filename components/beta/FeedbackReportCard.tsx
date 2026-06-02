import { Bug, Mail, MessageSquareText, ShieldAlert } from "lucide-react";
import Link from "next/link";

export default function FeedbackReportCard() {
  return (
    <section className="glass rounded-[2rem] p-7 md:p-8">
      <div className="flex flex-col gap-3 mb-6">
        <span className="inline-flex self-start rounded-full px-3 py-1 text-xs font-semibold tracking-[0.22em] uppercase bg-rose-100 text-rose-700">
          Feedback / Bugs
        </span>
        <div>
          <h2 className="font-display font-extrabold text-2xl md:text-3xl tracking-tight" style={{ color: "var(--text-heading)" }}>
            Tell us what breaks, what feels off, and what you want next
          </h2>
          <p className="mt-2 max-w-3xl text-sm md:text-base leading-relaxed" style={{ color: "var(--text-muted)" }}>
            Beta users can send bug reports, UI issues, or ideas directly from this page so fixes can move faster.
          </p>
        </div>
      </div>

      <div className="grid lg:grid-cols-[1fr_auto] gap-4 items-stretch">
        <div className="rounded-2xl border border-rose-100/70 bg-white/75 dark:bg-white/5 p-5">
          <div className="flex items-start gap-3 mb-4">
            <div className="w-11 h-11 rounded-2xl flex items-center justify-center flex-shrink-0" style={{ background: "rgba(244,114,182,0.14)", color: "#E11D48" }}>
              <Bug className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-display font-bold text-lg" style={{ color: "var(--text-heading)" }}>
                Report bugs fast
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
                If something is broken, include the browser, the beta version, and what you expected to happen.
              </p>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-3 text-sm">
            <div className="flex items-start gap-2.5 rounded-2xl border border-rose-100/60 bg-white/70 dark:bg-white/5 p-4" style={{ color: "var(--text-muted)" }}>
              <MessageSquareText className="w-4 h-4 mt-0.5 text-rose-500 flex-shrink-0" />
              <span>Describe the bug in plain language and say what you clicked before it happened.</span>
            </div>
            <div className="flex items-start gap-2.5 rounded-2xl border border-rose-100/60 bg-white/70 dark:bg-white/5 p-4" style={{ color: "var(--text-muted)" }}>
              <ShieldAlert className="w-4 h-4 mt-0.5 text-amber-500 flex-shrink-0" />
              <span>Include screenshots or a short screen recording if the issue is visual or timing-related.</span>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-rose-100/70 bg-white/80 dark:bg-white/5 p-5 min-w-[260px]">
          <h3 className="font-display font-bold text-lg mb-3" style={{ color: "var(--text-heading)" }}>
            Quick contact
          </h3>
          <div className="space-y-3 text-sm" style={{ color: "var(--text-muted)" }}>
            <a
              href="mailto:skayub929@gmail.com?subject=Beta%20bug%20report"
              className="flex items-center gap-2.5 rounded-2xl border border-rose-100/60 bg-white/70 dark:bg-white/5 px-4 py-3 hover:border-rose-200 transition-colors"
            >
              <Mail className="w-4 h-4 text-rose-500" />
              Email bug report
            </a>
            <Link
              href="/whats-new"
              className="flex items-center gap-2.5 rounded-2xl border border-rose-100/60 bg-white/70 dark:bg-white/5 px-4 py-3 hover:border-rose-200 transition-colors"
            >
              <ShieldAlert className="w-4 h-4 text-amber-500" />
              Check the changelog
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}