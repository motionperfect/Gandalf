import { ConfigModule as NestConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';

import { AppConfigModule } from './app/app.module';
import { SecurityConfigModule } from './security/security.module';
import { WorkerConfigModule } from './worker/worker.module';
import { IoConfigModule } from './IO/io.module';

import { schema } from './schema';

@Module({
  imports: [
    NestConfigModule.forRoot({
      validationSchema: schema,
      expandVariables: true,
    }),
    AppConfigModule,
    SecurityConfigModule,
    IoConfigModule,
    WorkerConfigModule,
  ],
})
export class ConfigModule {}
