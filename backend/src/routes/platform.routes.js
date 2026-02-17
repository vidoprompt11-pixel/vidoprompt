import express from "express";
import auth from "../middleware/auth.middleware.js";
import {
  getPlatformButtons,
  savePlatformButtons,
} from "../controllers/platform.controller.js";

const router = express.Router();

router.get("/", getPlatformButtons); // public
router.post("/", auth, savePlatformButtons); // admin only

export default router;
