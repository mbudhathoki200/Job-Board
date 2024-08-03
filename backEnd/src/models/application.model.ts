import { IApplication } from "../interfaces/application.interface";
import loggerWithNameSpace from "../utils/logger";
import { BaseModel } from "./base.model";

const logger = loggerWithNameSpace("JobApplicationModel");

export class ApplicationModel extends BaseModel {
  static async applyJob(resumeUrl: string, userId: string, jobId: string) {
    const JobToApply = {
      jobId: jobId,
      userId: userId,
      resumeUrl: resumeUrl,
    };

    const [appliedJob] = await this.queryBuilder()
      .insert(JobToApply)
      .into("job_applications")
      .returning("*");

    return appliedJob;
  }

  static async validateAppliedJob(jobId: string, userId: string) {
    const data = await this.queryBuilder()
      .select("*")
      .table("job_applications")
      .where({ userId })
      .where({ jobId })
      .first();
    return data;
  }

  static getApplications(userId: string) {
    const data = this.queryBuilder()
      .select(
        "job_applications.id",
        "job_applications.job_id",
        "job_applications.user_id",
        "job_applications.resume_url",
        "job_applications.status",
        "job_applications.applied_date",
        "users.name",
        "users.email",
        "job_listings.title",
        "job_listings.postDate",
        "job_listings.expiryDate",
        "job_listings.location",
        "job_listings.type",
        "company.logoUrl",
        "company.name"
      )
      .table("job_applications")
      .where("job_applications.userId", userId)
      .join("users", "job_applications.userId", "users.id")
      .join("job_listings", "job_listings.id", "job_applications.jobId")
      .join("company", "job_listings.companyId", "company.id");

    return data;
  }
}
