import { NextFunction, Response } from "express";
import HttpStatusCodes from "http-status-codes";
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

export async function getJobById(
  req: Request,
  res: Response,
  next: NextFunction
) {
  logger.info("get job by id");
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
  logger.info("get jobs");

  const { query } = req;

  try {
    const data = await JobServices.getJobs(query);
    return res.status(HttpStatusCodes.OK).send(data);
  } catch (error) {
    next(error);
  }
}
export async function getUsersJob(
  req: Request,
  res: Response,
  next: NextFunction
) {
  logger.info("get users job");
  const { user } = req;

  const userId = user?.id;
  try {
    const data = await JobServices.getUsersJobs(userId!);
    return res.status(HttpStatusCodes.OK).send({
      jobs: data,
    });
  } catch (error) {
    next(error);
  }
}

export async function updateJob(
  req: Request,
  res: Response,
  next: NextFunction
) {
  logger.info("udpate job");
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
      message: `Job with id: ${id} deleted succesfully`,
    });
  } catch (error) {
    next(error);
  }
}
