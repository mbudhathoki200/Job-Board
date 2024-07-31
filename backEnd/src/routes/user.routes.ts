import express from "express";
import {
  getCurrentUserDetails,
  getUserById,
} from "../controllers/user.controller";
import { authenticate } from "../middleware/auth.middleware";

const router = express();

router.get("/me", authenticate, getCurrentUserDetails);

router.get("/:id", getUserById);

export default router;
