import { Injectable } from '@nestjs/common';

import { RoleRepository } from './repository';

@Injectable()
export class RoleService {
  constructor(private readonly roleRepository: RoleRepository) {}

  findAll() {
    return this.roleRepository.find({
      cache: true,
    });
  }
}
