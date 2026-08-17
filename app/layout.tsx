import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { Analytics } from "@vercel/analytics/next";
import FeedbackWidget from "@/components/FeedbackWidget";
import { SpeedInsights } from "@vercel/speed-insights/next";

export const metadata: Metadata = {
  title: "Tab Time Tracker — Know Where Your Time Goes",

  description:
    "Monitor your daily browsing habits, set per-site limits, block distractions with Pomodoro focus sessions, and get AI-powered insights. Free Chrome extension.",
  keywords:
    "tab time tracker, browser extension, time tracking, productivity, pomodoro, chrome extension, digital wellbeing",
  openGraph: {
    title: "Tab Time Tracker",
    description: "Know exactly where your browsing time goes.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <meta
          name="google-adsense-account"
          content="ca-pub-9111059587670295"
        ></meta>
        <link rel="icon" href="/favicon.ico" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
            (function(){
              try {
                var t = localStorage.getItem('theme');
                var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                if (t === 'dark' || (!t && prefersDark)) {
                  document.documentElement.classList.add('dark');
                }
              } catch(e){}
            })();
          `,
          }}
          suppressHydrationWarning
        />
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9111059587670295"
          crossOrigin="anonymous"
        />
      </head>
      <body
        className="font-body antialiased"
        style={{ background: "var(--bg)" }}
      >
        <Navbar />
        {children}
        {/* <DisableInspect /> */}
        <FeedbackWidget />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
