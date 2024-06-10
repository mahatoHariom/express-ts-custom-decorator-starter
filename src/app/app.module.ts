import { Module } from "../decorators/module";
import { AuthModule } from "./controllers/auth/auth.module";
import { UserModule } from "./controllers/users/users.module";
@Module({
  imports: [AuthModule, UserModule],
})
export class AppModule {}