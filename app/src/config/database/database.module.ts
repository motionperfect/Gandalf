import { ConfigModule as NestConfigModule } from "@nestjs/config";
import { Module } from "@nestjs/common";

import { DatabaseConfigService } from "./database.service";

const Services = [
  DatabaseConfigService
];

@Module({
  imports: [
    NestConfigModule
  ],
  providers: [
    ...Services
  ],
  exports: [
    ...Services
  ]
})
export class DatabaseConfigModule {}
