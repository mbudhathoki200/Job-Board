import express from "express";

import authRoutes from "../routes/auth.routes";
import companyRoutes from "../routes/companies.routes";
import categoryRoutes from "../routes/categories.routes";
import jobRoutes from "../routes/jobs.routes";
import userRoutes from "../routes/user.routes";

const router = express();

router.use("/", authRoutes);

router.use("/company", companyRoutes);

router.use("/category", categoryRoutes);

router.use("/job", jobRoutes);

router.use("/", userRoutes);

export default router;
