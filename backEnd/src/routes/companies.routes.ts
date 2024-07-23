import express from "express";
import { createCompany } from "../controllers/companies.controller";
import { validateReqBody } from "../middleware/validator.middleware";
import { createCompanySchema } from "../schema/companies.schema";

const router = express();

router.post("/add", validateReqBody(createCompanySchema), createCompany);

export default router;
