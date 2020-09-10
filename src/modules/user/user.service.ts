import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { UserEntity } from './entities';
import { UserNotFoundException } from './exceptions';
import { CreateUserDto, UserDto } from './dto';

/**
 * TypeORM user repository implementation
 */
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly repository: Repository<UserEntity>,
  ) {}

  async find(id: string): Promise<UserEntity> {
    const foundUser = await this.repository.findOne(id);

    if (!foundUser) {
      throw UserNotFoundException.fromId(id);
    }
    return foundUser;
  }

  async findByEmail(email: string): Promise<UserEntity> {
    const foundUser = await this.repository.findOne({
      where: { email: email },
    });

    if (!foundUser) {
      throw UserNotFoundException.fromEmail(email);
    }
    return foundUser;
  }

  create(createUserDto: CreateUserDto): Promise<UserEntity> {
    return this.repository.save(createUserDto);
  }

  update(userDto: UserDto): Promise<UserEntity> {
    return this.repository.save(userDto);
  }
}
