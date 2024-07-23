import express from "express";
import { getCategoryById } from "../controllers/categories.controller";

const router = express();

router.get("/:id", getCategoryById);

export default router;
