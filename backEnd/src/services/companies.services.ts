import { Icompany } from "../interfaces/companies.interface";
import loggerWithNameSpace from "../utils/logger";
import * as CompanyModel from "../models/companies.model";

const logger = loggerWithNameSpace("Companies Services");

export function createCompany(company: Icompany, userId: string) {
  logger.info("Create company");
  return CompanyModel.CompanyModel.createCompany(company, userId);
}
