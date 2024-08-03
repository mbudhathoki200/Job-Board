import { NextFunction, Response } from "express";
import HttpStatusCodes from "http-status-codes";
import { Request } from "../interfaces/auth.interface";
import loggerWithNameSpace from "../utils/logger";
import * as ApplicationService from "../services/application.services";

const logger = loggerWithNameSpace("Application Controller");

export async function uploadResume(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { file } = req;
  try {
    const imagePath = file?.path;

    await ApplicationService.uploadResume(imagePath);

    res.status(HttpStatusCodes.OK).json({
      message: `Resume uploaded`,
    });
  } catch (error) {
    next(error);
  }
}

export async function applyJob(
  req: Request,
  res: Response,
  next: NextFunction
) {
  logger.info("Apply job");
  const { id: jobId } = req.params;
  const { user } = req;
  const { file } = req;
  try {
    const resumePath = file?.path;
    const data = await ApplicationService.applyJob(jobId, resumePath!, user!);
    res.status(HttpStatusCodes.OK).send({
      message: "Job applied succesfully",
      appliedJob: data,
    });
  } catch (error) {
    next(error);
  }
}

export async function validateAppliedJob(
  req: Request,
  res: Response,
  next: NextFunction
) {
  logger.info("Validate Applied Jobs");

  const { id: jobId } = req.params;
  const { user } = req;
  const userId = user!.id;
  console.log(userId);
  try {
    const data = await ApplicationService.validateAppliedJob(jobId, userId);
    res.status(HttpStatusCodes.OK).send(data);
  } catch (error) {
    next(error);
  }
}

export async function getApplications(
  req: Request,
  res: Response,
  next: NextFunction
) {
  logger.info("get Appliations");
  const { user } = req;
  const userId = user?.id;
  console.log(userId);
  try {
    const data = await ApplicationService.getApplications(userId!);
    return res.status(HttpStatusCodes.OK).send({
      Applications: data,
    });
  } catch (error) {
    next(error);
  }
}
