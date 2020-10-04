import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';

import { HealthService } from '.';

@Controller('/health')
export class HealthController {
  constructor(private readonly healthService: HealthService) {}

  @Get('/ping')
  @HttpCode(HttpStatus.OK)
  ping() {
    return this.healthService.ping();
  }
}
