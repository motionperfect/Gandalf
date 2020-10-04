import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RoleService } from '.';

import { RoleRepository } from './repository';

const Services = [RoleService];

@Module({
  imports: [TypeOrmModule.forFeature([RoleRepository])],
  providers: [...Services],
  exports: [...Services],
})
export class RoleModule {}
