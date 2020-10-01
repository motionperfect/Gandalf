import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RoleModule } from '../role/role.module';

import { UserService } from './user.service';

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
