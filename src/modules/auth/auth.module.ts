import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppConfigModule } from '../../config/app/app.module';
import { JWTConfigModule } from '../../config/jwt/jwt.module';
import { UserModule } from '../user/user.module';

import { JWTConfigService } from '../../config/jwt';
import { AuthService, AuthController } from '.';

import { LocalStrategy } from './strategy';

import { LocalAccountRepository } from './repository';

/* Export services */
const Services = [AuthService];

const Modules = [JWTConfigModule, AppConfigModule, UserModule];

@Module({
  imports: [
    TypeOrmModule.forFeature([LocalAccountRepository]),
    JwtModule.registerAsync({
      imports: [JWTConfigModule],
      useExisting: JWTConfigService,
    }),
    PassportModule,
    ...Modules,
  ],
  controllers: [AuthController],
  providers: [...Services, LocalStrategy],
  exports: [...Services],
})
export class AuthModule {}
