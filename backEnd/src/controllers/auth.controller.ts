import { Request, Response } from "express";
import HttpStatusCodes from "http-status-codes";

export function signUp(req: Request, res: Response) {
  console.log("SignUp");
  return res.status(HttpStatusCodes.OK).send("User Signedup succesfully");
}
