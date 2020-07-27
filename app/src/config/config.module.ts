import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule as NestConfigModule } from "@nestjs/config";
import { Module } from "@nestjs/common";

import { AppConfigModule } from "./app/app.module";
import { DatabaseConfigModule } from "./database/database.module";
import { APIConfigModule } from "./api/api.module";

import { DatabaseConfigService } from "./database/database.service";

import schema from "./schema";
import { JWTConfigModule } from "./jwt/jwt.module";

const Exports = [
  DatabaseConfigModule,
  AppConfigModule,
  APIConfigModule,
  JWTConfigModule
];

@Module({
  imports: [
    NestConfigModule.forRoot({
      validationSchema: schema,
      expandVariables: true
    }),
    TypeOrmModule.forRootAsync({
      imports: [DatabaseConfigModule],
      useFactory: (config: DatabaseConfigService) => ({
        type: config.provider,
        host: config.host,
        port: config.port,
        username: config.user,
        password: config.password,
        database: config.database,
        entities: ["dist/**/**.entity{.ts,.js}"],
        synchronize: config.sync
      }),
      inject: [DatabaseConfigService]
    }),
    ...Exports
  ],
  exports: Exports
})
export class ConfigModule {}
