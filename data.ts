import { Users,Clock,Star,Lock, Apple, Brain, Moon, Trophy , Download, Settings, Globe, BarChart, Lightbulb, Figma, Github, Twitter, Youtube, Calendar, User, ShieldEllipsis, TestTube2, ToyBrick } from "lucide-react";
import { ChangeKind, Release, Stat } from "./types";
import { MousePointerClick } from "lucide-react";

export const links = [
      { href: "/dashboard",   label: "Dashboard", badge: true },
    { href: "/features",    label: "Features" },
    { href: "/how-it-works",label: "How it works" },
    { href: "/stats",       label: "Stats" },
    { href: "/whats-new",   label: "What's new", badge: true },
    { href: "/faq",         label: "FAQ" },
      // { href: "/beta",        label: "Beta",  },

  ];

export const SITES = [
  { name: "youtube.com",  time: "2h 14m", color: "#EF4444", bg: "#FEF2F2", pct: 78 },
  { name: "twitter.com",  time: "1h 03m", color: "#3B82F6", bg: "#EFF6FF", pct: 52 },
  { name: "github.com",   time: "47m",    color: "#10B981", bg: "#ECFDF5", pct: 35 },
  { name: "reddit.com",   time: "38m",    color: "#F97316", bg: "#FFF7ED", pct: 28 },
  { name: "figma.com",    time: "22m",    color: "#8B5CF6", bg: "#F5F3FF", pct: 16 },
];

  export const STEPS = [
  { num:"01", title:"Install in one click",  desc:"Add Tab Time Tracker from the Chrome Web Store. No sign-up, no account, no hidden permissions.", icon:Download, detail:"storage, activeTab, tabs, notifications, alarms", color:"#7C3AED", bg:"#F5F3FF" },
  { num:"02", title:"Browse normally",        desc:"The background service worker silently tracks every active tab. Nothing changes about your experience.", icon:Globe, detail:"Idle gaps > 1 min are excluded automatically.", color:"#3B82F6", bg:"#EFF6FF" },
  { num:"03", title:"Open the popup",         desc:"Click the extension icon. See today's time per site, charts, heatmap, and productivity score instantly.", icon:BarChart, detail:"Data loads from local storage — no network call.",  color:"#10B981", bg:"#ECFDF5" },
  { num:"04", title:"Set limits & focus",     desc:"Configure daily caps, per-site limits, work-hours schedule, and start Pomodoro sessions.", icon:Settings, detail:"Notifications fire the moment you hit any limit.",      color:"#F97316", bg:"#FFF7ED" },
];


export const FEATURES = [
  { icon:"📊", title:"Real-time tracking",    desc:"Every tab, every second. Time accumulates silently — no action needed. Idle gaps > 1 min are auto-ignored.",   accent:"#7C3AED", bg:"#F5F3FF", tag:"Core"         },
  { icon:"🔔", title:"Daily & per-site limits",desc:"Set a global daily cap or per-site minute limits. Get a browser notification the moment you cross a threshold.", accent:"#3B82F6", bg:"#EFF6FF", tag:"Limits"       },
  { icon:"🍅", title:"Pomodoro focus mode",    desc:"25 / 45 / 60 min timers with site blocking. Distracting domains redirect the instant focus starts.",            accent:"#EF4444", bg:"#FEF2F2", tag:"Focus"        },
  { icon:"📅", title:"Scheduled work limits",  desc:"Stricter limits during work hours (9–5 default). Different caps for work vs. leisure time windows.",             accent:"#10B981", bg:"#ECFDF5", tag:"Schedule"     },
  { icon:"📈", title:"Analytics & heatmap",    desc:"7 or 30-day bar charts, top-site leaderboard, productivity score, and a 35-day activity heatmap.",              accent:"#F97316", bg:"#FFF7ED", tag:"Analytics"    },
  { icon:"🤖", title:"AI assistant",           desc:"Chat with an AI about your data. Ask 'What was my most distracted day?' or 'Suggest a focus strategy.'",        accent:"#6366F1", bg:"#EEF2FF", tag:"AI"           },
  { icon:"🏆", title:"Streak & goals",         desc:"Build a daily streak by staying under your limit. Visual counter keeps you motivated and accountable.",           accent:"#FBBF24", bg:"#FFFBEB", tag:"Gamification" },
  { icon:"💾", title:"Export your data",       desc:"Download your full history as CSV or JSON. Your data stays local — never uploaded to any server.",               accent:"#14B8A6", bg:"#F0FDFA", tag:"Privacy"      },
];


