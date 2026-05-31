"use client";
import { Brain, Target } from "lucide-react";
import { useState } from "react";

const QUESTIONS = [
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

const RESULTS = [
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

export default function ProductivityQuiz() {
  const [step, setStep] = useState(0); // 0 = intro, 1-5 = questions, 6 = result
  const [answers, setAnswers] = useState<number[]>([]);
  const [selected, setSelected] = useState<number | null>(null);

  const q = step >= 1 && step <= 5 ? QUESTIONS[step - 1] : null;
  const total = answers.reduce((a, b) => a + b, 0);
  const result = RESULTS.find((r) => total >= r.range[0] && total <= r.range[1]);

  const handleSelect = (score: number, idx: number) => {
    setSelected(idx);
    setTimeout(() => {
      setAnswers([...answers, score]);
      setSelected(null);
      setStep(step + 1);
    }, 400);
  };

  const reset = () => {
    setStep(0);
    setAnswers([]);
    setSelected(null);
  };

  return (
    <section className="relative py-24 overflow-hidden section-tint">
      <div className="absolute inset-0 dot-grid opacity-30 pointer-events-none" />
      <div className="max-w-2xl mx-auto px-6 relative z-10">
        <div className="text-center mb-10">
          <div className="pill mx-auto mb-5">
            <Brain className="w-4 h-4 mr-1" />
             Quick Quiz</div>
          <h2 className="font-display font-extrabold text-4xl md:text-5xl mb-4" style={{ color: "var(--text-heading)" }}>
            What&apos;s your{" "}
            <span className="gradient-text italic font-serif">distraction score?</span>
          </h2>
          <p className="text-sm" style={{ color: "var(--text-muted)" }}>
            5 quick questions · Takes 30 seconds
          </p>
        </div>

        <div className="feature-card p-8 md:p-10 text-center">
          {step === 0 && (
            <div>
              <div className="text-6xl mb-6">
                <Target className="mx-auto text-violet-500 w-12 h-12" />
              </div>
              <h3 className="font-display font-bold text-2xl mb-3" style={{ color: "var(--text-heading)" }}>
                Find your Productivity Profile
              </h3>
              <p className="mb-8" style={{ color: "var(--text-muted)" }}>
                Answer 5 honest questions and we&apos;ll tell you exactly how Tab Time Tracker can help you reclaim your focus.
              </p>
              <button
                onClick={() => setStep(1)}
                className="btn-primary px-8 py-3.5 rounded-2xl font-display font-bold text-base"
              >
                Start the quiz →
              </button>
            </div>
          )}

          {step >= 1 && step <= 5 && q && (
            <div>
              {/* Progress */}
              <div className="flex gap-1 mb-8 justify-center">
                {QUESTIONS.map((_, i) => (
                  <div
                    key={i}
                    className="h-1.5 rounded-full transition-all duration-500"
                    style={{
                      width: i < step - 1 ? "40px" : i === step - 1 ? "56px" : "24px",
                      background: i < step ? "#7C3AED" : "var(--border)",
                    }}
                  />
                ))}
              </div>

              <p className="text-xs font-mono mb-4" style={{ color: "var(--text-faint)" }}>
                Question {step} of {QUESTIONS.length}
              </p>
              <h3 className="font-display font-bold text-xl md:text-2xl mb-8" style={{ color: "var(--text-heading)" }}>
                {q.q}
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {q.options.map((opt, i) => (
                  <button
                    key={opt}
                    onClick={() => handleSelect(q.scores[i], i)}
                    className="px-5 py-3.5 rounded-xl text-sm font-semibold text-left transition-all duration-200 border"
                    style={{
                      background:
                        selected === i
                          ? "linear-gradient(135deg,#6025C9,#7C3AED)"
                          : "var(--card-bg)",
                      color: selected === i ? "#fff" : "var(--text-body)",
                      borderColor: selected === i ? "#7C3AED" : "var(--border)",
                      transform: selected === i ? "scale(1.02)" : "scale(1)",
                      boxShadow: selected === i ? "0 4px 20px rgba(124,58,237,0.3)" : "none",
                    }}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 6 && result && (
            <div>
              <div className="w-20 h-20 rounded-2xl flex items-center justify-center text-4xl mx-auto mb-6"
                style={{ background: result.bg, border: `2px solid ${result.color}20` }}>
                {result.title.split(" ").pop()}
              </div>
              <p className="text-xs font-mono mb-2" style={{ color: "var(--text-faint)" }}>
                Your score: {total}/20
              </p>
              <h3 className="font-display font-extrabold text-2xl mb-4" style={{ color: result.color }}>
                {result.title.split(" ").slice(0, -1).join(" ")}
              </h3>
              <p className="text-base leading-relaxed mb-8" style={{ color: "var(--text-body)" }}>
                {result.desc}
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <a
                  href="#install"
                  className="btn-primary px-7 py-3 rounded-xl font-display font-bold text-sm"
                >
                  Get Tab Time Tracker →
                </a>
                <button
                  onClick={reset}
                  className="btn-secondary px-7 py-3 rounded-xl font-display font-bold text-sm"
                >
                  Retake quiz
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
