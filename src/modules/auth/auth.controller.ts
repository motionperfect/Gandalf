import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';

import { LocalAuthGuard } from './guards';
import { SignUpDto } from './dto';
import { AuthService } from './auth.service';

@Controller('/local')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/sign-in')
  @UseGuards(LocalAuthGuard)
  @HttpCode(HttpStatus.OK)
  signIn(@Request() req) {
    return this.authService.signIn(req.user);
  }

  @Post('/sign-up')
  @HttpCode(HttpStatus.CREATED)
  async signUp(@Body() signUpDto: SignUpDto) {
    await this.authService.signUp(signUpDto);
  }
}
