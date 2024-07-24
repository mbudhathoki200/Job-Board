import HttpStatusCodes from "http-status-codes";
import { NextFunction, Response } from "express";
import { Request } from "../interfaces/auth.interface";
import loggerWithNameSpace from "../utils/logger";

import * as JobServices from "../services/job.services";
import { NotFoundError } from "../error/NotFoundError";

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

export async function getJobs(req: Request, res: Response, next: NextFunction) {
  logger.info("get todo");

  const { query } = req;

  try {
    const data = await JobServices.getJobs(query);
    return res.status(HttpStatusCodes.OK).send(data);
  } catch (error) {
    next(error);
  }
}
