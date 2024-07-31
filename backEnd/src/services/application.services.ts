import { IUser } from "../interfaces/user.interface";
import { uploadOnCloudinary } from "./../utils/cloudinary";
import { UploadApiResponse } from "cloudinary";
import { NotFoundError } from "../error/NotFoundError";
import loggerWithNameSpace from "../utils/logger";
import * as ApplicationModel from "./../models/application.model";
import { getJobById } from "./job.services";
import { getUserById } from "./user.services";
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
