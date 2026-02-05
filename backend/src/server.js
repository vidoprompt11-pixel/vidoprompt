import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import adminRoutes from "./routes/admin.routes.js";
import videoRoutes from "./routes/video.routes.js";

dotenv.config();

const app = express();

app.use(cors({ origin: "*" }));
app.use(express.json());

app.use("/api/admin", adminRoutes);
app.use("/api/videos", videoRoutes);

app.get("/", (req, res) => {
  res.json({ success: true, message: "Backend running 🚀" });
});

export default app;
