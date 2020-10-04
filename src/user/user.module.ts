import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RoleModule } from '../security/role/role.module';

import { UserService } from '.';

import { UniqueEmailConstraint } from './dto/validator';

import { UserRepository } from './repository';

/* Export services */
const Services = [UserService];

@Module({
  imports: [TypeOrmModule.forFeature([UserRepository]), RoleModule],
  providers: [...Services, UniqueEmailConstraint],
  exports: [...Services],
})
export class UserModule {}
