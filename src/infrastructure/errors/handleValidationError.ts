
import { Prisma } from "@prisma/client";
import { iGenericErrorResponse } from "../@types/common";

export const handleValidationError = (
  error: Prisma.PrismaClientKnownRequestError | any
): iGenericErrorResponse => {
  let errorMessage = "Validation Error";
  let statusCode = 400;
  let errorMessages: { path: string; message: string }[] = [];

  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    if (error.code === "P2025") {
      // Unique constraint failed error code
      statusCode = 409; // Conflict status code for duplicate record
      errorMessage = "Record already exists";
    } else {
      errorMessage = error.message;
    }
  } else {
    errorMessage = error.message || "Unknown Error";
  }

  return {
    statusCode,
    message: errorMessage,
    errorMessages,
  };
};
