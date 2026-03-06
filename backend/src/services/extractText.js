import pdfParse from "pdf-parse";
import { createWorker } from "tesseract.js";

const IMAGE_MIME = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/bmp",
  "image/tiff",
  "image/gif",
]);

/**
 * Extract raw text from an uploaded file:
 * - PDF: pdf-parse on Buffer
 * - Image: Tesseract OCR on Buffer
 */
export async function extractRawText(file) {
  const mimetype = file?.mimetype || "";

  if (mimetype === "application/pdf") {
    const parsed = await pdfParse(file.buffer);
    return (parsed?.text || "").trim();
  }

  if (IMAGE_MIME.has(mimetype)) {
    const worker = await createWorker("eng");
    try {
      const { data } = await worker.recognize(file.buffer);
      return (data?.text || "").trim();
    } finally {
      await worker.terminate();
    }
  }

  return "";
}
