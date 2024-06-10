// auth.services.ts
import { PrismaClient, User } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { CreateUserDTO, LoginDTO } from "../../dtos/auth.dto";

import { PrismaService } from "../prisma/prisma.services";

import httpStatus from "http-status";
import { Injectable } from "../../../decorators/injectable";
import ApiError from "../../../infrastructure/errors/ApiError";

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}
  private generateToken(user: User) {
    const accessToken = jwt.sign(user, process.env.JWT_SECRET!, {
      expiresIn: "15m",
    });
    const refreshToken = jwt.sign(
      user,
      process.env.JWT_SECRET!,
      { expiresIn: "7d" }
    );
    return { accessToken, refreshToken };
  }

  async createUser(data: CreateUserDTO): Promise<User> {
    const alreadyExist = await this.prisma.user.findUnique({
      where: { email: data.email },
    });

    if (alreadyExist) {
      throw new ApiError(httpStatus.CONFLICT, "User already Exist");
    }
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const user = await this.prisma.user.create({
      data: {
        ...data,
        password: hashedPassword,
      },
    });
    return user;
  }

  async login(data: LoginDTO): Promise<{
     accessToken: string; refreshToken: string 
  }> {
    const user = await this.prisma.user.findUnique({
      where: { email: data.email },
    });
    if (!user || !(await bcrypt.compare(data.password, user.password))) {
      throw new ApiError(httpStatus.UNAUTHORIZED, "Invalid credentials");
    }
    const tokens = this.generateToken(user);
    return tokens
  }

  async refreshToken(token: string): Promise<{ accessToken: string }> {
    try {
      const decoded = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET!) as {
        userId: number;
      };
      const user = await this.prisma.user.findUnique({
        where: { id: decoded.userId },
      });
      if (!user) throw new ApiError(httpStatus.NOT_FOUND, "User not found ");
      const accessToken = jwt.sign(
        { userId: user.id },
        process.env.ACCESS_TOKEN_SECRET!,
        { expiresIn: "15m" }
      );
      return { accessToken };
    } catch (error) {
      throw new ApiError(httpStatus.UNAUTHORIZED, "Invalid refresh token");
    }
  }
}
