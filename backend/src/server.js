import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

import videoRoutes from "./routes/video.routes.js";
import adminRoutes from "./routes/admin.routes.js";

dotenv.config();

const app = express();

// ===== ESM dirname fix =====
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ===== Middleware =====
app.use(cors({ origin: "*", credentials: true }));
app.use(express.json());

// =====================================================
// 🎥 iOS + Android SAFE VIDEO STREAMING (IMPORTANT)
// =====================================================
app.get("/media/:filename", (req, res) => {
  const videoDir = "/root/vidoprompt-video";
  const filePath = path.join(videoDir, req.params.filename);

  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ message: "Video not found" });
  }

  const stat = fs.statSync(filePath);
  const fileSize = stat.size;
  const range = req.headers.range;

  if (range) {
    const parts = range.replace(/bytes=/, "").split("-");
    const start = parseInt(parts[0], 10);
    const end = parts[1]
      ? parseInt(parts[1], 10)
      : fileSize - 1;

    if (start >= fileSize) {
      return res.status(416).send("Requested range not satisfiable");
    }

    const chunkSize = end - start + 1;

    res.writeHead(206, {
      "Content-Range": `bytes ${start}-${end}/${fileSize}`,
      "Accept-Ranges": "bytes",
      "Content-Length": chunkSize,
      "Content-Type": "video/mp4",
      "Cache-Control": "public, max-age=31536000",
    });

    fs.createReadStream(filePath, { start, end }).pipe(res);
  } else {
    res.writeHead(200, {
      "Content-Length": fileSize,
      "Content-Type": "video/mp4",
      "Cache-Control": "public, max-age=31536000",
    });

    fs.createReadStream(filePath).pipe(res);
  }
});

// ================= ROUTES =================
app.use("/api/videos", videoRoutes);
app.use("/api/admin", adminRoutes);

// ================= HEALTH CHECK =================
app.get("/", (req, res) => {
  res.json({ success: true, message: "Backend running 🚀" });
});

// ================= MONGODB =================
let cached = global.mongoose;
if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectDB() {
  if (cached.conn) return cached.conn;

  cached.promise = mongoose
    .connect(process.env.MONGO_URI)
    .then((m) => m);

  cached.conn = await cached.promise;
  console.log("MongoDB connected");
  return cached.conn;
}

connectDB();

export default app;

// ================= LOCAL SERVER =================
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () =>
    console.log(`🚀 Server running on ${PORT}`)
  );
}
