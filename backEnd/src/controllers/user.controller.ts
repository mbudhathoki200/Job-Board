import { NextFunction, Response } from "express";
import HttpStatusCodes from "http-status-codes";
import { Request } from "../interfaces/auth.interface";
import * as UserService from "../services/user.services";

export function getCurrentUserDetails(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const user = req.user;
  return res.status(HttpStatusCodes.OK).send(user);
}

export async function uploadResume(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const localFilePath: any = req.files;
  let resumeUrl;
  if (localFilePath.resume) {
    resumeUrl = localFilePath.resume[0].path;
  }
  await UserService.uploadResume(resumeUrl);
}
