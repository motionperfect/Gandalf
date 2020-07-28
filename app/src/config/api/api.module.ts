import { ConfigModule as NestConfigModule } from "@nestjs/config";
import { Module } from "@nestjs/common";

import { APIConfigService } from "./api.service";

const Services = [
  APIConfigService
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
export class APIConfigModule {}
