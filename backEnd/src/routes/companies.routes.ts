import express from "express";
import { createCompany } from "../controllers/companies.controller";
import { validateReqBody } from "../middleware/validator.middleware";
import { createCompanySchema } from "../schema/companies.schema";
import { authenticate, authorize } from "../middleware/auth.middleware";

const router = express();

router.post(
  "/add",
  validateReqBody(createCompanySchema),
  authenticate,
  authorize("admin"),
  createCompany
);

export default router;