export const STATS: Stat[] = [
  { value:80, suffix:"+",  label:"Active users",          icon:Users , color:"#7C3AED", bg:"#F5F3FF" },
  { value:4.7,   suffix:"★",  label:"Edge Add-ons rating",icon:Star, color:"#F59E0B", bg:"#FFFBEB" },
  { value:100,   suffix:"+", label:"Hours tracked daily",   icon:Clock , color:"#3B82F6", bg:"#EFF6FF" },
  { value:100,   suffix:"%",  label:"Private — no server",   icon:Lock, color:"#10B981", bg:"#ECFDF5" },
];


export const TESTIMONIALS = [
  { name:"Alex K.",  handle:"@alexk_dev",    avatar:"AK", text:"I had no idea I was spending 3 hours a day on YouTube until Tab Time Tracker showed me. Changed my habits in a week.", stars:5, color:"#7C3AED", bg:"#F5F3FF" },
  { name:"Sarah M.", handle:"@sarahm_ux",    avatar:"SM", text:"The Pomodoro + site blocking combo is *chef's kiss*. Finally a focus tool that actually blocks the sites I tell it to.", stars:5, color:"#3B82F6", bg:"#EFF6FF" },
  { name:"Diego R.", handle:"@diego_builds", avatar:"DR", text:"The AI chat feature is surprisingly useful. I asked it to analyse my distraction patterns and got an actual strategy.", stars:5, color:"#10B981", bg:"#ECFDF5" },
  { name:"Priya N.", handle:"@priya_writes", avatar:"PN", text:"The heatmap is addictive to look at. I now compete with myself to keep it green. 10/10 gamification.", stars:5, color:"#F97316", bg:"#FFF7ED" },
  { name:"James T.", handle:"@jamescode",    avatar:"JT", text:"Privacy-first approach sold me immediately. No account, no cloud, data stays in my browser. Rare these days.", stars:5, color:"#6366F1", bg:"#EEF2FF" },
  { name:"Mei L.",   handle:"@mei_product",  avatar:"ML", text:"Scheduled work limits are genius. 2h cap during work hours keeps me honest, then I relax after 5pm.", stars:5, color:"#F59E0B", bg:"#FFFBEB" },
];

export const FAQS = [
  { q:"Is Tab Time Tracker really free?",           a:"Yes — completely free, no premium tier, no subscription. The extension will always be free." },
  { q:"Does it send my data to any server?",        a:"No. All data is stored in Browser's local storage. Nothing leaves your browser." },
  { q:"Will it slow down my browser?",              a:"No. Tracking runs in a lightweight service worker — no measurable performance impact." },
  { q:"What permissions does it need?",             a:"storage, activeTab, tabs, notifications, alarms, and scripting for focus mode blocking. It does NOT request broad host permissions beyond what the content script needs." },
  { q:"How does the AI assistant work?",            a:"Your browsing summary is included in the prompt for personalised advice — the key and data only leave your device in that direct API call." },
  { q:"Can I export my data?",                      a:"Yes — Settings → Export data. Download as CSV or JSON." },
  { q:"Does it track incognito tabs?",              a:"Only if you explicitly enable it in Chrome's extension settings. It's disabled in incognito by default." },
  { q:"How do streaks work?",                       a:"You earn a streak day by staying under your daily limit. Miss a day and your streak resets. A Streak Shield can protect you — you earn one every 7 days." },
];


