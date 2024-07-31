import express from "express";
import { authenticate } from "../middleware/auth.middleware";
import { upload } from "../middleware/multer.middleware";
import { applyJob } from "../controllers/application.controller";

const router = express();

router.post("/apply/:id", authenticate, upload.single("resume"), applyJob);

export default router;
