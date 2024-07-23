import loggerWithNameSpace from "../utils/logger";
import { BaseModel } from "./base.model";

const logger = loggerWithNameSpace("CategoryModel");

export class CategoryModel extends BaseModel {
  //get company by id

  static getCategoryById(categoryId: string) {
    logger.info("get Catergory By id");
    const query = this.queryBuilder()
      .select("id", "name")
      .table("jobCategories")
      .where({ id: categoryId });

    return query;
  }
}
