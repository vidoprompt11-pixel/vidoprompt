import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import adminRoutes from "./routes/admin.routes.js";
import videoRoutes from "./routes/video.routes.js";
import { ensureAdmin } from "./controllers/admin.controller.js";

dotenv.config();

const app = express();

app.use(cors({
  origin: "*"
}));

app.use(express.json());

app.use("/api/admin", adminRoutes);
app.use("/api/videos", videoRoutes);

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
    cached.promise = mongoose.connect(process.env.MONGO_URI);
  }

  cached.conn = await cached.promise;
  console.log("MongoDB connected");
  return cached.conn;
}

connectDB().then(() => {
  ensureAdmin();
});

export default app;
