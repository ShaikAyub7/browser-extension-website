"use client";
import { useState, useEffect } from "react";

export default function PersonalizedOnboarding() {
  const [step, setStep] = useState(0);
  const [pref, setPref] = useState<{ focusLength?: number; blockList?: string[] }>({});
  useEffect(() => {
    const saved = localStorage.getItem("tt_prefs_v1");
    if (saved) setPref(JSON.parse(saved));
  }, []);

  const save = () => {
    localStorage.setItem("tt_prefs_v1", JSON.stringify(pref));
    setStep(2);
  };

  if (step === 2) {
    return (
      <div className="rounded-xl p-4 bg-white dark:bg-[#071022] border shadow-sm">
        <div className="font-semibold mb-2">All set — personalized tips ready</div>
        <div className="text-sm text-gray-500">We saved your preferences locally. You can update them later in the dashboard.</div>
      </div>
    );
  }

  return (
    <div className="rounded-xl p-4 bg-white dark:bg-[#071022] border shadow-sm">
      <div className="mb-3">
        <h4 className="font-display font-bold">Customize your experience</h4>
        <p className="text-sm text-gray-500">A few quick choices to tailor tips and defaults.</p>
      </div>

      <div className="mb-3">
        <label className="text-xs font-mono">Default focus length (minutes)</label>
        <div className="mt-1 flex gap-2">
          {[15, 25, 45].map((m) => (
            <button
              key={m}
              onClick={() => setPref((p) => ({ ...p, focusLength: m }))}
              className={`px-3 py-1 rounded-full ${pref.focusLength === m ? "bg-violet-600 text-white" : "bg-gray-100"}`}
            >
              {m}m
            </button>
          ))}
        </div>
      </div>

      <div className="mb-3">
        <label className="text-xs font-mono">Quick block list</label>
        <div className="mt-2 flex gap-2 flex-wrap">
          {["youtube.com", "twitter.com", "reddit.com"].map((s) => (
            <button
              key={s}
              onClick={() => setPref((p) => ({ ...p, blockList: Array.from(new Set([...(p.blockList||[]), s])) }))}
              className="px-2 py-1 rounded-md bg-gray-100 text-sm"
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-end gap-2">
        <button onClick={() => setStep(0)} className="px-3 py-1 rounded-md border">Cancel</button>
        <button onClick={save} className="px-3 py-1 rounded-md btn-primary">Save</button>
      </div>
    </div>
  );
}
