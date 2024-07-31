import { NextFunction, Response } from "express";
import HttpStatusCodes from "http-status-codes";
import { Request } from "../interfaces/auth.interface";
import * as UserService from "../services/user.services";

export async function getCurrentUserDetails(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const data = await UserService.getUserById(+req.user?.id!);
    res.status(HttpStatusCodes.OK).send({
      data,
    });
  } catch (error) {
    next(error);
  }
}

export async function getUserById(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { id } = req.params;

  try {
    const data = await UserService.getUserById(+id);

    res.status(HttpStatusCodes.OK).json({ data });
  } catch (error) {
    next(error);
  }
}
