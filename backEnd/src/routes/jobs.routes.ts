import express from "express";
import { createJob } from "../controllers/job.controller";
const router = express();

router.post("/add", createJob);

export default router;
