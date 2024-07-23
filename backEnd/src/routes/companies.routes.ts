import express from "express";
import {
  createCompany,
  getCompanyById,
} from "../controllers/companies.controller";
import {
  validateReqBody,
  validateReqQuery,
} from "../middleware/validator.middleware";
import { createCompanySchema } from "../schema/companies.schema";
import { authenticate, authorize } from "../middleware/auth.middleware";
import { getQuerySchema } from "../schema/query.schema";

const router = express();

router.post(
  "/add",
  validateReqBody(createCompanySchema),
  authenticate,
  authorize("admin"),
  createCompany
);

router.get("/:id", validateReqQuery(getQuerySchema), getCompanyById);

export default router;
