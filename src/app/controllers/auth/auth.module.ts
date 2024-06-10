import { Module } from "../../../decorators/module";
import { AuthService } from "../../../domain/services/auth/auth.services";
import { AuthController } from "./auth.controllers";

@Module({
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
