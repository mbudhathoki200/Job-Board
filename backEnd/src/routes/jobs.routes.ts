import express from "express";
import {
  createJob,
  getJobById,
  getJobs,
  updateJob,
} from "../controllers/job.controller";
import { authenticate, authorize } from "../middleware/auth.middleware";
import {
  validateReqBody,
  validateReqQuery,
} from "../middleware/validator.middleware";
import {
  getJobQuerySchema,
  jobBodySchema,
  updateJobBodySchema,
} from "../schema/job.schema";
import { getQuerySchema } from "../schema/query.schema";

const router = express();

router.post(
  "/add",
  validateReqBody(jobBodySchema),
  authenticate,
  authorize("admin"),
  createJob
);

router.get("/", validateReqQuery(getJobQuerySchema), getJobs);

router.get("/:id", validateReqQuery(getQuerySchema), getJobById);

router.put(
  "/:id",
  validateReqQuery(getQuerySchema),
  validateReqBody(updateJobBodySchema),
  authenticate,
  updateJob
);

export default router;
