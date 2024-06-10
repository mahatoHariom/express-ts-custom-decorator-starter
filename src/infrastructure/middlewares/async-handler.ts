/**
 * The asyncHandler function is a middleware that wraps asynchronous route handlers in Express to
 * handle errors.
 * @param fn - The `fn` parameter in the `asyncHandler` function is a function that takes three
 * parameters: `req` (Request), `res` (Response), and `next` (NextFunction), and returns a Promise.
 * This function is typically an asynchronous function that performs some operation within an Express
 * route
 */
// asyncHandler.ts
import { Request, Response, NextFunction } from "express";

export const asyncHandler =
  (fn: (req: Request, res: Response, next: NextFunction) => Promise<any>) =>
  (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
