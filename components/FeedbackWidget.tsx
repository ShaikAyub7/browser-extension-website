"use client";
import { useState } from "react";

export default function FeedbackWidget() {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  const [sent, setSent] = useState(false);

  const send = () => {
    if (!text.trim()) return;
    // Prototype: save feedback to localStorage with a timestamp
    try {
      const cur = JSON.parse(localStorage.getItem("tt_feedback_v1" ) || "[]");
      cur.push({ text, ts: Date.now() });
      localStorage.setItem("tt_feedback_v1", JSON.stringify(cur));
      setSent(true);
      setText("");
      setTimeout(() => setOpen(false), 900);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="fixed left-8 bottom-6 z-50">
      <div className="flex items-end flex-col gap-2">
        {open && (
          <div className="w-80 p-3 rounded-xl shadow-lg bg-white dark:bg-[#071022] border">
            <div className="text-sm mb-2 font-semibold">Send feedback</div>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="w-full p-2 rounded-md text-sm bg-gray-50 dark:bg-[#081026] border"
              rows={4}
              placeholder="What did you try? Any bugs or ideas?"
            />
            <div className="flex items-center justify-between mt-2">
              <div className="text-xs text-gray-500">{sent ? "Thanks — saved locally" : "No account required"}</div>
              <div className="flex gap-2">
                <button className="px-3 py-1 rounded-md border" onClick={() => setOpen(false)}>Close</button>
                <button className="px-3 py-1 rounded-md btn-primary" onClick={send}>Send</button>
              </div>
            </div>
          </div>
        )}

        <button
          onClick={() => setOpen((v) => !v)}
          className="bg-violet-600 text-white px-4 py-2 rounded-full shadow-lg flex items-center gap-2"
          aria-label="Open feedback"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
          <span className="text-sm font-medium">Feedback</span>
        </button>
      </div>
    </div>
  );
}
