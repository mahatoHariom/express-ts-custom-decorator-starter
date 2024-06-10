import { NextFunction, Request, Response } from "express";

import { User } from "@prisma/client";
import { CreateUserDTO } from "../../../domain/dtos/auth.dto";
import { Controller } from "../../../decorators/controllers";
import { UserService } from "../../../domain/services/users/users.services";
import { Get, Post } from "../../../decorators/routes";
import { Body, CurrentUser, Next, Req, Res } from "../../../decorators/params";

@Controller("/users")
export class UserController {
  constructor(private userService: UserService) {}

  @Get("/")
  async getUsers(
    @CurrentUser() user: User,
    @Req() req: Request,
    @Res() res: Response
  ) {

    const users = await this.userService.findAll();
    return users
  }

  @Post("/")
  async createUser(
    @Body() body: CreateUserDTO,
    @Res() res: Response,
    @Next() next: NextFunction
  ) {
    try {
      const user = await this.userService.create(body);
      res.json(user);
    } catch (error) {
      next(error);
    }
  }
}