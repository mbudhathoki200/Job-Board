import { NotFoundError } from "../error/NotFoundError";
import { GetJobQuery, IJOB } from "../interfaces/job.interface";
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

export async function getJobs(query: GetJobQuery) {
  logger.info("get Jobs");
  const data = await JobModel.JobModel.getJobs(query);

  if (data.length == 0) {
    throw new NotFoundError("No Jobs Exists");
  }

  const count = await JobModel.JobModel.count(query);

  const meta = {
    page: query.page,
    size: data.length,
    total: +count.count,
  };

  return { data, meta };
}
