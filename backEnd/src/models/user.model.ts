import { IUser } from "../interfaces/user.interface";
import loggerWithNameSpace from "../utils/logger";
import { BaseModel } from "./base.model";

const logger = loggerWithNameSpace("UserModel");
export class UserModel extends BaseModel {
  static async createuser(user: IUser) {
    const userToCreate = {
      name: user.name,
      email: user.email,
      password: user.password,
    };
    await this.queryBuilder().table("users").insert(userToCreate);
    if (user.roles) {
      const userId = await this.queryBuilder()
        .select("id")
        .table("users")
        .where({ email: userToCreate.email })
        .first();

      await this.queryBuilder().table("roles").insert({
        userId: userId.id,
        roles: user.roles,
      });
    }

    return user;
  }

  static async getUserByEmail(email: string) {
    logger.info("get user by email");
    const query = await this.queryBuilder()
      .select(
        "users.id",
        "users.name",
        "users.email",
        "users.password",
        "users.createdAt",
        "roles.roles"
      )
      .table("users")
      .where("users.email", email)
      .leftJoin("roles", "users.id", "roles.id")
      .first();

    return query;
  }
}
