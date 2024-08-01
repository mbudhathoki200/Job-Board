import express from "express";
import { authenticate } from "../middleware/auth.middleware";
import { upload } from "../middleware/multer.middleware";
import {
  applyJob,
  validateAppliedJob,
} from "../controllers/application.controller";

const router = express();

router.post("/apply/:id", authenticate, upload.single("resume"), applyJob);

router.get("/validate/:id", authenticate, validateAppliedJob);

export default router;
