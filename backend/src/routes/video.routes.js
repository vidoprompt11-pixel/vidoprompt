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

/* =========================
   STORAGE (LOCAL + VERCEL)
========================= */

// Vercel par disk read-only hoy che
// Vercel only /tmp allow kare che
const isVercel = process.env.VERCEL === "1";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (isVercel) {
      cb(null, "/tmp");      // ✅ Vercel safe
    } else {
      cb(null, "/root/vidoprompt-video");  // ✅ Local dev
    }
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

/* =========================
   VIDEO FILE FILTER
========================= */
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
    fileSize: 200 * 1024 * 1024, // 200MB
  },
});

/* =========================
   ROUTES
========================= */

// Upload video (admin/dashboard)
router.post(
  "/dashboard-upload",
  auth,
  upload.single("video"),
  uploadVideo
);

// Fetch all videos (frontend list)
router.get("/", getVideos);

// Increment views
router.post("/:id/view", incrementView);

// Get single video by ID
router.get("/:id", getVideoById);

export default router;
