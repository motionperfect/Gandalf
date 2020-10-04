import { Module } from '@nestjs/common';

import { DatabaseConfigModule } from './database/database.module';

@Module({
  imports: [DatabaseConfigModule],
})
export class IoConfigModule {}
