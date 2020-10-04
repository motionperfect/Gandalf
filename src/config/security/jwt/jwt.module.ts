import { ConfigModule as NestConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';

import { JwtConfigService } from '.';

const Services = [JwtConfigService];

@Module({
  imports: [NestConfigModule],
  providers: [...Services],
  exports: [...Services],
})
export class JwtConfigModule {}
