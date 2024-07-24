import { IJOB } from "../interfaces/job.interface";
import * as JobModel from "../models/job.model";
import loggerWithaNameSpace from "../utils/logger";
import { getCategoryById } from "./categories.services";
import { getCompanyById } from "./companies.services";
const logger = loggerWithaNameSpace("JobServices");

export async function createJob(userId: string, job: IJOB) {
  logger.info("createTodos");

  const categoryId = job.categoryId;
  const companyId = job.companyId;

  const categoryData = await getCategoryById(categoryId);

  const companyData = await getCompanyById(companyId);

  return await JobModel.JobModel.createJob(userId, job);
}
