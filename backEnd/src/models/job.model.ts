import { IJOB } from "../interfaces/job.interface";
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
}
