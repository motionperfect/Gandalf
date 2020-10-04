import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';

import { DatabaseConfigService } from '.';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [NestConfigModule],
      useClass: DatabaseConfigService,
    }),
  ],
})
export class DatabaseConfigModule {}
