import HttpStatusCodes from "http-status-codes";
import { Response } from "express";
import * as CompaniesServices from "../services/companies.services";
import loggerWithNameSpace from "../utils/logger";
import { Request } from "../interfaces/auth.interface";

const logger = loggerWithNameSpace("companiesController");

export async function createCompany(req: Request, res: Response) {
  logger.info("create company");
  const { body } = req;
  const userId = req.user?.id!;
  const data = await CompaniesServices.createCompany(body, userId);
  return res
    .status(HttpStatusCodes.OK)
    .send({ message: "Company Registered succesfully", user: data });
}
