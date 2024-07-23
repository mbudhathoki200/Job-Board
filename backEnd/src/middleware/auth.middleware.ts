import { NextFunction, Response } from "express";
import { verify } from "jsonwebtoken";
import config from "../config";
import { UnauthenticatedError } from "../error/UnauthenticatedError";
import { Request } from "../interfaces/auth.interface";
import { IUser } from "../interfaces/user.interface";

export function authenticate(req: Request, res: Response, next: NextFunction) {
  const { authorization } = req.headers;

  if (!authorization) {
    next(new UnauthenticatedError("Token not found"));
    return;
  }

  const token = authorization.split(" ");

  if (token.length !== 2 || token[0] !== "Bearer") {
    next(new UnauthenticatedError("Unauthenticated"));
    return;
  }
  try {
    const payload = verify(token[1], config.jwt.secret!) as IUser;
    req.user = payload;
  } catch (error) {
    next(new UnauthenticatedError("Unauthenticated"));
    return;
  }

  next();
}

export function authorize(role: string) {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = req.user!;

    if (user.roles !== role) {
      next(new UnauthenticatedError("Forbidden"));
      return;
    }

    next();
  };
}
