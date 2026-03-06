"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Card, Badge, Button } from "../_components/ui.jsx";
import { clearResult, getResult } from "../lib/resultStore.js";

export default function ResultPage() {
  const [result, setResult] = useState(null);

  useEffect(() => {
    setResult(getResult());
  }, []);

  const hasText = useMemo(
    () => Boolean(result?.rawText && result.rawText.trim().length > 0),
    [result]
  );

  if (!result) {
    return (
      <Card>
        <h2 className="text-lg font-semibold tracking-tight">No results yet</h2>
        <p className="mt-1 text-sm text-slate-600">Upload a file first to view extracted text.</p>
        <Link href="/" className="mt-5 inline-flex w-fit btn-primary">Go to Upload Page</Link>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h2 className="text-lg font-semibold tracking-tight">Processed results</h2>
            <p className="mt-1 text-sm text-slate-600">Output from the server (no manual editing).</p>
          </div>

          <div className="flex gap-2">
            <Badge>Full Name</Badge>
            <Badge>Age</Badge>
            <Badge>Raw Text</Badge>
          </div>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <p className="text-xs text-slate-600">Full Name</p>
            <p className="mt-1 text-base font-semibold">{result.fullName}</p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <p className="text-xs text-slate-600">Age</p>
            <p className="mt-1 text-base font-semibold">{result.age}</p>
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Link href="/" className="btn-primary w-fit">Upload another file</Link>
          <Button
            type="button"
            variant="secondary"
            className="w-fit"
            onClick={() => {
              clearResult();
              window.location.href = "/";
            }}
          >
            Clear result
          </Button>
        </div>
      </Card>

      <Card>
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-sm font-semibold">Raw extracted text</h3>
            <p className="mt-1 text-sm text-slate-600">Unprocessed output from pdf-parse or OCR.</p>
          </div>

          <Badge className={hasText ? "" : "opacity-60"}>{hasText ? "Text found" : "No text"}</Badge>
        </div>

        <div className="mt-4 overflow-hidden rounded-2xl border border-slate-200 bg-white">
          <div className="border-b border-slate-200 bg-slate-50 px-4 py-2 text-xs text-slate-600">
            Output
          </div>
          <pre className="max-h-[28rem] overflow-auto whitespace-pre-wrap p-4 text-sm leading-relaxed text-slate-900">
{result.rawText || "(No text extracted)"}
          </pre>
        </div>
      </Card>
    </div>
  );
}
