import HttpStatusCodes from "http-status-codes";
import { Request, Response } from "express";
import * as CompaniesServices from "../services/companies.services";
import loggerWithNameSpace from "../utils/logger";

const logger = loggerWithNameSpace("companiesController");

export async function createCompany(req: Request, res: Response) {
  logger.info("create company");
  const { body } = req;
  const data = await CompaniesServices.createCompany(body);
  return res
    .status(HttpStatusCodes.OK)
    .send({ message: "Company Registered succesfully", user: data });
}
