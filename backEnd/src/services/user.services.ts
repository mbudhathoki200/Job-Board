import { IUser } from "../interfaces/user.interface";
import * as UserModel from "../models/user.model";
import { NotFoundError } from "../error/NotFoundError";
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

export async function getUserById(id: number) {
  logger.info("getUserById");

  const data = await UserModel.UserModel.getUserById(id);

  if (!data) {
    throw new NotFoundError(`user with id: ${id}`);
  }

  return data;
}
