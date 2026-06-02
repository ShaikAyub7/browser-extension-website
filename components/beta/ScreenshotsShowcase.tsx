import { Monitor, PanelLeft, TimerReset, Zap } from "lucide-react";

function ScreenshotCard({
  title,
  label,
  details,
}: {
  title: string;
  label: string;
  details: string;
}) {
  return (
    <div className="rounded-[1.5rem] border border-violet-100/70 bg-white/80 dark:bg-white/5 p-4 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-xs uppercase tracking-[0.22em] font-semibold" style={{ color: "var(--text-faint)" }}>
            {label}
          </p>
          <h3 className="mt-1 font-display font-bold text-lg" style={{ color: "var(--text-heading)" }}>
            {title}
          </h3>
        </div>
        <span className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold" >
          <Zap className="w-3.5 h-3.5" />
          Beta preview
        </span>
      </div>

      <div className="rounded-[1.2rem] border border-dashed border-violet-200/80 bg-[linear-gradient(180deg,rgba(255,255,255,0.95)_0%,rgba(244,240,255,0.9)_100%)] dark:bg-[linear-gradient(180deg,rgba(15,23,42,0.92)_0%,rgba(24,24,40,0.92)_100%)] p-4 min-h-[210px] flex flex-col justify-between">
        <div className="space-y-3">
          <div className="h-4 w-20 rounded-full"  />
          <div className="grid grid-cols-2 gap-3">
            <div className="h-20 rounded-2xl bg-white/80 dark:bg-white/8 border border-violet-100/60 flex items-center justify-center text-violet-600">
              <PanelLeft className="w-6 h-6" />
            </div>
            <div className="h-20 rounded-2xl bg-white/80 dark:bg-white/8 border border-violet-100/60 flex items-center justify-center text-sky-600">
              <TimerReset className="w-6 h-6" />
            </div>
          </div>
          <div className="h-20 rounded-2xl bg-white/80 dark:bg-white/8 border border-violet-100/60 flex items-center justify-center text-emerald-600">
            <Monitor className="w-6 h-6 mr-2" />
            <span className="text-sm font-semibold">{details}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ScreenshotsShowcase() {
  return (
    <section className="glass rounded-[2rem] p-7 md:p-8">
      <div className="flex flex-col gap-3 mb-6">
        <span className="inline-flex self-start rounded-full px-3 py-1 text-xs font-semibold tracking-[0.22em] uppercase bg-sky-100 text-sky-700">
          Screenshots
        </span>
        <div>
          <h2 className="font-display font-extrabold text-2xl md:text-3xl tracking-tight" style={{ color: "var(--text-heading)" }}>
            Preview the beta experience before installing it
          </h2>
          <p className="mt-2 max-w-3xl text-sm md:text-base leading-relaxed" style={{ color: "var(--text-muted)" }}>
            These mock screenshots highlight the parts of the beta users will test most often.
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <ScreenshotCard
          title="Popup overview"
          label="Main extension popup"
          details="Site summary, quick actions, and daily stats"
        />
        <ScreenshotCard
          title="Focus mode"
          label="Timer and blocking"
          details="Timer, site blocking, and quick controls"
        />
      </div>
    </section>
  );
}