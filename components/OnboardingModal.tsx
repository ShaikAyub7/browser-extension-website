"use client";
import { useState } from "react";

export default function OnboardingModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [step, setStep] = useState(0);
  const steps = [
    {
      title: "Add the extension",
      desc: "Click the browser store link and install the extension for your browser.",
    },
    {
      title: "Pin the extension",
      desc: "Pin the extension to keep it visible on your toolbar for quick access.",
    },
    {
      title: "Start a focus session",
      desc: "Open the extension and start a Focus session to block distractions.",
    },
    {
      title: "Explore settings",
      desc: "Open the dashboard to customize site limits, sync settings, and preferences.",
    },
  ];

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="bg-white dark:bg-[#0b0620] rounded-2xl shadow-2xl p-6 w-[92%] max-w-lg z-10">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-xl font-display font-extrabold mb-1" style={{ color: "var(--text-heading)" }}>
              {steps[step].title}
            </h3>
            <p className="text-sm" style={{ color: "var(--text-muted)" }}>{steps[step].desc}</p>
          </div>
          <button onClick={onClose} aria-label="Close" className="text-sm font-medium text-violet-600">Close</button>
        </div>

        <div className="mt-6">
          <div className="h-40 rounded-md bg-gray-50 dark:bg-[#071022] border border-dashed flex items-center justify-center text-sm text-gray-500">
            {/* Placeholder visual for each step */}
            <div className="p-4 text-center">
              <div className="mb-2 font-semibold">Step {step + 1} visual</div>
              <div className="text-xs">(This is a lightweight guided demo — replace with screenshots or short gifs.)</div>
            </div>
          </div>

          <div className="flex items-center justify-between mt-4">
            <button
              onClick={() => setStep(Math.max(0, step - 1))}
              disabled={step === 0}
              className="px-4 py-2 rounded-md border"
            >
              Back
            </button>
            <div className="flex gap-1 items-center">
              {steps.map((_, i) => (
                <div key={i} className={`w-2 h-2 rounded-full ${i === step ? "bg-violet-600" : "bg-gray-300"}`}></div>
              ))}
            </div>
            <button
              onClick={() => {
                if (step >= steps.length - 1) onClose();
                else setStep((s) => s + 1);
              }}
              className="px-4 py-2 rounded-md btn-primary"
            >
              {step >= steps.length - 1 ? "Done" : "Next"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
