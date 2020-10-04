import { Module } from '@nestjs/common';

import { JwkStoreModule } from '../../security/jwk-store/jwk-store.module';

import { JwkController } from '.';

@Module({
  imports: [JwkStoreModule],
  controllers: [JwkController],
})
export class JwkModule {}
