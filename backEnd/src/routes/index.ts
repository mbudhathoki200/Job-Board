import express from "express";

import authRoutes from "../routes/auth.routes";
import companyRoutes from "../routes/companies.routes";

const router = express();

router.use("/", authRoutes);

router.use("/company", companyRoutes);

export default router;