export const RELEASES: Release[] = [
  {
    version: "4.0.0", date: "Aug 08 2026", tag: "major",

    headline: "AI Assistant retired — meet Cursor Time Alert",
    summary: "Based on user feedback, we've pulled the AI Assistant and the Rewards/gamification system out of the extension entirely, simplified Appearance down to a plain dark/light toggle, and shipped a new always-on feature that doesn't need an API key: your cursor now warns you directly as you approach a limit.",
    highlight: "Cursor Time Alert",
    changes: [
      {kind:"new",     text:"Cursor Time Alert: your cursor glows red and blinks faster as a site or your daily limit gets close — so you notice even when you've drifted off task."},
      {kind:"removed", text:"AI Assistant tab removed, along with all Anthropic-API-key-based chat and insight features."},
      {kind:"removed", text:"Rewards tab removed — badges, XP, and streak-as-a-game mechanics are gone."},
      {kind:"removed", text:"Appearance panel (multi-theme, accent-color picker) removed and replaced with a simple dark/light mode toggle."},
      {kind:"removed", text:"Dashboard Widgets configuration panel removed."},
      {kind:"fixed",   text:"Popup was loading its script twice (a legacy duplicate include), which made settings toggles behave unpredictably."},
      {kind:"fixed",   text:"Missing charset declaration was corrupting special characters (·, …, —) in the UI — replaced with plain text for reliability."},
      {kind:"fixed",   text:"Notification icon pointed to a missing file and rendered blank."},
      {kind:"improved",text:"Refreshed app icon and added Web Store promotional tile images."},
    ],
  },
  {
    version:"3.4.0", date:"Apr 14 2026", tag:"failed",
    headline:"AI Assistant — chat with your data",
    summary:"The biggest release since v3.0. Tab Time Tracker now ships with a built-in AI chat panel powered by the Anthropic API. Ask it anything about your habits and get actionable advice.",
    highlight:"AI Assistant",
    changes:[
      {kind:"new",     text:"AI Assistant tab: natural language chat about your browsing data."},
      {kind:"new",     text:"Context-aware prompts: daily summary, hourly breakdown, top 10 sites, and productivity score are all injected automatically."},
      {kind:"new",     text:"Suggested questions shown on first open to help new users explore the feature."},
      {kind:"new",     text:"API key stored securely in chrome.storage.local, never transmitted to our servers."},
      {kind:"improved",text:"Analytics tab redesigned with tabbed view: 7-day, 30-day, and all-time charts."},
      {kind:"improved",text:"Productivity score algorithm updated — now weights recency and penalises late-night sessions."},
      {kind:"fixed",   text:"Bar chart x-axis labels overlapping on narrow popup widths."},
      {kind:"fixed",   text:"Per-site limit notification sometimes fired twice for the same domain."},
    ],
  },
  {
    version:"3.3.2", date:"Mar 02 2026", tag:"hotfix",
    headline:"Hotfix: notification loop on Chrome 124",
    summary:"Chrome 124 changed how alarms fire when the browser is throttled. This caused limit notifications to loop indefinitely. Patched within 6 hours of reports.",
    changes:[
      {kind:"fixed",text:"Notification loop caused by Chrome 124 alarm throttling — de-duplicated by storing last-notified timestamp."},
      {kind:"fixed",text:"Edge case where the popup showed NaN% if a site was visited for < 1 second."},
    ],
  },
  {
    version:"3.3.0", date:"Feb 17 2026",
    headline:"Scheduled work-hour limits",
    summary:"You can now set different browsing limits for work hours vs. leisure time. Pair this with a strict block list to build a real deep-work routine.",
    highlight:"Work-Hour Scheduling",
    changes:[
      {kind:"new",     text:"Work-hours schedule: configure start/end time and separate daily limit for that window."},
      {kind:"new",     text:"Quick-toggle in the popup header to temporarily suspend work-hour limits (max 30 min snooze)."},
      {kind:"new",     text:"Block list now supports wildcard patterns, e.g. *.reddit.com to block all subdomains."},
      {kind:"improved",text:"Settings page reorganised into labelled sections — much easier to navigate."},
      {kind:"improved",text:"Focus mode countdown now visible as a badge on the extension icon."},
      {kind:"fixed",   text:"Import from CSV failed silently when the file had Windows-style CRLF line endings."},
      {kind:"removed", text:"Legacy 'simple mode' toggle removed — all users now on the full UI."},
    ],
  },
  {
    version:"3.2.1", date:"Jan 09 2026",
    headline:"Export, CSV import & site labels",
    summary:"Data portability update. Export everything as JSON or CSV, import old data back, and label sites as Productive/Neutral/Distracting to power the productivity score.",
    changes:[
      {kind:"new",     text:"Export data as CSV or JSON from Settings → Export."},
      {kind:"new",     text:"Import CSV to restore a previous export or merge data from another device."},
      {kind:"new",     text:"Site labels: tag any domain as Productive, Neutral, or Distracting."},
      {kind:"new",     text:"Productivity score (0–100) visible on the Summary tab, with a 7-day trend arrow."},
      {kind:"improved",text:"All-time totals now shown alongside today's figures in the Summary tab."},
      {kind:"fixed",   text:"Ignore-list entries weren't being persisted after browser restart."},
    ],
  },
  {
    version:"3.1.0", date:"Nov 30 2025",
    headline:"35-day activity heatmap",
    summary:"Inspired by GitHub's contribution graph, the new heatmap gives you a bird's-eye view of your browsing intensity over the past 35 days.",
    highlight:"Activity Heatmap",
    changes:[
      {kind:"new",      text:"35-day heatmap on the Analytics tab. Hover any cell to see exact time for that day."},
      {kind:"new",      text:"Streak counter visible in the popup header and on the heatmap."},
      {kind:"improved", text:"Heatmap colour scale now adapts to your personal usage range, not a fixed scale."},
      {kind:"improved", text:"Summary tab loads 60% faster by lazy-loading the chart library."},
      {kind:"fixed",    text:"Bar chart sometimes showed yesterday's data after midnight reset."},
      {kind:"security", text:"Content script no longer reads page content — reduced to URL-only access."},
    ],
  },
  {
    version:"3.0.0", date:"Sep 08 2025", tag:"major",
    headline:"Full redesign — Manifest V3 & Pomodoro",
    summary:"Tab Time Tracker 3.0 is a ground-up rebuild for Chrome's Manifest V3. The popup UI is completely redesigned, Pomodoro focus mode ships for the first time.",
    highlight:"Pomodoro Focus Mode",
    changes:[
      {kind:"new",     text:"Rebuilt for Manifest V3 — service worker replaces background page."},
      {kind:"new",     text:"Pomodoro focus mode with 25 / 45 / 60 min presets and per-session site blocking."},
      {kind:"new",     text:"Per-site daily limits with browser notifications."},
      {kind:"new",     text:"Completely redesigned popup with Summary, Analytics, Focus, and Settings tabs."},
      {kind:"new",     text:"7-day and 30-day bar charts using Chart.js (bundled, no CDN dependency)."},
      {kind:"new",     text:"Ignore list: exclude internal company domains or localhost from tracking."},
      {kind:"improved",text:"Tracking accuracy improved — idle gaps > 60s are excluded automatically."},
      {kind:"improved",text:"Midnight reset is now alarm-based — no more missed resets."},
      {kind:"removed", text:"MV2 background.js and popup from v2.x — not compatible with new architecture."},
    ],
  },
  {
    version:"2.8.3", date:"Jun 21 2025",
    headline:"Final MV2 release",
    summary:"Last maintenance release on the Manifest V2 architecture before the 3.0 rebuild.",
    changes:[
      {kind:"fixed",   text:"Background page crashed on Chrome 115 due to deprecated chrome.tabs.onActivated argument shape."},
      {kind:"fixed",   text:"Total time occasionally double-counted when switching tabs faster than 500ms."},
      {kind:"improved",text:"Added deprecation notice prompting users to update to v3 when available."},
    ],
  },
];

