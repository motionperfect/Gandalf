import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';

import { AppService } from './app.service';
import { JWTConfigService } from '../../config/jwt/jwt.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly jwtConfigService: JWTConfigService,
  ) {}

  @Get('/certs')
  @HttpCode(HttpStatus.OK)
  certificates() {
    return this.jwtConfigService.publicKeys;
  }

  @Get('/ping')
  @HttpCode(HttpStatus.OK)
  ping() {
    return this.appService.ping();
  }
}
