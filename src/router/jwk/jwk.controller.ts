import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';

import { JwkStoreService } from '../../security/jwk-store';

@Controller('/.well-known')
export class JwkController {
  constructor(private readonly jwtService: JwkStoreService) {}

  @Get('/jwks.json')
  @HttpCode(HttpStatus.OK)
  certificates() {
    return this.jwtService.publicKeys;
  }
}
