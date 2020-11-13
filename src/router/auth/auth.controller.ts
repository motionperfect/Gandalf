import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiInternalServerErrorResponse, ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { AuthService } from './index';

import { LocalAuthGuard } from './guard';

import { LoggedInDto, SignUpDto } from './dto';

@ApiTags('local')
@Controller('/local')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOkResponse({
    description: 'Retrieved authentication token with the expiration time.',
    type: LoggedInDto
  })
  @ApiNotFoundResponse({ description: 'Cannot find user with this email and password.' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error'})
  @Post('/sign-in')
  @UseGuards(LocalAuthGuard)
  @HttpCode(HttpStatus.OK)
  signIn(@Request() req): Promise<LoggedInDto> {
    return this.authService.signIn(req.user);
  }
  @ApiOkResponse({ description: 'The user was successfully created.' })
  @ApiNotFoundResponse({ description: 'Cannot create user with this email and password' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error'})
  @Post('/sign-up')
  @HttpCode(HttpStatus.CREATED)
  async signUp(@Body() signUpDto: SignUpDto): Promise<void> {
    await this.authService.signUp(signUpDto);
  }
}
