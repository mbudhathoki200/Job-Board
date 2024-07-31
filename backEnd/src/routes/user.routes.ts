import express from "express";
import { authenticate } from "../middleware/auth.middleware";
import {
  getCurrentUserDetails,
  uploadResume,
} from "../controllers/user.controller";
import { upload } from "../middleware/multer.middleware";

const router = express();

router.get("/me", authenticate, getCurrentUserDetails);

router.post("/upload", upload.single("resume"), uploadResume);

export default router;
