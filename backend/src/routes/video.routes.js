import express from "express";
import multer from "multer";
import auth from "../middleware/auth.middleware.js";
import {
  uploadVideo,
  getVideos,
  incrementView,
  getVideoById,
} from "../controllers/video.controller.js";

const router = express.Router();

// storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "/root/vidoprompt-video");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

// file filter
const fileFilter = (req, file, cb) => {
  const allowed = [
    "video/mp4",
    "video/webm",
    "video/quicktime",
    "video/x-matroska",
  ];
  allowed.includes(file.mimetype)
    ? cb(null, true)
    : cb(new Error("Only video files allowed"));
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 200 * 1024 * 1024 },
});

// 🚨 AUTH MUST BE FIRST
router.post(
  "/dashboard-upload",
  auth,
  upload.single("video"),
  uploadVideo
);

// public routes
router.get("/", getVideos);
router.post("/:id/view", incrementView);
router.get("/:id", getVideoById);

export default router;
