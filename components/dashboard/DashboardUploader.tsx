import { ChangeEvent, DragEvent } from "react";
import { FileUp, RotateCcw } from "lucide-react";

export default function DashboardUploader({
  isDragging,
  error,
  onDragEnter,
  onDragLeave,
  onDrop,
  onChange,
  onReset,
}: {
  isDragging: boolean;
  error: string | null;
  onDragEnter: () => void;
  onDragLeave: () => void;
  onDrop: (event: DragEvent<HTMLDivElement>) => void;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onReset: () => void;
}) {
  return (
    <div className="space-y-4">
      <label
        className={`block rounded-[1.75rem] border-2 border-dashed px-5 py-6 text-center transition-colors cursor-pointer ${
          isDragging
            ? "border-violet-400 bg-violet-50/70 dark:bg-violet-500/10"
            : "border-violet-200/80 bg-white/70 dark:bg-white/5"
        }`}
        onDragEnter={onDragEnter}
        onDragLeave={onDragLeave}
        onDragOver={(event) => event.preventDefault()}
        onDrop={onDrop}
      >
        <input
          type="file"
          accept=".json,.csv,application/json,text/csv"
          className="sr-only"
          onChange={onChange}
        />
        <div className="mx-auto mb-3 w-12 h-12 rounded-2xl flex items-center justify-center" style={{ background: "var(--pill-bg)", color: "var(--pill-color)" }}>
          <FileUp className="w-5 h-5" />
        </div>
        <p className="font-display font-bold text-lg mb-1" style={{ color: "var(--text-heading)" }}>
          Drop your export file here
        </p>
        <p className="text-sm" style={{ color: "var(--text-muted)" }}>
          Or click to upload a JSON or CSV export from the extension.
        </p>
      </label>

      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          onClick={onReset}
          className="btn-secondary inline-flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-sm font-semibold"
        >
          <RotateCcw className="w-4 h-4" />
          Use sample data
        </button>
      </div>

      {error && (
        <div className="rounded-2xl border border-rose-200 bg-rose-50 dark:bg-rose-500/10 px-4 py-3 text-sm text-rose-900 dark:text-rose-100 flex items-start gap-2.5">
          <FileUp className="w-4 h-4 mt-0.5 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
}