import { plainToClass } from "class-transformer";
import { validate, ValidationError } from "class-validator";
import { RequestHandler } from "express";

import httpStatus from "http-status";
import ApiError from "../errors/ApiError";

export const validateRequestBody =
  (type: any): RequestHandler =>
  async (req, res, next) => {
    try {
      console.log(req.body,"this")
      const instance = plainToClass(type, req.body);
      const errors = await validate(instance, { skipMissingProperties: false });
      if (errors.length > 0) {
        const errorMessage = getMessage(errors[0]);
        const field = errors[0]?.property;
        throw new ApiError(httpStatus.BAD_REQUEST, `${field} ${errorMessage}`);
      }
      req.body = instance;
      next();
    } catch (err) {
      next(err);
    }
  };

export const getMessage = (error: ValidationError): string => {
  if (!error.constraints) return getMessage(error.children![0]);
  return Object.values(error.constraints!)[0];
};
