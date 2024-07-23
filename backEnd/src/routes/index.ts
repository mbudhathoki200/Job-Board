import express from "express";

import authRoutes from "../routes/auth.routes";
import companyRoutes from "../routes/companies.routes";
import categoryRoutes from "../routes/categories.routes";

const router = express();

router.use("/", authRoutes);

router.use("/company", companyRoutes);

router.use("/category", categoryRoutes);

export default router;
