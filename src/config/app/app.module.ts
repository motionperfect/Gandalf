import { ConfigModule as NestConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';

import { AppConfigService } from './app.service';

const Services = [AppConfigService];

@Module({
  imports: [NestConfigModule],
  providers: [...Services],
  exports: [...Services],
})
export class AppConfigModule {}
