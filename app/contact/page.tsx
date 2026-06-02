import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Contact — Tab Time Tracker",
  description: "Contact Tab Time Tracker for support, feedback, and business inquiries.",
};

export default function ContactPage() {
  return (
    <main className="min-h-screen px-6 py-20 section-violet">
      <div className="max-w-3xl mx-auto">
        <Link href="/" className="text-violet-600 dark:text-violet-300 text-sm hover:underline mb-8 inline-block">
          ← Back to home
        </Link>

        <div className="glass rounded-[2rem] p-8 md:p-12">
          <p className="pill mb-5">Contact</p>
          <h1 className="font-display font-extrabold text-4xl md:text-5xl tracking-tight mb-5" style={{ color: "var(--text-heading)" }}>
            Get in touch
          </h1>
          <p className="text-lg leading-relaxed mb-8" style={{ color: "var(--text-muted)" }}>
            Use the email below for support, bug reports, partnership questions, or general feedback about the extension and website.
          </p>

          <div className="grid gap-4">
            <a
              href="mailto:skayub929@gmail.com?subject=Tab%20Time%20Tracker%20contact"
              className="rounded-2xl border border-violet-100/70 bg-white/80 dark:bg-white/5 p-5 hover:border-violet-200 transition-colors"
            >
              <p className="text-xs uppercase tracking-[0.22em] font-semibold text-violet-500 mb-2">Email</p>
              <p className="font-display font-bold text-lg" style={{ color: "var(--text-heading)" }}>
                skayub929@gmail.com
              </p>
            </a>

            <div className="rounded-2xl border border-violet-100/70 bg-white/80 dark:bg-white/5 p-5">
              <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
                For AdSense and policy purposes, this page gives visitors a direct way to contact the site owner.
                You can replace the email address with your preferred business inbox if needed.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}