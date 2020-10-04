import { Module } from '@nestjs/common';

import { HealthController, HealthService } from '.';

@Module({
  controllers: [HealthController],
  providers: [HealthService],
})
export class HealthModule {}
