import { User } from '@prisma/client'
import express from 'express'
export interface iGenericResponse<T> {
  meta: {
    page: number
    limit: number
    total: number
  }
  data: T
}

export interface iGenericErrorMessage {
  path: string | number
  message: string
}

export interface iGenericErrorResponse {
  statusCode: number
  message: string
  errorMessages: iGenericErrorMessage[]
}



export type Method = "get" | "post" | "put" | "delete";
export interface Middleware {
  (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ): void;
}

export interface RouteMetadata {
  method: Method;
  path: string;
  handler: PropertyKey;
  // middlewares: any[];
}

declare global {
  namespace Express {
    interface Request {
      user: User;
    }
  }
}
