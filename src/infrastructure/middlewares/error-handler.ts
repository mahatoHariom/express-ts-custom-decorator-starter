/* eslint-disable @typescript-eslint/no-unused-vars */
import { ErrorRequestHandler, NextFunction, Request, Response } from "express";


import { Prisma } from "@prisma/client";
import { iGenericErrorMessage } from "../@types/common";
import handleClientError from "../errors/handleClientError";
import ApiError from "../errors/ApiError";
import { handleValidationError } from "../errors/handleValidationError";


const ErrorHandler: ErrorRequestHandler = (
  error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  process.env.NODE_ENV === "development"
    ? console.error("🐱‍🏍 globalErrorHandler ~~", { error })
    : console.error("🐱‍🏍 globalErrorHandler ~~", error);

  let statusCode = 500;
  let message = "Something went wrong!";
  let errorMessages: iGenericErrorMessage[] = [];

  if (error instanceof Prisma.PrismaClientValidationError) {
    const simplifiedError = handleValidationError(error);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessages = simplifiedError.errorMessages;
  } else if (error instanceof Prisma.PrismaClientKnownRequestError) {
    const simplifiedError = handleClientError(error);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessages = simplifiedError.errorMessages;
  } else if (error instanceof ApiError) {
    statusCode = error?.statusCode;
    message = error.message;
    errorMessages = error?.message
      ? [
          {
            path: "",
            message: error?.message,
          },
        ]
      : [];
  } else if (error instanceof Error) {
    message = error?.message;
    errorMessages = error?.message
      ? [
          {
            path: "",
            message: error?.message,
          },
        ]
      : [];
  }

  res.status(statusCode).json({
    success: false,
    message,
    errorMessages,
    stack: process.env.NODE_ENV !== "production" ? error?.stack : undefined,
  });
};

export default ErrorHandler;
