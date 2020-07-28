import { Module } from "@nestjs/common";
import { ScheduleModule } from "@nestjs/schedule";

import { AuthModule } from "./modules/auth/auth.module";
import { ConfigModule } from "./config/config.module";

import { AppService } from "./app.service";
import { AppController } from "./app.controller";

const Services = [
  AppService
];

@Module({
  imports: [
    ConfigModule,
    ScheduleModule.forRoot(),
    AuthModule
  ],
  controllers: [
    AppController
  ],
  providers: [
    ...Services
  ]
})
export class AppModule {}
