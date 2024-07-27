import { IUser } from "../interfaces/user.interface";
import * as UserModel from "../models/user.model";
import { uploadImageOnCloudinary } from "../utils/cloudinary";
import loggerWithNameSpace from "../utils/logger";

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

export async function uploadResume(localFilePath: string) {
  const response = await uploadImageOnCloudinary(localFilePath);
  console.log(response?.secure_url);
}