export const KIND_CONFIG: Record<ChangeKind,{label:string;color:string;bg:string;border:string;icon:string}> = {
  new:      {label:"New",      color:"#10B981",bg:"#ECFDF5",border:"#A7F3D0",icon:"✦"},
  improved: {label:"Improved", color:"#3B82F6",bg:"#EFF6FF",border:"#BFDBFE",icon:"↑"},
  fixed:    {label:"Fixed",    color:"#F97316",bg:"#FFF7ED",border:"#FED7AA",icon:"✓"},
  removed:  {label:"Removed",  color:"#EF4444",bg:"#FEF2F2",border:"#FECACA",icon:"−"},
  security: {label:"Security", color:"#8B5CF6",bg:"#F5F3FF",border:"#DDD6FE",icon:"⚠"},
};

export const TAG_CONFIG: Record<"latest"|"major"|"hotfix"|"comingSoon"|"failed",{label:string;color:string;bg:string;border:string}> = {
  latest:  {label:"Latest",  color:"#10B981",bg:"#ECFDF5",border:"#A7F3D0"},
  major:   {label:"Major",   color:"#7C3AED",bg:"#F5F3FF",border:"#DDD6FE"},
  hotfix:  {label:"Hotfix",  color:"#F97316",bg:"#FFF7ED",border:"#FED7AA"},
  comingSoon: {label:"Coming Soon", color:"#10B981",bg:"#F9FAFB",border:"#A7F3D0"},
  failed: {label:"Failed", color:"#EF4444",bg:"#FEF2F2",border:"#FECACA"},
};

