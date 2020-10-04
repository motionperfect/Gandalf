import { Module } from '@nestjs/common';

import { AuthModule } from './auth/auth.module';
import { HealthModule } from './health/health.module';
import { JwkModule } from './jwk/jwk.module';

@Module({
  imports: [AuthModule, JwkModule, HealthModule],
})
export class RouterModule {}
