import express from "express";
import { signUp } from "../controllers/auth.controller";

const router = express();

router.post("/signup", signUp);

export default router;
