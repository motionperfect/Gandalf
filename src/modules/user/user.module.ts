import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { UserService } from "./user.service";
import { UniqueEmailConstraint } from "./dto/validators";
import { UserEntity } from "./entities";

/* Export services */
const Services = [
  UserService
];

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity])
  ],
  providers: [
    ...Services,
    UniqueEmailConstraint
  ],
  exports: [
    ...Services
  ]
})
export class UserModule {}
