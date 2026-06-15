"use client";

import { useEffect, useMemo, useState } from "react";
import { BarChart3, CircleAlert, Clock3, Database, FileJson2, FileText, RefreshCw, Upload, ArrowUpRight } from "lucide-react";
import { redirect } from "next/navigation";

type SiteEntry = {
  site: string;
  minutes: number;
};

type DashboardData = {
  sourceName: string;
  importedAt: string;
  totalMinutes: number;
  activeDays: number;
  topSites: SiteEntry[];
  note: string;
};


function formatMinutes(minutes: number) {
  const totalSeconds = Math.max(0, Math.round(minutes * 60));
  const hours = Math.floor(totalSeconds / 3600);
  const remainderMinutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  if (hours === 0 && remainderMinutes === 0) {
    return `${seconds}s`;
  }

  if (hours === 0) {
    return seconds ? `${remainderMinutes}m ${seconds}s` : `${remainderMinutes}m`;
  }

  return remainderMinutes ? `${hours}h ${remainderMinutes}m` : `${hours}h`;
}

function splitCsvLine(line: string) {
  const cells: string[] = [];
  let current = "";
  let inQuotes = false;

  for (let index = 0; index < line.length; index += 1) {
    const character = line[index];

    if (character === '"') {
      if (inQuotes && line[index + 1] === '"') {
        current += '"';
        index += 1;
      } else {
        inQuotes = !inQuotes;
      }
      continue;
    }

    if (character === "," && !inQuotes) {
      cells.push(current.trim());
      current = "";
      continue;
    }

    current += character;
  }

  cells.push(current.trim());
  return cells;
}

function normalizeKey(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "");
}

function parseNumber(value: unknown) {
  if (typeof value === "number" && Number.isFinite(value)) {
    return value;
  }

  if (typeof value === "string") {
    const cleaned = value.replace(/[^0-9.]/g, "");
    const parsed = Number(cleaned);
    return Number.isFinite(parsed) ? parsed : 0;
  }

  return 0;
}

function parseMinutesFromRecord(record: Record<string, unknown>) {
  const directMinutes =
    record.minutes ??
    record.minute ??
    record.time_minutes ??
    record.runtime_min ??
    record.runtime_minutes ??
    record.total_minutes ??
    record.totalMinutes ??
    record.duration_minutes;

  if (typeof directMinutes === "number") {
    return directMinutes;
  }

  if (typeof directMinutes === "string" && directMinutes.trim()) {
    const parsed = parseNumber(directMinutes);
    if (parsed > 0) {
      return parsed;
    }
  }

  const runtimeMs = record.runtime_ms ?? record.runtimeMilliseconds ?? record.runtime;
  if (typeof runtimeMs === "number" && Number.isFinite(runtimeMs)) {
    return runtimeMs / 60000;
  }

  if (typeof runtimeMs === "string" && runtimeMs.trim()) {
    const parsed = parseNumber(runtimeMs);
    if (parsed > 0) {
      return parsed / 60000;
    }
  }

  const fallbackTime = record.time ?? record.duration ?? record.totalTime ?? record.spent;
  return parseNumber(fallbackTime);
}

function parseSessionsFromRecord(record: Record<string, unknown>) {
  const sessions = record.sessions ?? record.session_count ?? record.visits ?? record.count;
  const parsed = parseNumber(sessions);
  return parsed > 0 ? parsed : 1;
}

