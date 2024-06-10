import { Module } from "../../../decorators/module";
import { UserService } from "../../../domain/services/users/users.services";
import { UserController } from "./users.controller";

@Module({
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
