import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiInternalServerErrorResponse, ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { HealthService } from '.';

@ApiTags('health')
@Controller('/health')
export class HealthController {
  constructor(private readonly healthService: HealthService) {}

  @ApiOkResponse({ description: 'API is up' })
  @ApiNotFoundResponse({ description: 'API is down' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error'})
  @Get('/ping')
  @HttpCode(HttpStatus.OK)
  ping() {
    return this.healthService.ping();
  }
}
