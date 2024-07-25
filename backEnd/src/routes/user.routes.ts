import express from "express";
import { authenticate } from "../middleware/auth.middleware";
import { getCurrentUserDetails } from "../controllers/user.controller";

const router = express();

router.get("/me", authenticate, getCurrentUserDetails);

export default router;
