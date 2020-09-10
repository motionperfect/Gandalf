import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthService } from './auth.service';
import { LocalStrategy } from './strategies';
import { AuthController } from './auth.controller';
import { LocalAccountEntity } from './entities';

import { AppConfigModule } from '../../config/app/app.module';
import { JWTConfigModule } from '../../config/jwt/jwt.module';
import { UserModule } from '../user/user.module';

import { JWTConfigService } from '../../config/jwt/jwt.service';

/* Export services */
const Services = [AuthService];

@Module({
  imports: [
    TypeOrmModule.forFeature([LocalAccountEntity]),
    JWTConfigModule,
    AppConfigModule,
    UserModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [JWTConfigModule],
      useExisting: JWTConfigService,
    }),
  ],
  controllers: [AuthController],
  providers: [...Services, LocalStrategy],
  exports: [...Services],
})
export class AuthModule {}
