import express from "express";
import cors from "cors";
import adminRoutes from "./routes/admin.routes.js";
import videoRoutes from "./routes/video.routes.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

app.use("/api/admin", adminRoutes);
app.use("/api/admin", videoRoutes);

export default app;
