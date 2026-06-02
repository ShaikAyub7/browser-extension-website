import {
  BriefcaseBusiness,
  Clock3,
  Code2,
  Database,
  Github,
  Globe,
  GraduationCap,
  LayoutGrid,
  ListChecks,
  Mail,
  MessageCircle,
  Monitor,
  Palette,
  Search,
  ShoppingCart,
  TimerReset,
  TrendingUp,
  Youtube,
  type LucideIcon,
} from "lucide-react";

export type DashboardItem = {
  id: string;
  name: string;
  minutes: number;
  sessions: number;
  color: string;
  bg: string;
};

function formatMinutes(totalMinutes: number) {
  const totalSeconds = Math.max(0, Math.round(totalMinutes * 60));
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  if (hours === 0 && minutes === 0) return `${seconds}s`;
  if (hours === 0) {
    return seconds ? `${minutes}m ${seconds}s` : `${minutes}m`;
  }

  return minutes ? `${hours}h ${minutes}m` : `${hours}h`;
}

function getSiteIcon(siteName: string): LucideIcon {
  const site = siteName.toLowerCase();

  if (site.includes("youtube")) return Youtube;
  if (site.includes("github")) return Github;
  if (site.includes("google")) return Search;
  if (site.includes("mail")) return Mail;
  if (site.includes("chatgpt") || site.includes("claude")) return MessageCircle;
  if (site.includes("localhost") || site.includes("127.0.0.1")) return Monitor;
  if (site.includes("shopify") || site.includes("amazon") || site.includes("flipkart") || site.includes("shopping")) return ShoppingCart;
  if (site.includes("udemy") || site.includes("course") || site.includes("learning")) return GraduationCap;
  if (site.includes("figma") || site.includes("dribbble") || site.includes("palette")) return Palette;
  if (site.includes("vercel")) return LayoutGrid;
  if (site.includes("mongodb") || site.includes("firebase") || site.includes("cloud")) return Database;
  if (site.includes("linkedin") || site.includes("indeed") || site.includes("career") || site.includes("jobs")) return BriefcaseBusiness;
  if (site.includes("nextjs") || site.includes("react") || site.includes("code") || site.includes("dev")) return Code2;

  return Globe;
}

export default function DashboardOverview({
  fileName,
  source,
  totalMinutes,
  totalSessions,
  averageMinutes,
  topItem,
  items,
}: {
  fileName: string;
  source: string;
  totalMinutes: number;
  totalSessions: number;
  averageMinutes: number;
  topItem?: DashboardItem;
  items: DashboardItem[];
}) {
  return (
    <section className="glass rounded-[2rem] p-7 md:p-8">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-6">
        <div>
          <span className="pill mb-4 inline-flex">Dashboard overview</span>
          <h2 className="font-display font-extrabold text-3xl md:text-4xl tracking-tight" style={{ color: "var(--text-heading)" }}>
            {fileName}
          </h2>
          <p className="mt-2 text-sm md:text-base" style={{ color: "var(--text-muted)" }}>
            Source: {source} · {items.length} tracked sites imported
          </p>
        </div>
        <div className="text-sm" style={{ color: "var(--text-faint)" }}>
          Updated from uploaded data
        </div>
      </div>

      <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
        <MetricCard icon={Clock3} label="Total time" value={formatMinutes(totalMinutes)} />
        <MetricCard icon={ListChecks} label="Tracked sites" value={`${items.length}`} />
        <MetricCard icon={TimerReset} label="Sessions" value={`${totalSessions}`} />
        <MetricCard icon={TrendingUp} label="Average per site" value={formatMinutes(averageMinutes)} />
      </div>

      <div className="grid lg:grid-cols-[1fr_0.95fr] gap-6">
        <div className="rounded-[1.5rem] border border-violet-100/70 bg-white/75 dark:bg-white/5 p-5">
          <h3 className="font-display font-bold text-xl mb-4" style={{ color: "var(--text-heading)" }}>
            Top sites
          </h3>

          <div className="space-y-4">
            {[...items].sort((a, b) => b.minutes - a.minutes).slice(0, 5).map((item) => {
              const width = totalMinutes ? Math.max(8, Math.round((item.minutes / totalMinutes) * 100)) : 0;
              const SiteIcon = getSiteIcon(item.name);

              return (
                <div key={item.id} className="space-y-2">
                  <div className="flex items-center justify-between gap-4 text-sm">
                    <div className="flex items-center gap-3 min-w-0">
                      <SiteIconBadge color={item.color} bg={item.bg} Icon={SiteIcon} />
                      <span className="font-semibold truncate" style={{ color: "var(--text-heading)" }}>{item.name}</span>
                    </div>
                    <span className="font-medium whitespace-nowrap" style={{ color: "var(--text-muted)" }}>{formatMinutes(item.minutes)}</span>
                  </div>
                  <div className="h-3 rounded-full bg-black/5 dark:bg-white/10 overflow-hidden">
                    <div className="h-full rounded-full" style={{ width: `${width}%`, background: item.color }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="rounded-[1.5rem] border border-violet-100/70 bg-white/75 dark:bg-white/5 p-5">
          <h3 className="font-display font-bold text-xl mb-4" style={{ color: "var(--text-heading)" }}>
            Highlights
          </h3>

          {topItem ? (
            <div className="rounded-2xl border border-violet-100/70 bg-white/80 dark:bg-white/5 p-5 mb-4">
              <p className="text-xs uppercase tracking-[0.22em] font-semibold mb-2" style={{ color: "var(--text-faint)" }}>
                Most used site
              </p>
              <div className="flex items-center gap-3">
                <SiteIconBadge color={topItem.color} bg={topItem.bg} Icon={getSiteIcon(topItem.name)} />
                <div>
                  <h4 className="font-display font-bold text-2xl mb-1" style={{ color: "var(--text-heading)" }}>
                    {topItem.name}
                  </h4>
                  <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                    {formatMinutes(topItem.minutes)} across {topItem.sessions} sessions
                  </p>
                </div>
              </div>
            </div>
          ) : null}

          <div className="space-y-3 text-sm" style={{ color: "var(--text-muted)" }}>
            <p>• Upload JSON or CSV exports to replace the sample data.</p>
            <p>• The website can&apos;t read extension storage directly, so uploads keep the flow privacy-friendly.</p>
            <p>• This dashboard is ready for future sync or login-based data sources.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function MetricCard({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-violet-100/70 bg-white/75 dark:bg-white/5 p-4 flex items-center gap-3">
      <div className="w-11 h-11 rounded-2xl flex items-center justify-center" style={{ background: "var(--pill-bg)", color: "var(--pill-color)" }}>
        <Icon className="w-5 h-5" />
      </div>
      <div>
        <p className="text-xs uppercase tracking-[0.22em] font-semibold" style={{ color: "var(--text-faint)" }}>
          {label}
        </p>
        <p className="mt-1 font-display font-bold text-lg" style={{ color: "var(--text-heading)" }}>
          {value}
        </p>
      </div>
    </div>
  );
}

function SiteIconBadge({
  color,
  bg,
  Icon,
}: {
  color: string;
  bg: string;
  Icon: LucideIcon;
}) {
  return (
    <div className="w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0" style={{ background: bg, color }} aria-hidden="true">
      <Icon className="w-5 h-5" />
    </div>
  );
}