import { NotFoundError } from "../error/NotFoundError";
import * as CategoryModel from "../models/categories.model";
import loggerWithNameSpace from "../utils/logger";

const logger = loggerWithNameSpace("Categories Services");

export async function getCategoryById(id: string) {
  logger.info("get user by id");

  const data = await CategoryModel.CategoryModel.getCategoryById(id);

  if (data.length === 0) {
    throw new NotFoundError(`Category with the id: ${id} not found`);
  }

  return data;
}