export const TIPS = [
  { icon: Brain, title: "The 2-minute rule", tip: "If you catch yourself on a distracting site, set a 2-minute timer. When it rings, decide consciously whether to stay. Most of the time, you'll leave.", tag: "Psychology" },
  { icon: Apple, title: "Why 25 minutes?", tip: "Francesco Cirillo tested dozens of intervals. 25 minutes was the sweet spot where focus is deep but fatigue hasn't set in. Our brains work in ~90-minute ultradian cycles.", tag: "Science" },
  { icon: BarChart, title: "The average person…", tip: "…switches tasks every 40 seconds when at a computer. It takes ~23 minutes to fully regain deep focus after each switch. Tracking helps you see the true cost.", tag: "Research" },
  { icon: Lightbulb, title: "Notifications vs alerts", tip: "Browser notifications are fine — they bring you back. But site-visit alerts (like Tab Time Tracker's limit warnings) are 3× more effective at reducing overuse than app-level blocks.", tag: "Tip" },
  { icon: Trophy, title: "Streaks work", tip: "A 7-day streak triggers the \"sunk cost\" commitment effect. Users who hit 7 days are 4× more likely to maintain healthy habits for 30+ days. Don't break the chain.", tag: "Motivation" },
  { icon: Moon, title: "Evening = danger zone", tip: "The hour before bed is when most people exceed their limits. Your willpower is lowest then. Pre-scheduling a stricter evening cap removes the need for willpower entirely.", tag: "Strategy" },
  { icon: BarChart, title: "Awareness > willpower", tip: "People who track their time spend 22% less on distracting sites — even without setting any limits. Just seeing the number is enough to change behavior.", tag: "Data" },
  { icon: Lightbulb, title: "Your data stays local", tip: "Tab Time Tracker never sends your browsing data to any server. It lives in your browser's local storage. You own it — export as CSV or JSON any time.", tag: "Privacy" },
];




