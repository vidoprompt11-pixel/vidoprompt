import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

import videoRoutes from "./routes/video.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import { ensureAdmin } from "./controllers/admin.controller.js";

dotenv.config();

const app = express();

/* ---------- dirname fix ---------- */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/* ---------- middleware ---------- */
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://vidoprompt.com",
      "https://www.vidoprompt.com",
    ],
    credentials: true,
  })
);

app.use(express.json());

/* ---------- routes ---------- */
app.use("/api/videos", videoRoutes);
app.use("/api/admin", adminRoutes);

/* ---------- health ---------- */
app.get("/", (req, res) => {
  res.json({ success: true, message: "Backend running 🚀" });
});

/* ---------- MongoDB (Vercel safe) ---------- */
let cached = global.mongoose;
if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectDB() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(process.env.MONGO_URI)
      .then(m => m);
  }

  cached.conn = await cached.promise;
  console.log("MongoDB connected");
  return cached.conn;
}

connectDB();

connectDB().then(() => {
  ensureAdmin();
});


/* ---------- export for Vercel ---------- */
export default app;

/* ---------- local dev ---------- */
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
}
