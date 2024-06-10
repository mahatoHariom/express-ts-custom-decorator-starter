import { Request, Response, NextFunction } from "express";
import ApiError from "../errors/ApiError";
import jwt, { JwtPayload } from 'jsonwebtoken'
import { User } from "@prisma/client";
const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  try {
    console.log("running auth");
    if (!req.headers) {
      throw new ApiError(401, "Unauthorized - Headers missing");
    }

    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new ApiError(
        401,
        "Unauthorized - Missing or invalid authorization header"
      );
    }

    const token = authHeader.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET)  as User
    req.user=decodedToken 

    next();
  } catch (error) {
    next(error)
  }
};

export default authMiddleware;
