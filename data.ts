import { Users,Clock,Star,Lock, LucideIcon, Download, Settings, Globe, BarChart } from "lucide-react";
interface Stat {
  value: number;
  suffix: string;
  label: string;
  icon: LucideIcon;
  color: string;
  bg: string;
}

export const links = [
    { href: "/features",    label: "Features" },
    { href: "/how-it-works",label: "How it works" },
    { href: "/stats",       label: "Stats" },
    { href: "/whats-new",   label: "What's new", badge: true },
    { href: "/faq",         label: "FAQ" },
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