import HttpStatusCodes from "http-status-codes";
import { NextFunction, Response } from "express";
import { Request } from "../interfaces/auth.interface";
import loggerWithNameSpace from "../utils/logger";

import * as JobServices from "../services/job.services";

const logger = loggerWithNameSpace("JobController");

export async function createJob(
  req: Request,
  res: Response,
  next: NextFunction
) {
  logger.info("create Job");

  const { body } = req;
  const userId = req.user?.id;
  try {
    const data = await JobServices.createJob(userId!, body);

    res.status(HttpStatusCodes.OK).send({
      message: "Job Succesfully Created",
      Job: data,
    });
  } catch (error) {
    next(error);
  }
}
