import HttpStatusCodes from "http-status-codes";
import { NextFunction, Response } from "express";
import * as CategoriesServices from "../services/categories.services";
import loggerWithNameSpace from "../utils/logger";
import { Request } from "../interfaces/auth.interface";

const logger = loggerWithNameSpace("categoryController");

export async function getCategoryById(
  req: Request,
  res: Response,
  next: NextFunction
) {
  logger.info("get company by id");
  const { id } = req.params;

  try {
    const user = await CategoriesServices.getCategoryById(id);
    res.status(HttpStatusCodes.OK).send(user);
  } catch (error) {
    next(error);
    return;
  }
}
