import express from "express";
import {
  createCompany,
  getAllCompanies,
  getCompanies,
  getCompanyById,
} from "../controllers/companies.controller";
import {
  validateReqBody,
  validateReqQuery,
} from "../middleware/validator.middleware";
import { createCompanySchema } from "../schema/companies.schema";
import { authenticate, authorize } from "../middleware/auth.middleware";
import { getQuerySchema } from "../schema/query.schema";
import { upload } from "../middleware/multer.middleware";

const router = express();

router.post(
  "/add",
  authenticate,
  authorize("admin"),
  upload.single("logo"),
  createCompany
);

router.get("/:id", validateReqQuery(getQuerySchema), getCompanyById);

router.get("/", authenticate, authorize("admin"), getCompanies);

router.get("/get/companies", getAllCompanies);

export default router;
