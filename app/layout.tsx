import type { Metadata } from "next";
import "./globals.css";

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
    images: ["/og.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tab Time Tracker",
    description: "Know exactly where your browsing time goes.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* Google AdSense — replace ca-pub-XXXXXXXXXXXXXXXX with your publisher ID */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX"
          crossOrigin="anonymous"
        />
      </head>
      <body className="font-body antialiased">{children}</body>
    </html>
  );
}
