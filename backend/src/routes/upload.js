import express from "express";
import multer from "multer";
import { validateUploadInput } from "../utils/validate.js";
import { calculateAge } from "../utils/age.js";
import { extractRawText } from "../services/extractText.js";

export const uploadRouter = express.Router();

/**
 * Multer in-memory storage:
 * - Keeps the uploaded file in memory (Buffer) rather than writing to disk.
 * - Simpler for a coding assessment and avoids cleanup steps.
 */
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB max to prevent abuse
  },
});

uploadRouter.post("/upload", upload.single("file"), async (req, res) => {
  try {
    const file = req.file;
    const { firstName, lastName, dob } = req.body;

    const validation = validateUploadInput({ file, firstName, lastName, dob });
    if (!validation.ok) {
      return res.status(400).json({ message: validation.message });
    }

    const fullName = `${firstName.trim()} ${lastName.trim()}`;
    const age = calculateAge(dob);

    // Extract raw text based on file type (PDF vs image).
    const rawText = await extractRawText(file);

    return res.json({ fullName, age, rawText });
  } catch (err) {
    console.error("Upload processing error:", err);
    return res.status(500).json({ message: "Server error while processing upload." });
  }
});
