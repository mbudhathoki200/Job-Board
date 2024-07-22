import { Request, Response } from "express";
import HttpStatusCodes from "http-status-codes";
import * as AuthServices from "../services/auth.services";

export function signUp(req: Request, res: Response) {
  console.log("SignUp");
  const { body } = req;
  AuthServices.signUp(body);
  return res.status(HttpStatusCodes.OK).send("User Signedup succesfully");
}