export const QUESTIONS = [
  {
    q: "How many hours do you spend browsing per day?",
    options: ["Less than 2h", "2–4 hours", "4–6 hours", "6+ hours"],
    scores: [1, 2, 3, 4],
  },
  {
    q: "How often do you open a new tab without a clear goal?",
    options: ["Rarely", "A few times a day", "Every hour", "Constantly"],
    scores: [1, 2, 3, 4],
  },
  {
    q: "Do you use a Pomodoro or focus timer?",
    options: ["Yes, daily", "Sometimes", "Rarely", "Never heard of it"],
    scores: [1, 2, 3, 4],
  },
  {
    q: "How often do social media sites distract you at work?",
    options: ["Never", "Once a day", "A few times", "All the time"],
    scores: [1, 2, 3, 4],
  },
  {
    q: "Do you know your #1 most visited website today?",
    options: ["Yes, exactly", "I can guess", "Not really", "No idea"],
    scores: [1, 2, 3, 4],
  },
];

export const RESULTS = [
  {
    range: [5, 9],
    title: "Focus Champion 🏆",
    desc: "Your browsing habits are already excellent! Tab Time Tracker can help you maintain your streak and spot any drift before it happens.",
    color: "#10B981",
    bg: "var(--bg-soft)",
  },
  {
    range: [10, 14],
    title: "Aware Surfer 🌊",
    desc: "You're conscious of your habits but could use a little help. Set a daily limit and watch your productivity score climb.",
    color: "#3B82F6",
    bg: "var(--bg-soft)",
  },
  {
    range: [15, 17],
    title: "Distraction Prone ⚡",
    desc: "You spend more time online than intended. Pomodoro focus mode + site blocking can give you back 1–2 hours a day.",
    color: "#F97316",
    bg: "var(--bg-soft)",
  },
  {
    range: [18, 20],
    title: "Scroll Spiral 🌀",
    desc: "Your browsing habits are costing you serious focus time. Start with a 4h daily cap and block your top 3 distracting sites. You'll feel the difference by day 3.",
    color: "#EF4444",
    bg: "var(--bg-soft)",
  },
];

export const DEMO_SITES = [
  { name: "youtube.com", emoji: Youtube, color: "#EF4444", time: 134, limit: 120 },
  { name: "twitter.com", emoji: Twitter, color: "#3B82F6", time: 63, limit: 90 },
  { name: "github.com", emoji: Github, color: "#10B981", time: 47, limit: 180 },
  { name: "reddit.com", emoji: ToyBrick, color: "#F97316", time: 38, limit: 60 },
  { name: "figma.com", emoji: Figma, color: "#8B5CF6", time: 22, limit: 120 },
];

export const UPDATES = [
  {
    version: "4.0.0",
    date: "Aug 08 2026",
    badge: "latest",
    badgeColor: "#10B981",
    badgeBg: "rgba(16,185,129,0.12)",
    icon: MousePointerClick,
    title: "AI Assistant retired — meet Cursor Time Alert",
    items: [
      "Your cursor glows and blinks red as a limit gets close",
      "AI Assistant, Rewards, and multi-theme Appearance removed",
      "Fixed a bug that made settings toggles behave unpredictably",
    ],
  },
  {
    version: "3.3.0",
    date: "Feb 17 2026",
    badge: "feature",
    badgeColor: "#3B82F6",
    badgeBg: "rgba(59,130,246,0.12)",
    icon: Calendar,
    title: "Scheduled work limits",
    items: [
      "Stricter site limits during work hours (9–5 default, configurable)",
      "Different caps for work vs leisure time windows",
      "Block list now supports wildcard patterns",
    ],
  },
  {
    version: "3.1.0",
    date: "Nov 30 2025",
    badge: "feature",
    badgeColor: "#F59E0B",
    badgeBg: "rgba(245,158,11,0.12)",
    icon: Calendar,
    title: "35-day activity heatmap",
    items: [
      "GitHub-style heatmap of your browsing intensity",
      "Streak counter visible in the popup header",
      "Hover any day to see exact time tracked",
    ],
  },
];