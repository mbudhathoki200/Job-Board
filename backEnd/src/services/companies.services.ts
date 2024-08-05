import { NotFoundError } from "../error/NotFoundError";
import { Icompany } from "../interfaces/companies.interface";
import * as CompanyModel from "../models/companies.model";
import loggerWithNameSpace from "../utils/logger";
import { upload } from "../utils/upload";

const logger = loggerWithNameSpace("Companies Services");

export async function createCompany(
  company: Icompany,
  userId: string,
  logoPath: string
) {
  logger.info("Create company");
  const logoUrl = await upload(logoPath);
  console.log(logoUrl);
  return CompanyModel.CompanyModel.createCompany(company, userId, logoUrl);
}

export async function getCompanyById(id: string) {
  logger.info("get company by id");

  const data = await CompanyModel.CompanyModel.getCompanyById(id);

  if (data.length === 0) {
    throw new NotFoundError(`Company with the id: ${id} not found`);
  }

  return data;
}

export async function getCompanies(userId: string) {
  logger.info("Get companies");
  const data = await CompanyModel.CompanyModel.getCompanies(userId);
  if (data.length == 0) {
    throw new NotFoundError(
      `No companies registered by user with id: ${userId}`
    );
  }
  return data;
}

export async function getAllCompanies() {
  logger.info("Get All companies");
  const data = await CompanyModel.CompanyModel.getAllCompanies();
  if (data.length == 0) {
    throw new NotFoundError(`No companies Found`);
  }
  return data;
}
