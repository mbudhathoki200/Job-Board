import { NotFoundError } from "../error/NotFoundError";
import { Icompany } from "../interfaces/companies.interface";
import * as CompanyModel from "../models/companies.model";
import loggerWithNameSpace from "../utils/logger";

const logger = loggerWithNameSpace("Companies Services");

export function createCompany(company: Icompany, userId: string) {
  logger.info("Create company");
  return CompanyModel.CompanyModel.createCompany(company, userId);
}

export async function getCompanyById(id: string) {
  logger.info("get company by id");

  const data = await CompanyModel.CompanyModel.getCompanyById(id);

  if (data.length === 0) {
    throw new NotFoundError(`Company with the id: ${id} not found`);
  }

  return data;
}
