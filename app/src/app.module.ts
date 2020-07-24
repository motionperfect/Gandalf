import { Module } from "@nestjs/common";

import { AppService } from "./app.service";
import { AppController } from "./app.controller";

const Services = [
  AppService
];

@Module({
  imports: [],
  controllers: [
    AppController
  ],
  providers: [
    ...Services
  ]
})
export class AppModule {}
