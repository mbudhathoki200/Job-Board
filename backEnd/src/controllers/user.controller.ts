import { NextFunction, Response } from "express";
import HttpStatusCodes from "http-status-codes";
import { Request } from "../interfaces/auth.interface";

export function getCurrentUserDetails(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const user = req.user;
  return res.status(HttpStatusCodes.OK).send(user);
}
