
import { Response,Request } from "express";
import { CreateUserDTO, LoginDTO } from "../../../domain/dtos/auth.dto";
import { AuthService } from "../../../domain/services/auth/auth.services";

import { User } from "@prisma/client";
import { Controller } from "../../../decorators/controllers";
import { Post } from "../../../decorators/routes";
import { UseMiddlewares } from "../../../decorators/middleware";

import { Body, CurrentUser, Req, Res } from "../../../decorators/params";
import { validateRequestBody } from "../../../infrastructure/middlewares/validateRequestDto";


@Controller("/auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post("/register")
  @UseMiddlewares(validateRequestBody(CreateUserDTO))
  async register(@Body() body: CreateUserDTO, @Res() res: Response,@Req() req:Request) {
    console.log(req.body,"body")
    return await this.authService.createUser(body);
  }

  @Post("/login")
  // @UseMiddlewares(authMiddleware)
  // @UseMiddlewares(validateRequestBody(LoginDTO))
  async login(
    @CurrentUser() user: User,
    @Body() body: LoginDTO,
    @Res() res: Response
  ) {
    return await this.authService.login(body);
  }

  @Post("/refresh-token")
  async refreshToken(@Body() body: { token: string }, @Res() res: Response) {
    return await this.authService.refreshToken(body.token);
  }
}
