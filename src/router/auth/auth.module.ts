import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppConfigModule } from '../../config/app/app.module';
import { JwkStoreModule } from '../../security/jwk-store/jwk-store.module';
import { SecurityConfigModule } from '../../config/security/security.module';
import { UserModule } from '../../user/user.module';

import { AuthController, AuthService } from '.';

import { LocalStrategy } from './strategy';

import { LocalAccountRepository } from './repository';

/* Export services */
const Services = [AuthService];

@Module({
  imports: [
    TypeOrmModule.forFeature([LocalAccountRepository]),
    PassportModule,
    AppConfigModule,
    SecurityConfigModule,
    JwkStoreModule,
    UserModule,
  ],
  controllers: [AuthController],
  providers: [...Services, LocalStrategy],
  exports: [...Services],
})
export class AuthModule {}
