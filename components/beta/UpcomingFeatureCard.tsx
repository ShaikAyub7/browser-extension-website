import type { LucideIcon } from "lucide-react";

type FeatureItem = {
  title: string;
  description: string;
  icon: LucideIcon;
};

export default function UpcomingFeatureCard({
  eyebrow,
  title,
  description,
  features,
  accentClassName,
}: {
  eyebrow: string;
  title: string;
  description: string;
  features: FeatureItem[];
  accentClassName: string;
}) {
  return (
    <section className="glass rounded-[2rem] shadow-[0_20px_80px_rgba(15,23,42,0.06)] p-7 md:p-8">
      <div className="flex flex-col gap-3 mb-6">
        <span className={`inline-flex self-start rounded-full px-3 py-1 text-xs font-semibold tracking-[0.22em] uppercase ${accentClassName}`}>
          {eyebrow}
        </span>
        <div>
          <h2 className="font-display font-extrabold text-2xl md:text-3xl tracking-tight" style={{ color: "var(--text-heading)" }}>
            {title}
          </h2>
          <p className="mt-2 max-w-3xl text-sm md:text-base leading-relaxed" style={{ color: "var(--text-muted)" }}>
            {description}
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {features.map((feature) => {
          const Icon = feature.icon;

          return (
            <div key={feature.title} className="feature-card p-5">
              <div className="flex items-start gap-3">
                <div className="w-11 h-11 rounded-2xl flex items-center justify-center flex-shrink-0" style={{ background: "var(--pill-bg)", color: "var(--pill-color)" }}>
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-lg" style={{ color: "var(--text-heading)" }}>
                    {feature.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
                    {feature.description}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}