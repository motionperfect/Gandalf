import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';

import { RoleService } from '../role';

import { UserEntity, UserRepository } from './repository';

import { UserNotFoundException } from './exception';

import { CreateUserDto } from './dto';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly roleService: RoleService
  ) {}

  async findById(userId: string): Promise<UserEntity> {
    const foundUser = await this.userRepository.findOne(userId);

    if (!foundUser) {
      throw UserNotFoundException.fromId(userId);
    }
    return foundUser;
  }

  async findByEmail(email: string): Promise<UserEntity> {
    const foundUser = await this.userRepository.findOne({
      where: { email: email },
    });

    if (!foundUser) {
      throw UserNotFoundException.fromEmail(email);
    }
    return foundUser;
  }

  async create(
    createUserDto: CreateUserDto,
    manager: EntityManager = this.userRepository.manager,
  ): Promise<UserEntity> {
    const userRepository = manager.getCustomRepository(UserRepository);
    const newUser = userRepository.create(createUserDto);
    const roles = await this.roleService.findAll();

    newUser.roles = roles.filter((role) => role.isDefault === true);
    return userRepository.save(newUser);
  }
}
