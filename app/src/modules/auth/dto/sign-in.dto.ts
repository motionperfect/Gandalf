import { IsEmail, IsString } from "class-validator";

export class SignInDto implements Readonly<SignInDto> {

  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
