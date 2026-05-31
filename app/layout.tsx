import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "Tab Time Tracker — Know Where Your Time Goes",
  description: "Monitor your daily browsing habits, set per-site limits, block distractions with Pomodoro focus sessions, and get AI-powered insights. Free Chrome extension.",
  keywords: "tab time tracker, browser extension, time tracking, productivity, pomodoro, chrome extension, digital wellbeing",
  openGraph: {
    title: "Tab Time Tracker",
    description: "Know exactly where your browsing time goes.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.ico" />
      <script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9111059587670295"
        crossOrigin="anonymous"
      ></script>
     </head>
      <body className="font-body antialiased bg-white">
        <Navbar/>
        {children}
        
        </body>
    </html>
  );
}
