import { Module } from '@nestjs/common';
import { JwtModule as NestJwtModule } from '@nestjs/jwt';

import { JwtConfigModule } from './jwt/jwt.module';
import { JwtOptionsModule } from './jwt/options/options.module';

import { JwtOptionsService } from './jwt/options';

@Module({
  imports: [
    JwtConfigModule,
    NestJwtModule.registerAsync({
      imports: [JwtOptionsModule],
      useExisting: JwtOptionsService,
    }),
  ],
  exports: [NestJwtModule, JwtConfigModule],
})
export class SecurityConfigModule {}
