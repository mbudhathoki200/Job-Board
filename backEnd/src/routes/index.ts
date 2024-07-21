import express from "express";

import authRoutes from "../routes/auth.routes";

const router = express();

router.use("/", authRoutes);

export default router;
