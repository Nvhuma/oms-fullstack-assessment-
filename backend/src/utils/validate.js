/**
 * Centralized validation for the upload endpoint.
 * Returns:
 *  - { ok: true } on success
 *  - { ok: false, message: string } on failure
 */
const IMAGE_MIME = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/bmp",
  "image/tiff",
  "image/gif",
]);

export function validateUploadInput({ file, firstName, lastName, dob }) {
  if (!file) return { ok: false, message: "A file is required (PDF or image)." };

  const f = String(firstName || "").trim();
  const l = String(lastName || "").trim();
  const d = String(dob || "").trim();

  if (!f) return { ok: false, message: "First name is required." };
  if (!l) return { ok: false, message: "Last name is required." };
  if (!d) return { ok: false, message: "Date of birth is required." };

  const parsed = new Date(d);
  if (Number.isNaN(parsed.getTime())) {
    return { ok: false, message: "Date of birth must be a valid date (YYYY-MM-DD)." };
  }

  if (parsed > new Date()) {
    return { ok: false, message: "Date of birth cannot be in the future." };
  }

  const mimetype = file.mimetype || "";
  const isPdf = mimetype === "application/pdf";
  const isImage = IMAGE_MIME.has(mimetype);

  if (!isPdf && !isImage) {
    return {
      ok: false,
      message: "Unsupported file type. Upload a PDF or a common image type (png/jpg/webp/bmp/tiff/gif).",
    };
  }

  return { ok: true };
}
