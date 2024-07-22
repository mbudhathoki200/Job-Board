import { BadRequestError } from "./../error/BadRequestError";
import { NextFunction, Request, Response } from "express";
import { Schema } from "joi";

export function validateReqBody(schema: Schema) {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error, value } = schema.validate(req.body);

    if (error) {
      next(new BadRequestError(error.message));
      return;
    }

    req.body = value;

    next();
  };
}

export function validateReqQuery(schema: Schema) {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error, value } = schema.validate(req.params);

    if (error) {
      next(new BadRequestError(error.message));
      return;
    }

    req.params = value;

    next();
  };
}
