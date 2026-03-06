"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, Badge, Button, Spinner } from "./_components/ui.jsx";
import FormField from "./_components/FormField.jsx";
import FileField from "./_components/FileField.jsx";
import { setResult } from "./lib/resultStore.js";

export default function UploadPage() {
  const router = useRouter();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dob, setDob] = useState("");
  const [file, setFile] = useState(null);

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const apiBase = useMemo(
    () => process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000",
    []
  );

  const canSubmit =
    firstName.trim() && lastName.trim() && dob.trim() && file && !submitting;

  async function onSubmit(e) {
    e.preventDefault();
    setError("");

    if (!file) return setError("Please choose a PDF or image to upload.");
    if (!firstName.trim()) return setError("First name is required.");
    if (!lastName.trim()) return setError("Last name is required.");
    if (!dob.trim()) return setError("Date of birth is required.");

    const formData = new FormData();
    formData.append("file", file);
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("dob", dob);

    try {
      setSubmitting(true);

      const res = await fetch(`${apiBase}/api/upload`, { method: "POST", body: formData });
      const data = await res.json().catch(() => null);

      if (!res.ok) {
        setError(data?.message || "Upload failed. Please try again.");
        return;
      }

      setResult(data);
      router.push("/result");
    } catch {
      setError("Network error. Make sure the backend is running on port 5000.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
      <Card>
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-lg font-semibold tracking-tight">Upload a document</h2>
            <p className="mt-1 text-sm text-slate-600">
              Submit a PDF or image. The API extracts raw text and calculates age from DOB.
            </p>
          </div>
          <Badge>POST /api/upload</Badge>
        </div>

        <form className="mt-6 space-y-5" onSubmit={onSubmit}>
          <div className="grid gap-4 sm:grid-cols-2">
            <FormField
              label="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="e.g., Jane"
            />
            <FormField
              label="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="e.g., Doe"
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <FormField
                label="Date of Birth"
                type="date"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
              />
              <p className="helper">Used only for age calculation.</p>
            </div>

            <FileField file={file} onPick={setFile} />
          </div>

          {error ? (
            <div className="rounded-xl border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-800">
              {error}
            </div>
          ) : null}

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <Button type="submit" disabled={!canSubmit}>
              {submitting ? (
                <span className="inline-flex items-center gap-2">
                  <Spinner /> Processing...
                </span>
              ) : (
                "Submit"
              )}
            </Button>

            <p className="text-xs text-slate-600">
              Backend should be running on <span className="kbd">localhost:5000</span>.
            </p>
          </div>
        </form>
      </Card>

      <Card>
        <h3 className="text-sm font-semibold">What the server returns</h3>
        <p className="mt-1 text-sm text-slate-600">
          JSON fields returned by the API:
        </p>

        <ul className="mt-4 space-y-3 text-sm">
          <li className="flex items-start gap-3">
            <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-indigo-500" />
            <div>
              <p className="font-medium">Full Name</p>
              <p className="text-slate-600">First name + last name</p>
            </div>
          </li>

          <li className="flex items-start gap-3">
            <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-emerald-500" />
            <div>
              <p className="font-medium">Age</p>
              <p className="text-slate-600">Calculated from DOB</p>
            </div>
          </li>

          <li className="flex items-start gap-3">
            <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-pink-500" />
            <div>
              <p className="font-medium">Raw Extracted Text</p>
              <p className="text-slate-600">From pdf-parse or OCR</p>
            </div>
          </li>
        </ul>

        <div className="mt-6 rounded-xl border border-slate-200 bg-white p-4">
          <p className="text-xs font-medium text-slate-700">Tip</p>
          <p className="mt-1 text-xs text-slate-600">
            For OCR, a clear, high-contrast image improves text extraction.
          </p>
        </div>
      </Card>
    </div>
  );
}
