import { uploadOnCloudinary } from "./../utils/cloudinary";
import { IUser } from "../interfaces/user.interface";
import * as UserModel from "../models/user.model";
import loggerWithNameSpace from "../utils/logger";
import { UploadApiResponse } from "cloudinary";

const logger = loggerWithNameSpace("UserServices");

export function createUser(user: IUser) {
  logger.info("create user");
  return UserModel.UserModel.createuser(user);
}

export async function getUserByEmail(email: string) {
  logger.info("get user by email");
  const data = await UserModel.UserModel.getUserByEmail(email);
  return data;
}

export async function uploadResume(resumePath: string | undefined) {
  logger.info("upload resume");
  let response: UploadApiResponse | null = null;

  if (resumePath) {
    response = await uploadOnCloudinary(resumePath);
    console.log(response);
  }

  if (response == null) {
    throw new Error();
  }
  return response;
  //  await UserModel.updateAvatar(id, image.url);
}
