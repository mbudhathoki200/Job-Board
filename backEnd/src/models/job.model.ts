import { GetJobQuery, IJOB } from "../interfaces/job.interface";
import { BaseModel } from "./base.model";

export class JobModel extends BaseModel {
  static async createJob(userId: string, Job: IJOB) {
    const JobToCreate = {
      title: Job.title,
      description: Job.description,
      requirements: Job.requirements,
      location: Job.location,
      salaryMin: Job.salaryMin,
      salaryMax: Job.salaryMax,
      postDate: Job.postDate,
      expiryDate: Job.expiryDate,
      openings: Job.openings,
      experience: Job.experience,
      level: Job.level,
      type: Job.type,
      createdBy: userId,
      companyId: Job.companyId,
      categoryId: Job.categoryId,
    };

    const [createdJob] = await this.queryBuilder()
      .insert(JobToCreate)
      .into("jobListings")
      .returning("*");

    return createdJob;
  }

  static getJobs(filter: GetJobQuery) {
    const { q } = filter;
    const job = this.queryBuilder()
      .select(
        "jobListings.id",
        "jobListings.title",
        "JobListings.description",
        "JobListings.location",
        "JobListings.salaryMin",
        "JobListings.salaryMax",
        "JobListings.postDate",
        "JobListings.expiryDate",
        "JobListings.openings",
        "JobListings.experience",
        "JobListings.level",
        "JobListings.type",
        "JobListings.createdBy",
        "JobListings.companyId",
        "JobListings.categoryId",
        "company.name as companyName",
        "company.logoUrl",
        "company.website",
        "company.description as companyDescription"
      )
      .table("jobListings")
      .join("company", "jobListings.companyId", "company.id")
      .limit(filter.size!)
      .offset((filter.page! - 1) * filter.size!);

    if (q) {
      job.whereLike("title", `%${q}%`);
    }

    return job;
  }

  static count(filter: GetJobQuery) {
    const { q } = filter;

    const query = this.queryBuilder().count("*").table("jobListings").first();

    if (q) {
      query.whereLike("title", `%${q}%`);
    }

    return query;
  }

  static async getJobById(JobId: string) {
    const job = await this.queryBuilder()
      .select(
        "jobListings.id",
        "jobListings.title",
        "JobListings.description",
        "JobListings.requirements",
        "JobListings.location",
        "JobListings.salaryMin",
        "JobListings.salaryMax",
        "JobListings.postDate",
        "JobListings.expiryDate",
        "JobListings.openings",
        "JobListings.experience",
        "JobListings.level",
        "JobListings.type",
        "JobListings.createdBy",
        "JobListings.companyId",
        "JobListings.categoryId",
        "company.name as companyName",
        "company.logoUrl",
        "company.website",
        "company.description as companyDescription"
      )
      .table("jobListings")
      .join("company", "jobListings.companyId", "company.id")
      .where({ "jobListings.id": JobId })
      .first();

    return job;
  }

  static async updateJob(jobId: string, Job: IJOB, userId: string) {
    const jobToUpdate = {
      title: Job.title,
      description: Job.description,
      requirements: Job.requirements,
      location: Job.location,
      salaryMin: Job.salaryMin,
      salaryMax: Job.salaryMax,
      postDate: Job.postDate,
      expiryDate: Job.expiryDate,
      openings: Job.openings,
      experience: Job.experience,
      level: Job.level,
      type: Job.type,
      companyId: Job.companyId,
      categoryId: Job.categoryId,
      updatedAt: new Date(),
      updatedBy: userId,
    };
    console.log(jobToUpdate);
    const [updatedJob] = await this.queryBuilder()
      .update(jobToUpdate)
      .table("jobListings")
      .where({ id: jobId })
      .returning("*");

    return updatedJob;
  }

  static async deleteJob(jobId: string) {
    await this.queryBuilder().table("jobListings").del().where({ id: jobId });
  }
}