function normalizeSiteName(value: unknown) {
  if (typeof value !== "string") {
    return "unknown";
  }

  const trimmed = value.trim();
  if (!trimmed) {
    return "unknown";
  }

  return trimmed.replace(/^https?:\/\//i, "").replace(/^www\./i, "").split("/")[0].toLowerCase();
}

function aggregateEntries(entries: Array<Record<string, unknown>>) {
  const totals = new Map<string, number>();

  entries.forEach((entry) => {
    const site = normalizeSiteName(entry.site ?? entry.domain ?? entry.name ?? entry.url);
    const minutes = parseMinutesFromRecord(entry);

    totals.set(site, (totals.get(site) ?? 0) + minutes);
  });

  return Array.from(totals.entries())
    .map(([site, minutes]) => ({ site, minutes }))
    .sort((left, right) => right.minutes - left.minutes)
    .filter((entry) => entry.minutes > 0);
}

function parseJsonDashboard(text: string): DashboardData | null {
  const parsed = JSON.parse(text) as unknown;

  if (Array.isArray(parsed)) {
    const topSites = aggregateEntries(parsed.filter((item): item is Record<string, unknown> => Boolean(item) && typeof item === "object"));
    if (!topSites.length) {
      return null;
    }

    const totalMinutes = topSites.reduce((sum, entry) => sum + entry.minutes, 0);
    return {
      sourceName: "Imported JSON",
      importedAt: new Date().toLocaleString(),
      totalMinutes,
      activeDays: 1,
      topSites,
      note: "Imported from a JSON export file.",
    };
  }

  if (parsed && typeof parsed === "object") {
    const record = parsed as Record<string, unknown>;
    const sourceName = typeof record.sourceName === "string" ? record.sourceName : "Imported JSON";
    const activeDays = Math.max(1, Math.floor(parseNumber(record.activeDays ?? record.days ?? record.dayCount)) || 1);

    let topSites: SiteEntry[] = [];

    const candidateArrays = [record.topSites, record.sites, record.records, record.entries, record.data].filter(Array.isArray) as Array<Array<Record<string, unknown>>>;
    if (candidateArrays.length > 0) {
      topSites = aggregateEntries(candidateArrays[0]);
    } else if (typeof record.totalMinutes === "number" || typeof record.total_minutes === "number") {
      const totalMinutes = parseNumber(record.totalMinutes ?? record.total_minutes);
      topSites = [{ site: "all sites", minutes: totalMinutes }];
    }

    if (!topSites.length) {
      return null;
    }

    const totalMinutes = parseNumber(record.totalMinutes ?? record.total_minutes) || topSites.reduce((sum, entry) => sum + entry.minutes, 0);

    return {
      sourceName,
      importedAt: new Date().toLocaleString(),
      totalMinutes,
      activeDays,
      topSites,
      note: "Imported from a JSON export file.",
    };
  }

  return null;
}

function parseCsvDashboard(text: string): DashboardData | null {
  const lines = text
    .trim()
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);

  if (lines.length < 2) {
    return null;
  }

  const headers = splitCsvLine(lines[0]).map((header) => normalizeKey(header));
  const rows = lines.slice(1).map((line) => {
    const cells = splitCsvLine(line);
    return headers.reduce<Record<string, string>>((accumulator, header, index) => {
      accumulator[header] = cells[index] ?? "";
      return accumulator;
    }, {});
  });

  const entries = rows.map((row) => ({
    site: row.site ?? row.domain ?? row.name ?? row.url ?? row.hostname,
    minutes: row.minutes ?? row.time ?? row.duration ?? row.total_minutes ?? row.runtime_min ?? row.runtime_ms,
    sessions: row.sessions ?? row.session_count ?? row.visits ?? row.count,
    runtime_ms: row.runtime_ms,
    runtime: row.runtime,
  }));

  const topSites = aggregateEntries(entries as Array<Record<string, unknown>>);
  if (!topSites.length) {
    return null;
  }

  const totalMinutes = topSites.reduce((sum, entry) => sum + entry.minutes, 0);

  return {
    sourceName: "Imported CSV",
    importedAt: new Date().toLocaleString(),
    totalMinutes,
    activeDays: 1,
    topSites,
    note: "Imported from a CSV export file.",
  };
}

function parseDashboardFile(fileName: string, text: string) {
  const isJson = fileName.toLowerCase().endsWith(".json");
  const isCsv = fileName.toLowerCase().endsWith(".csv");

  if (isJson) {
    return parseJsonDashboard(text);
  }

  if (isCsv) {
    return parseCsvDashboard(text);
  }

  return null;
}

