import { IUser } from "../interfaces/user.interface";
import { uploadOnCloudinary } from "./../utils/cloudinary";
import { UploadApiResponse } from "cloudinary";
import { NotFoundError } from "../error/NotFoundError";
import loggerWithNameSpace from "../utils/logger";
import * as ApplicationModel from "./../models/application.model";
import { getJobById } from "./job.services";
import { getUserById } from "./user.services";
import { UnauthenticatedError } from "../error/UnauthenticatedError";
const logger = loggerWithNameSpace("ApplicationServices");

export async function uploadResume(resumePath: string | undefined) {
  logger.info("upload resume");
  let response: UploadApiResponse | null = null;

  if (resumePath) {
    response = await uploadOnCloudinary(resumePath);
  }

  if (response == null) {
    throw new Error();
  }
  return response.secure_url;
}

export async function applyJob(jobId: string, resumePath: string, user: IUser) {
  const userId = user?.id;
  const userData = await getUserById(+userId);
  const jobData = await getJobById(jobId);

  if (!userData) {
    throw new NotFoundError(`user with id:${userId} not found`);
  }
  if (!jobData) {
    throw new NotFoundError(`job with id:${jobId} not found`);
  }
  const resumeUrl = await uploadResume(resumePath);

  return await ApplicationModel.ApplicationModel.applyJob(
    resumeUrl,
    userId,
    jobId
  );
}

export async function validateAppliedJob(jobId: string, userId: string) {
  const data = await ApplicationModel.ApplicationModel.validateAppliedJob(
    jobId,
    userId
  );
  if (!data) {
    throw new NotFoundError("User has not applied to the job");
  }
  return data;
}

export async function getApplications(userId: string) {
  logger.info("get Applications");

  const data = await ApplicationModel.ApplicationModel.getApplications(userId);

  if (data.length == 0) {
    throw new NotFoundError(`Applications doesnot exist`);
  }
  return data;
}

export async function getAppliedApplications(userId: string) {
  logger.info("get Applied Applications");

  const data = await ApplicationModel.ApplicationModel.getAppliedApplications(
    userId
  );

  if (data.length == 0) {
    throw new NotFoundError(`Applications doesnot exist`);
  }
  return data;
}

export async function getApplicationById(applicationId: string) {
  logger.info("getJobById");
  const data = await ApplicationModel.ApplicationModel.getApplicationById(
    applicationId
  );

  if (!data) {
    throw new NotFoundError(
      `Application with the id: ${applicationId} doesnot exist`
    );
  }
  return data;
}

export async function updateApplicationStatus(
  userId: string,
  applicationId: string,
  status: object
) {
  logger.info("update Application");

  const existingApplication = await getApplicationById(applicationId);

  if (!existingApplication) {
    throw new NotFoundError(`Job with id: ${applicationId} not found`);
  }

  const updatedApplication = { ...existingApplication, ...status };

  return await ApplicationModel.ApplicationModel.updateApplicationStatus(
    userId,
    applicationId,
    updatedApplication
  );
}

export async function deleteApplication(jobId: string) {
  logger.info("delete Application");
  ApplicationModel.ApplicationModel.deleteApplication(jobId);
}
