import express from "express";
import { authenticate } from "../middleware/auth.middleware";
import {
  getCurrentUserDetails,
  uploadResume,
} from "../controllers/user.controller";
import { uploadResumeParser } from "../middleware/multer.middleware";

const router = express();

router.get("/me", authenticate, getCurrentUserDetails);

router.post("/upload", uploadResumeParser, uploadResume);

export default router;
