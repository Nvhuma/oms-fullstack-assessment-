import express from "express";
import cors from "cors";
import { uploadRouter } from "./routes/upload.js";

const app = express();

// Allow requests from the Next.js frontend (local dev).
// In production you would lock this down to the real domain.
app.use(cors({
  origin: ["http://localhost:3000"],
}));

// Health check endpoint
app.get("/health", (_req, res) => {
  res.json({ ok: true });
});

// Main API routes
app.use("/api", uploadRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Backend API listening on http://localhost:${PORT}`);
});
