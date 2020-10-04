import { Module } from '@nestjs/common';

import { JwtConfigModule } from '../../config/security/jwt/jwt.module';

import { JwkStoreService } from '.';

const Services = [JwkStoreService];

@Module({
  imports: [JwtConfigModule],
  providers: [...Services],
  exports: [...Services],
})
export class JwkStoreModule {}
