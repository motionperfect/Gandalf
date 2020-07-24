import { Module } from "@nestjs/common";
import { APP_GUARD } from "@nestjs/core";

import { AppService } from "./app.service";
import { AppController } from "./app.controller";
import { AuthGuard } from "./guards";

const Services = [
  AppService
];

@Module({
  imports: [],
  controllers: [
    AppController
  ],
  providers: [
    ...Services,
    {
      provide: APP_GUARD,
      useClass: AuthGuard
    }
  ]
})
export class AppModule {}
