import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiInternalServerErrorResponse, ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { JwkStoreService } from '../../security/jwk-store';

@ApiTags('well-known')
@Controller('/.well-known')
export class JwkController {
  constructor(private readonly jwtService: JwkStoreService) {}

  @ApiOkResponse({ description: 'Retrieved JWK certificates in JSON format.' })
  @ApiNotFoundResponse({ description: 'Cannot find JWK certificates.' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error'})
  @Get('/jwks.json')
  @HttpCode(HttpStatus.OK)
  certificates() {
    return this.jwtService.publicKeys;
  }
}
