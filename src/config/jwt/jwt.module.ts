import { ConfigModule as NestConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';

import { JWTConfigService } from './jwt.service';

const Services = [JWTConfigService];

@Module({
  imports: [NestConfigModule],
  providers: [...Services],
  exports: [...Services],
})
export class JWTConfigModule {}
