import { ConfigModule as NestConfigModule } from "@nestjs/config";
import { Module } from "@nestjs/common";

import { APIConfigModule } from "../api/api.module";

import { AppConfigService } from "./app.service";

const Services = [
  AppConfigService
];

@Module({
  imports: [
    NestConfigModule,
    APIConfigModule
  ],
  providers: [
    ...Services
  ],
  exports: [
    ...Services
  ]
})
export class AppConfigModule {}
