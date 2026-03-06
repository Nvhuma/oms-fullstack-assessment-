import { Label } from "./ui.jsx";

export default function FileField({ file, onPick }) {
  const fileLabel = file
    ? `${file.name} • ${(file.size / 1024 / 1024).toFixed(2)} MB`
    : "Choose a PDF or image (max 10MB)";

  return (
    <div>
      <Label>File</Label>
      <div className="mt-1 rounded-xl border border-slate-300 bg-white p-3">
        <div className="flex items-center justify-between gap-3">
          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-slate-800">{fileLabel}</p>
            <p className="mt-1 text-xs text-slate-500">
              OCR may take a few seconds for images.
            </p>
          </div>

          <label className="btn-secondary cursor-pointer">
            Browse
            <input
              type="file"
              accept="application/pdf,image/*"
              className="hidden"
              onChange={(e) => onPick(e.target.files?.[0] || null)}
            />
          </label>
        </div>
      </div>
    </div>
  );
}