function MetricCard({
  title,
  value,
  icon: Icon,
  note,
}: {
  title: string;
  value: string;
  icon: typeof Database;
  note: string;
}) {
  return (
    <div className="feature-card p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.22em] font-semibold" style={{ color: "var(--text-faint)" }}>
            {title}
          </p>
          <p className="mt-2 text-2xl font-display font-bold" style={{ color: "var(--text-heading)" }}>
            {value}
          </p>
          <p className="mt-1 text-sm" style={{ color: "var(--text-muted)" }}>
            {note}
          </p>
        </div>

        <div className="w-11 h-11 rounded-2xl flex items-center justify-center" style={{ background: "var(--pill-bg)", color: "var(--pill-color)" }}>
          <Icon className="w-5 h-5" />
        </div>
      </div>
    </div>
  );
}
const defaultDashboard: DashboardData = {
  sourceName: "No data available",
  importedAt: "N/A",
  totalMinutes: 0,
  activeDays: 0,
  topSites: [],
  note: "Upload a file to view your dashboard.",
};

export default function DashboardClient() {
useEffect(() => {
  const data = localStorage.getItem("dashboardData");

  if (data) {
    setDashboard(JSON.parse(data));
  }
}, []);
const [dashboard, setDashboard] =
  useState<DashboardData>(defaultDashboard);
  const [error, setError] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);

  const topSite = dashboard.topSites[0] ?? { site: "unknown", minutes: 0 };
  const averagePerDay = Math.max(1, Math.round(dashboard.totalMinutes / dashboard.activeDays));
  const maxMinutes = Math.max(...dashboard.topSites.map((site) => site.minutes), 1);
 
 const handleResetToData = () => {
  localStorage.removeItem("dashboardData");
  setError(null);

  window.location.reload();
};


  const stats = useMemo(
    () => [
      {
        title: "Total tracked time",
        value: formatMinutes(dashboard.totalMinutes),
        icon: Clock3,
        note: "Imported from your extension export",
      },
      {
        title: "Active days",
        value: `${dashboard.activeDays}`,
        icon: BarChart3,
        note: "Days represented in the uploaded data",
      },
      {
        title: "Average per day",
        value: formatMinutes(averagePerDay),
        icon: RefreshCw,
        note: "Simple daily average based on the import",
      },
      {
        title: "Top site",
        value: topSite.site,
        icon: Database,
        note: `${formatMinutes(topSite.minutes)} tracked on the highest-usage site`,
      },
        
    ],
    [averagePerDay, dashboard.activeDays, dashboard.totalMinutes, topSite.minutes, topSite.site]
  );

  const handleFiles = async (files: FileList | File[] | null) => {
    const file = files && files[0];
    if (!file) {
      return;
    }

    setError(null);

    try {
      const text = await file.text();
      const parsed = parseDashboardFile(file.name, text);

      if (!parsed) {
        throw new Error("The file did not contain recognizable site usage data.");
      }

      setDashboard({
        ...parsed,
        sourceName: `${parsed.sourceName} · ${file.name}`,
      });
      localStorage.setItem("dashboardData", JSON.stringify(parsed));
    } catch (uploadError) {
      setError(uploadError instanceof Error ? uploadError.message : "Unable to read that file.");
    }
  };

  return (
    <main className="relative overflow-hidden px-6 py-20 section-violet min-h-screen">
      <div className="absolute inset-0 bg-radial-violet pointer-events-none" />
      <div className="relative z-10 max-w-7xl mx-auto space-y-8">

        {
            (dashboard.topSites?.length ?? 0) === 0  ?<section className="glass rounded-[2rem] p-8 md:p-12 ">
          <div className="pill mb-5 inline-flex">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Website dashboard
          </div>

          <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-10 items-start">
            <div>
              <h1 className="font-display font-extrabold text-4xl md:text-6xl tracking-tight mb-5" style={{ color: "var(--text-heading)" }}>
                View your browsing dashboard on the website.
              </h1>
              <p className="text-lg leading-relaxed max-w-2xl mb-6" style={{ color: "var(--text-muted)" }}>
                Upload a JSON or CSV export from the extension to build a dashboard with usage totals, top sites, and daily averages.
              </p>

              <div className="flex flex-wrap gap-3 mb-6 text-sm">
                <div className="pill">JSON exports</div>
                <div className="pill">CSV exports</div>
                <div className="pill">Local preview only</div>
              </div>

              <p className="text-sm" style={{ color: "var(--text-faint)" }}>
                The website cannot read extension storage directly. This upload flow is the bridge between the extension and this dashboard.
              </p>
            </div>

            <div className="feature-card p-5">
              <div className={`rounded-[1.5rem] border-2 border-dashed p-6 transition-colors ${dragActive ? "border-violet-400 bg-violet-50/70 dark:bg-white/5" : "border-violet-200 bg-white/70 dark:bg-white/5"}`}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-11 h-11 rounded-2xl flex items-center justify-center" style={{ background: "var(--pill-bg)", color: "var(--pill-color)" }}>
                    <Upload className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="font-display font-bold text-2xl" style={{ color: "var(--text-heading)" }}>
                      Import your data
                    </h2>
                    <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                      Drag and drop a file or pick one from your device.
                    </p>
                  </div>
                </div>

                <input
                  id="dashboard-upload"
                  type="file"
                  accept=".json,.csv,application/json,text/csv"
                  className="hidden"
                  onChange={(event) => handleFiles(event.target.files)}
                />

                <label
                  htmlFor="dashboard-upload"
                  className="block cursor-pointer rounded-2xl border border-violet-100/70 bg-white/80 dark:bg-white/5 px-5 py-10 text-center hover:border-violet-300 transition-colors"
                  onDragOver={(event) => {
                    event.preventDefault();
                    setDragActive(true);
                  }}
                  onDragLeave={() => setDragActive(false)}
                  onDrop={async (event) => {
                    event.preventDefault();
                    setDragActive(false);
                    await handleFiles(event.dataTransfer.files);
                  }}
                >
                  <Upload className="w-8 h-8 mx-auto mb-3 text-violet-500" />
                  <p className="font-display font-bold text-lg" style={{ color: "var(--text-heading)" }}>
                    Drop your export here
                  </p>
                  <p className="mt-2 text-sm" style={{ color: "var(--text-muted)" }}>
                    Accepts JSON and CSV. Export from the extension, then upload it here.
                  </p>
                </label>

                {error && (
                  <div className="mt-4 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-900 flex items-start gap-2.5">
                    <CircleAlert className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <span>{error}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>:<>
         <section className="grid md:grid-cols-2 xl:grid-cols-4 gap-4 mt-7">
          {stats.map((stat) => (
            <MetricCard key={stat.title} {...stat} />
          ))}
        </section>

        <section className="grid lg:grid-cols-[0.95fr_1.05fr] gap-6">
          <div className="glass rounded-[2rem] p-7">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-11 h-11 rounded-2xl flex items-center justify-center" style={{ background: "var(--pill-bg)", color: "var(--pill-color)" }}>
                <FileJson2 className="w-5 h-5" />
              </div>
              <div>
                <h2 className="font-display font-bold text-2xl" style={{ color: "var(--text-heading)" }}>
                  Current dataset
                </h2>
                <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                  {dashboard.sourceName}
                </p>
              </div>
            </div>

            <div className="space-y-4 text-sm" style={{ color: "var(--text-muted)" }}>
              <div className="flex items-center justify-between gap-4 rounded-2xl border border-violet-100/70 bg-white/75 dark:bg-white/5 px-4 py-3">
                <span>Imported at</span>
                <span className="font-medium" style={{ color: "var(--text-heading)" }}>{dashboard.importedAt}</span>
              </div>
              <div className="flex items-center justify-between gap-4 rounded-2xl border border-violet-100/70 bg-white/75 dark:bg-white/5 px-4 py-3">
                <span>Data note</span>
                <span className="font-medium text-right" style={{ color: "var(--text-heading)" }}>{dashboard.note}</span>
              </div>
            </div>

            <div className="mt-6 flex gap-3 flex-wrap">
             <button
                type="button"
                className="btn-secondary px-5 py-2.5 rounded-xl text-sm font-bold inline-flex items-center gap-2"
                onClick={handleResetToData}
                >
                <RefreshCw className="w-4 h-4" />
                Reset to data
                </button>
            </div>
          </div>

          <div className="glass rounded-[2rem] p-7">
            <div className="flex items-center justify-between gap-4 mb-5">
              <div>
                <h2 className="font-display font-bold text-2xl" style={{ color: "var(--text-heading)" }}>
                  Top sites
                </h2>
                <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                  Ranked by time spent in the uploaded data.
                </p>
              </div>
              <ArrowUpRight className="w-5 h-5 text-violet-500" />
            </div>

            <div className="space-y-3 overflow-y-scroll max-h-60">
        {dashboard.topSites.map((site) => {
  const width = `${Math.max(
    8,
    Math.round((site.minutes / maxMinutes) * 100)
  )}%`;

  return (
    <div
      key={site.site}
      className="rounded-2xl border border-violet-100/70 bg-white/75 dark:bg-white/5 p-4"
    >
      <div className="flex items-center justify-between gap-4 mb-3">
        <div className="flex items-center gap-3 min-w-0">
          <img
            src={`https://www.google.com/s2/favicons?domain=${site.site}&sz=64`}
            alt={`${site.site} icon`}
            className="w-5 h-5 rounded shrink-0"
          />

          <span
            className="font-medium truncate"
            style={{ color: "var(--text-heading)" }}
          >
            {site.site}
          </span>
        </div>

        <span
          className="text-sm shrink-0"
          style={{ color: "var(--text-muted)" }}
        >
          {formatMinutes(site.minutes)}
        </span>
      </div>

      <div className="h-2 rounded-full bg-violet-100/70 overflow-hidden">
        <div
          className="h-full rounded-full bg-gradient-to-r from-violet-500 to-sky-500 transition-all duration-500"
          style={{ width }}
        />
      </div>
    </div>
  );
})}
            </div>
          </div>
        </section>
        </>
        }
   

       

        <section className="glass rounded-[2rem] p-7">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-11 h-11 rounded-2xl flex items-center justify-center" style={{ background: "var(--pill-bg)", color: "var(--pill-color)" }}>
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-display font-bold text-2xl" style={{ color: "var(--text-heading)" }}>
                Supported upload format
              </h2>
              <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                If your export uses a different shape, convert it to one of these simple formats.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4 text-sm" style={{ color: "var(--text-muted)" }}>
            <div className="rounded-2xl border border-violet-100/70 bg-white/75 dark:bg-white/5 p-5">
              <p className="font-display font-bold text-base mb-2" style={{ color: "var(--text-heading)" }}>
                JSON
              </p>
              <pre className="overflow-auto text-xs leading-relaxed whitespace-pre-wrap" style={{ color: "var(--text-muted)" }}>
{`{
  "activeDays": 7,
  "topSites": [
    { "site": "youtube.com", "minutes": 138 },
    { "site": "github.com", "minutes": 92 }
  ]
}`}
              </pre>
            </div>

            <div className="rounded-2xl border border-violet-100/70 bg-white/75 dark:bg-white/5 p-5">
              <p className="font-display font-bold text-base mb-2" style={{ color: "var(--text-heading)" }}>
                CSV
              </p>
              <pre className="overflow-auto text-xs leading-relaxed whitespace-pre-wrap" style={{ color: "var(--text-muted)" }}>
{`site,minutes
youtube.com,138
github.com,92
twitter.com,74`}
              </pre>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}