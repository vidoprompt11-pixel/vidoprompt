import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

import videoRoutes from "./routes/video.routes.js";
import adminRoutes from "./routes/admin.routes.js";

dotenv.config();

const app = express();

// ESM __dirname fix
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// middleware
app.use(cors({ origin: "*", credentials: true }));
app.use(express.json());

// serve uploads (LOCAL only, Vercel ignore kare)
// 🎥 Serve videos from Ubuntu drive (NOT project root)
app.use(
  "/media",
  express.static("/root/vidoprompt-video", {
    setHeaders: (res) => {
      res.setHeader("Accept-Ranges", "bytes");
      res.setHeader("Content-Type", "video/mp4");
    },
  })
);


// routes
app.use("/api/videos", videoRoutes);
app.use("/api/admin", adminRoutes);

// health check (Vercel mate important)
app.get("/", (req, res) => {
  res.json({ success: true, message: "Backend running 🚀" });
});

// ===== MongoDB (Vercel + Local safe) =====
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

// 👉 Vercel mate REQUIRED
export default app;

// 👉 Local development mate j server listen
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
}
