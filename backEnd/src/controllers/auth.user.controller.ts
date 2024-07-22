import { NextFunction, Request, Response } from "express";
import HttpStatusCodes from "http-status-codes";
import * as AuthServices from "../services/auth.services";
import loggerWithNameSpace from "../utils/logger";

const logger = loggerWithNameSpace("AuthController");

export async function signUp(req: Request, res: Response, next: NextFunction) {
  logger.info("sign up");

  const { body } = req;

  try {
    const data = await AuthServices.signUp(body);

    return res
      .status(HttpStatusCodes.OK)
      .send({ message: "User Signed up succesfully", user: data });
  } catch (error) {
    next(error);
    return;
  }
}

export async function logIn(req: Request, res: Response, next: NextFunction) {
  logger.info("login");

  const { body } = req;

  try {
    const data = await AuthServices.logIn(body);
    res.status(HttpStatusCodes.OK).json({
      message: "user logged in successfully",
      data,
    });
  } catch (error) {
    next(error);
  }
}
