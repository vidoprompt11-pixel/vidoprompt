import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

import videoRoutes from "./routes/video.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import platformRoutes from "./routes/platform.routes.js";

dotenv.config();

const app = express();

/* ================= ESM DIRNAME FIX ================= */

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/* ================= MIDDLEWARE ================= */

app.use(cors({ origin: "*", credentials: true }));
app.use(express.json());

/* ================= STATIC MEDIA ================= */

app.use(
  "/media",
  express.static("/root/vidoprompt-video", {
    setHeaders: (res) => {
      res.setHeader("Accept-Ranges", "bytes");
    },
  })
);

/* ================= ROUTES ================= */

app.use("/api/videos", videoRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/platform-buttons", platformRoutes);

/* ================= HEALTH CHECK ================= */

app.get("/", (req, res) => {
  res.json({ success: true, message: "Backend running 🚀" });
});

/* ================= DATABASE CONNECTION ================= */

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB connected");
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error);
    process.exit(1);
  }
}

/* ================= START SERVER ================= */

const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
});

export default app;
