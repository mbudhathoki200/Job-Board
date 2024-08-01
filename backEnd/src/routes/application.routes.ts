import express from "express";
import { authenticate, authorize } from "../middleware/auth.middleware";
import { upload } from "../middleware/multer.middleware";
import {
  applyJob,
  validateAppliedJob,
} from "../controllers/application.controller";

const router = express();

router.post(
  "/apply/:id",
  authenticate,
  authorize("user"),
  upload.single("resume"),
  applyJob
);

router.get(
  "/validate/:id",
  authenticate,
  authorize("user"),
  validateAppliedJob
);

export default router;
