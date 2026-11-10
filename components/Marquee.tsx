const W = ["Track every tab", "Block distractions", "Pomodoro focus", "Weekly reports", "100% private", "Zero sign-up", "Keyboard-first"];
export default function Marquee() {
  return (
    <div className="py-6 overflow-hidden border-y" style={{ background: "var(--text-heading)", borderColor: "var(--border)" }}>
      <div className="marquee-track flex w-max gap-10">
        {[...W, ...W, ...W, ...W].map((w, i) => (
          <span key={i} className="font-serif italic text-3xl sm:text-4xl flex items-center gap-10" style={{ color: "var(--bg)" }}>
            {w} <span style={{ color: "var(--violet-500)" }}>✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
