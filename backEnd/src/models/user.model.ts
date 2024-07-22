import { IUser } from "../interfaces/user.interface";
import { BaseModel } from "./base.model";

class UserModel extends BaseModel {
  static async createuser(user: IUser) {
    const userToCreate = {
      name: user.name,
      email: user.email,
      password: user.password,
    };
    await this.queryBuilder().table("users").insert(userToCreate);
  }

  static async getUserByEmail(email: string) {
    const data = await this.queryBuilder()
      .select(
        "users.id",
        "users.name",
        "users.email",
        "users.password",
        "users.createdAt",
        "permissions.permissions"
      )
      .table("users")
      .where("users.email", email)
      .leftJoin("permissions", "users.id", "permissions.userId");
      
    return data;
  }
}
