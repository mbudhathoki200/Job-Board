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

export async function getJobById(
  req: Request,
  res: Response,
  next: NextFunction
) {
  logger.info("get todo by id");
  const { id } = req.params;
  try {
    const data = await JobServices.getJobById(id);
    return res.status(HttpStatusCodes.OK).send({
      job: data,
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

export async function updateJob(
  req: Request,
  res: Response,
  next: NextFunction
) {
  logger.info("udpate todo");
  const userId = req.user?.id!;
  const { id } = req.params;
  const newJob = req.body;
  try {
    const data = await JobServices.updateJob(id, newJob, userId);

    res.status(HttpStatusCodes.OK).send({
      message: "Upated Succesfully",
      job: data,
    });
  } catch (error) {
    next(error);
  }
}

export async function deleteJob(
  req: Request,
  res: Response,
  next: NextFunction
) {
  logger.info("delete job");
  const { id } = req.params;
  const userId = req.user?.id;
  try {
    const data = await JobServices.deleteJob(id, userId!);

    res.status(HttpStatusCodes.OK).send({
      message: `Todo with id: ${id} deleted succesfully`,
    });
  } catch (error) {
    next(error);
  }
}
