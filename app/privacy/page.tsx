import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy — Tab Time Tracker",
  description: "Privacy policy for Tab Time Tracker Chrome extension and website.",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-ink-950 px-6 py-20">
      <div className="max-w-3xl mx-auto">
        <Link href="/" className="text-violet-400 text-sm hover:text-violet-300 transition-colors mb-8 inline-block">
          ← Back to home
        </Link>

        <h1 className="font-display font-extrabold text-4xl text-white mb-2">Privacy Policy</h1>
        <p className="text-slate-500 text-sm font-mono mb-10">Last updated: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</p>

        <div className="prose prose-invert prose-slate max-w-none space-y-8 text-slate-300 leading-relaxed">
          <section>
            <h2 className="font-display font-semibold text-xl text-white mb-3">1. Overview</h2>
            <p>Tab Time Tracker ("we", "the extension") is committed to your privacy. This policy describes what data is collected by the extension and by this website, how it is used, and how it is protected.</p>
          </section>

          <section>
            <h2 className="font-display font-semibold text-xl text-white mb-3">2. Extension data</h2>
            <p>The Tab Time Tracker browser extension stores all data <strong className="text-white">locally</strong> in Chrome's <code className="text-violet-300 bg-ink-800 px-1.5 py-0.5 rounded text-xs">chrome.storage.local</code>. This includes:</p>
            <ul className="list-disc pl-6 space-y-1 mt-2">
              <li>Domain names and time spent per domain per day</li>
              <li>Daily browsing limit preferences</li>
              <li>Block lists, ignore lists, and site labels</li>
              <li>Pomodoro session history</li>
              <li>Streak counters</li>
            </ul>
            <p className="mt-3"><strong className="text-white">None of this data is ever transmitted to our servers</strong>, because we have no servers. The extension makes no network requests except when you use the optional AI chat feature (which calls the Anthropic API using your own API key).</p>
          </section>

          <section>
            <h2 className="font-display font-semibold text-xl text-white mb-3">3. Website data (this site)</h2>
            <p>This website uses Google AdSense to display advertisements. AdSense may set cookies and collect data about your visit as described in <a href="https://policies.google.com/privacy" className="text-violet-400 hover:underline" target="_blank" rel="noopener noreferrer">Google's Privacy Policy</a>.</p>
            <p className="mt-2">We do not use any other analytics or tracking tools on this website. We do not collect email addresses, names, or any personally identifiable information.</p>
          </section>

          <section>
            <h2 className="font-display font-semibold text-xl text-white mb-3">4. Cookies</h2>
            <p>This website may set cookies via Google AdSense for ad personalisation. You can opt out of personalised advertising at <a href="https://adssettings.google.com" className="text-violet-400 hover:underline" target="_blank" rel="noopener noreferrer">adssettings.google.com</a>.</p>
          </section>

          <section>
            <h2 className="font-display font-semibold text-xl text-white mb-3">5. Children's privacy</h2>
            <p>Our extension and website are not directed to children under 13. We do not knowingly collect data from children.</p>
          </section>

          <section>
            <h2 className="font-display font-semibold text-xl text-white mb-3">6. Changes</h2>
            <p>We may update this policy. Significant changes will be noted at the top of this page with a new date.</p>
          </section>

          <section>
            <h2 className="font-display font-semibold text-xl text-white mb-3">7. Contact</h2>
            <p>Questions? Open an issue on our GitHub repository or contact us at <span className="text-violet-400">privacy@tab-time-tracker.vercel.app</span>.</p>
          </section>
        </div>
      </div>
    </div>
  );
}
