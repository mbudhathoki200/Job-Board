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
}
