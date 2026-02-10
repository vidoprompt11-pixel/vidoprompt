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

// ESM dirname fix
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// middleware
app.use(cors({ origin: "*", credentials: true }));
app.use(express.json());

// 🎥 Serve videos from Ubuntu disk
app.use(
  "/media",
  express.static("/root/vidoprompt-video", {
    setHeaders: (res) => {
      res.setHeader("Accept-Ranges", "bytes");
    },
  })
);



// routes
app.use("/api/videos", videoRoutes);
app.use("/api/admin", adminRoutes);

// health check
app.get("/", (req, res) => {
  res.json({ success: true, message: "Backend running 🚀" });
});

// ===== MongoDB =====
let cached = global.mongoose;
if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectDB() {
  if (cached.conn) return cached.conn;

  cached.promise = mongoose.connect(process.env.MONGO_URI).then(m => m);
  cached.conn = await cached.promise;

  console.log("MongoDB connected");
  return cached.conn;
}

connectDB();

export default app;

// Local only
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () =>
    console.log(`🚀 Server running on ${PORT}`)
  );
}
