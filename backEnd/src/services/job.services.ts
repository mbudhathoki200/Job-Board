import { NotFoundError } from "../error/NotFoundError";
import { UnauthenticatedError } from "../error/UnauthenticatedError";
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
export async function getJobById(jobId: string) {
  logger.info("getJobById");
  const data = await JobModel.JobModel.getJobById(jobId);

  if (data.length == 0) {
    throw new NotFoundError(`Job with the id: ${jobId} doesnot exist`);
  }
  return data;
}

export async function updateJob(jobId: string, newJob: IJOB, userId: string) {
  logger.info("updateJob");

  const existingJob = await JobModel.JobModel.getJobById(jobId);

  if (!existingJob) {
    throw new NotFoundError(`Job with id: ${jobId} not found`);
  }

  if (existingJob.createdBy !== userId) {
    throw new UnauthenticatedError("Forbidden!!!");
  }

  return await JobModel.JobModel.updateJob(jobId, newJob, userId);
}

export async function deleteJob(jobId: string, userId: string) {
  logger.info("delete Job");
  const data = await JobModel.JobModel.getJobById(jobId);

  if (!data) {
    throw new NotFoundError(`Job with id: ${jobId} not found`);
  }

  if (data.createdBy !== userId) {
    throw new UnauthenticatedError("Forbidden!!!");
  }

  JobModel.JobModel.deleteJob(jobId);
}
