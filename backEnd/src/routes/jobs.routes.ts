import express from "express";
import { createJob } from "../controllers/job.controller";
import { authenticate, authorize } from "../middleware/auth.middleware";
import { validateReqBody } from "../middleware/validator.middleware";
import { jobBodySchema } from "../schema/job.schema";

const router = express();

router.post(
  "/add",
  validateReqBody(jobBodySchema),
  authenticate,
  authorize("admin"),
  createJob
);

export default router;
