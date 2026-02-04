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

// ESM fix for __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// middleware
app.use(cors());
app.use(express.json());

// ⭐ serve uploads folder
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

// routes
app.use("/api/videos", videoRoutes);
app.use("/api/admin", adminRoutes);

// mongo connect
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`🚀 Server running on port ${PORT}`)
);
