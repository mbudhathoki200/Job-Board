import { IUser } from "../interfaces/user.interface";
import * as UserServices from "../services/user.services";

import bcrypt from "bcrypt";
export async function signUp(user: IUser) {
  const hashedPassword = await bcrypt.hash(user.password, 10);
  const updateduser = { ...user, password: hashedPassword };
  UserServices.createUser(user);
}

export function logIn(user: IUser) {}
