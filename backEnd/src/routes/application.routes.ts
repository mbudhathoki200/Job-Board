import express from "express";
import { authenticate, authorize } from "../middleware/auth.middleware";
import { upload } from "../middleware/multer.middleware";
import {
  applyJob,
  getApplications,
  getAppliedApplications,
  updateApplicationStatus,
  validateAppliedJob,
} from "../controllers/application.controller";

const router = express();

//Job Apply
router.post(
  "/apply/:id",
  authenticate,
  authorize("user"),
  upload.single("resume"),
  applyJob
);

//validate Applied job
router.get(
  "/validate/:id",
  authenticate,
  authorize("user"),
  validateAppliedJob
);

//get application of recruiter
router.get(
  "/application/get",
  authenticate,
  authorize("admin"),
  getApplications
);

router.get(
  "/application/applied",
  authenticate,
  authorize("user"),
  getAppliedApplications
);

router.put(
  "/application/update/:id",
  authenticate,
  authorize("admin"),
  updateApplicationStatus
);

export default router;
