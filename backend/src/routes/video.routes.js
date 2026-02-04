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

/* ===== STORAGE ===== */
const storage = multer.diskStorage({
  destination: "uploads",
  filename: (_, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

/* ===== VIDEO ONLY FILTER ===== */
const fileFilter = (req, file, cb) => {
  const allowedTypes = [
    "video/mp4",
    "video/quicktime",
    "video/webm",
    "video/x-matroska",
    "video/x-msvideo",
  ];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only video files are allowed"), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 200 * 1024 * 1024,
  },
});

/* ===== ROUTES ===== */

// upload (admin/dashboard)
router.post(
  "/dashboard-upload",
  auth,
  upload.single("video"),
  uploadVideo
);

// fetch videos (frontend list)
router.get("/", getVideos);

// increment view
router.post("/:id/view", incrementView);

// 🔥 GET SINGLE VIDEO (DETAIL PAGE)
router.get("/:id", getVideoById);

export default router;
