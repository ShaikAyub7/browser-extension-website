"use client";
import { Mailbox } from "lucide-react";
import { useState } from "react";

export default function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 2500);
      return;
    }
    setStatus("loading");
    
    await new Promise((r) => setTimeout(r, 900));
    setStatus("success");
    setEmail("");
  };

  return (
    <section
      className="relative py-16 overflow-hidden"
      style={{ background: "var(--bg-muted)", borderTop: "1px solid var(--border)" }}
    >
      <div className="absolute inset-0 dot-grid opacity-20 pointer-events-none" />
      <div className="max-w-2xl mx-auto px-6 text-center relative z-10">

        <div className="text-3xl mb-4">
<Mailbox className="mx-auto w-12 h-12 text-gray-500" />


        </div>
        <h2 className="font-display font-extrabold text-2xl md:text-3xl mb-2" style={{ color: "var(--text-heading)" }}>
          Get release notes in your inbox
        </h2>
        <p className="mb-8 text-sm" style={{ color: "var(--text-muted)" }}>
          We email only when there&apos;s something worth reading. No spam, no marketing fluff — just changelog summaries and productivity tips. Unsubscribe anytime.
        </p>

        {status === "success" ? (
          <div
            className="inline-flex items-center gap-3 px-6 py-4 rounded-2xl text-sm font-semibold"
            style={{
              background: "rgba(16,185,129,0.12)",
              border: "1px solid rgba(16,185,129,0.3)",
              color: "#10B981",
            }}
          >
            <svg className="w-5 h-5" viewBox="0 0 20 20" fill="none">
              <circle cx="10" cy="10" r="9" fill="rgba(16,185,129,0.2)" stroke="#10B981" strokeWidth="1.5"/>
              <path d="M6.5 10.5l2.5 2.5 4.5-5" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            You&apos;re in! Check your inbox to confirm.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="flex-1 px-4 py-3 rounded-xl text-sm font-medium outline-none transition-all"
              style={{
                background: "var(--card-bg)",
                border: `1px solid ${status === "error" ? "#EF4444" : "var(--border)"}`,
                color: "var(--text-body)",
                boxShadow: status === "error" ? "0 0 0 3px rgba(239,68,68,0.15)" : "none",
              }}
              disabled={status === "loading"}
            />
            <button
              type="submit"
              className="btn-primary px-6 py-3 rounded-xl text-sm font-bold font-display flex items-center justify-center gap-2 min-w-[120px]"
              disabled={status === "loading"}
            >
              {status === "loading" ? (
                <>
                  <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="rgba(255,255,255,0.3)" strokeWidth="2"/>
                    <path d="M12 2a10 10 0 0 1 10 10" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                  Subscribing
                </>
              ) : "Subscribe →"}
            </button>
          </form>
        )}

        {status === "error" && (
          <p className="text-xs mt-2" style={{ color: "#EF4444" }}>
            Please enter a valid email address.
          </p>
        )}

        <p className="text-xs font-mono mt-4" style={{ color: "var(--text-faint)" }}>
          Zero spam. Unsubscribe in one click.
        </p>
      </div>
    </section>
  );
}