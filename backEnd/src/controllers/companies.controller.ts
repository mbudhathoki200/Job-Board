import HttpStatusCodes from "http-status-codes";
import { NextFunction, Response } from "express";
import * as CompaniesServices from "../services/companies.services";
import loggerWithNameSpace from "../utils/logger";
import { Request } from "../interfaces/auth.interface";

const logger = loggerWithNameSpace("companiesController");

export async function createCompany(
  req: Request,
  res: Response,
  next: NextFunction
) {
  logger.info("create company");
  const { body } = req;
  const userId = req.user?.id!;
  const { file } = req;
  try {
    const logoPath = file?.path;
    const data = await CompaniesServices.createCompany(body, userId, logoPath!);
    return res
      .status(HttpStatusCodes.OK)
      .send({ message: "Company Registered succesfully", company: data });
  } catch (error) {
    next(error);
  }
}

export async function getCompanyById(
  req: Request,
  res: Response,
  next: NextFunction
) {
  logger.info("get company by id");
  const { id } = req.params;

  try {
    const user = await CompaniesServices.getCompanyById(id);
    res.status(HttpStatusCodes.OK).send(user);
  } catch (error) {
    next(error);
    return;
  }
}

export async function getCompanies(
  req: Request,
  res: Response,
  next: NextFunction
) {
  logger.info("get Companies");
  const { user } = req;

  const userId = user?.id;

  try {
    const data = await CompaniesServices.getCompanies(userId!);
    res.status(HttpStatusCodes.OK).send({
      companies: data,
    });
  } catch (error) {
    next(error);
  }
}
