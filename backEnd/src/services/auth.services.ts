import { BadRequestError } from "./../error/BadRequestError";
import { sign } from "jsonwebtoken";
import { IUser } from "../interfaces/user.interface";
import * as UserServices from "../services/user.services";

import loggerWithNameSpace from "../utils/logger";

const logger = loggerWithNameSpace("AuthServices");

import bcrypt from "bcrypt";
import config from "../config";
import { UnauthenticatedError } from "../error/UnauthenticatedError";

export async function signUp(user: IUser) {
  logger.info("sign up");

  const hashedPassword = await bcrypt.hash(user.password, 10);

  const updateduser = { ...user, password: hashedPassword };

  const existingUser = await UserServices.getUserByEmail(user.email);

  if (existingUser) {
    throw new BadRequestError("User with this email already exists");
  }

  return UserServices.createUser(updateduser);
}

export async function logIn(body: Pick<IUser, "email" | "password">) {
  logger.info("log in");

  const existingUser = await UserServices.getUserByEmail(body.email);

  if (!existingUser) {
    logger.info("Incorrect Email");
    throw new UnauthenticatedError("Invalid Email or Password");
  }

  const isValidPassword = await bcrypt.compare(
    body.password,
    existingUser.password
  );

  if (!isValidPassword) {
    logger.info("Incorrect Password");
    throw new UnauthenticatedError("Invalid Email or Password");
  }

  const payload = {
    id: existingUser.id,
    name: existingUser.name,
    email: existingUser.email,
    roles: existingUser.roles,
  };

  const accessToken = sign(payload, config.jwt.secret!, {
    expiresIn: config.jwt.accessTokenExpiryMS,
  });

  const refreshToken = sign(payload, config.jwt.secret!, {
    expiresIn: config.jwt.refreshTokenExpiryMS,
  });

  return { accessToken, refreshToken };
}
