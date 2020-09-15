import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';

import { AppConfigModule } from './app/app.module';
import { DatabaseConfigModule } from './database/database.module';
import { JWTConfigModule } from './jwt/jwt.module';

import { DatabaseConfigService } from './database/database.service';

import schema from './schema';

const Modules = [DatabaseConfigModule, AppConfigModule, JWTConfigModule];

@Module({
  imports: [
    NestConfigModule.forRoot({
      validationSchema: schema,
      expandVariables: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [DatabaseConfigModule],
      useExisting: DatabaseConfigService,
    }),
    ...Modules,
  ],
  exports: Modules,
})
export class ConfigModule {}
