import { Module } from '@nestjs/common';

import { JwtConfigModule } from '../jwt.module';
import { JwkStoreModule } from '../../../../security/jwk-store/jwk-store.module';

import { JwtOptionsService } from '.';

const Services = [JwtOptionsService];

@Module({
  imports: [JwtConfigModule, JwkStoreModule],
  providers: [...Services],
  exports: [...Services],
})
export class JwtOptionsModule {}
