import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';

import { RouterModule } from '../router/router.module';
import { ConfigModule } from '../config/config.module';

import { HttpExceptionFilter } from './filter';

@Module({
  imports: [ConfigModule, RouterModule],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {}
