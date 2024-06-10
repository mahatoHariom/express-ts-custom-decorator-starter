import { IsNotEmpty, IsString, MinLength } from "class-validator";

export class CreateUserDTO {
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  name: string;

  @IsString()
  @IsNotEmpty()
  email: string;
}
