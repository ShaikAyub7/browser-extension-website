import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms — Tab Time Tracker",
  description: "Terms of use for Tab Time Tracker and this website.",
};

export default function TermsPage() {
  return (
    <main className="min-h-screen px-6 py-20 section-violet">
      <div className="max-w-4xl mx-auto">
        <Link href="/" className="text-violet-600 dark:text-violet-300 text-sm hover:underline mb-8 inline-block">
          ← Back to home
        </Link>

        <div className="glass rounded-[2rem] p-8 md:p-12">
          <p className="pill mb-5">Terms of Use</p>
          <h1 className="font-display font-extrabold text-4xl md:text-5xl tracking-tight mb-5" style={{ color: "var(--text-heading)" }}>
            Terms and conditions
          </h1>
          <p className="text-lg leading-relaxed mb-8" style={{ color: "var(--text-muted)" }}>
            These terms explain how the extension and website should be used.
          </p>

          <div className="space-y-6 text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
            <section className="rounded-2xl border border-violet-100/70 bg-white/80 dark:bg-white/5 p-5">
              <h2 className="font-display font-bold text-xl mb-3" style={{ color: "var(--text-heading)" }}>
                1. Acceptable use
              </h2>
              <p>
                Use Tab Time Tracker lawfully and do not attempt to interfere with the website, extension, or any related services.
              </p>
            </section>

            <section className="rounded-2xl border border-violet-100/70 bg-white/80 dark:bg-white/5 p-5">
              <h2 className="font-display font-bold text-xl mb-3" style={{ color: "var(--text-heading)" }}>
                2. Website ads
              </h2>
              <p>
                This website may display advertisements through Google AdSense. Ad interactions are governed by Google policies.
              </p>
            </section>

            <section className="rounded-2xl border border-violet-100/70 bg-white/80 dark:bg-white/5 p-5">
              <h2 className="font-display font-bold text-xl mb-3" style={{ color: "var(--text-heading)" }}>
                3. Extension data
              </h2>
              <p>
                The extension stores its data locally in the browser. Optional features that connect to third-party services only do so when enabled by the user.
              </p>
            </section>

            <section className="rounded-2xl border border-violet-100/70 bg-white/80 dark:bg-white/5 p-5">
              <h2 className="font-display font-bold text-xl mb-3" style={{ color: "var(--text-heading)" }}>
                4. Changes
              </h2>
              <p>
                These terms may change over time. Continued use of the site means you accept the updated terms.
              </p>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}