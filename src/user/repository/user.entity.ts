import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { RoleEntity } from '../../security/role/repository';

@Entity({ name: 'user' })
export class UserEntity {
  @PrimaryGeneratedColumn('uuid', {
    name: 'user_uuid',
  })
  uuid: string;

  @Column('varchar', {
    name: 'email',
    length: 320,
    unique: true,
  })
  email: string;

  @ManyToMany(() => RoleEntity)
  @JoinTable({
    name: 'user_role',
    joinColumn: { name: 'user_uuid' },
    inverseJoinColumn: { name: 'role_id' },
  })
  roles: RoleEntity[];

  @Column('boolean', {
    name: 'is_email_verified',
    default: false,
  })
  isEmailVerified: boolean;

  @Column('boolean', {
    name: 'is_banned',
    default: false,
  })
  isBanned: boolean;

  @CreateDateColumn({
    name: 'created_at',
    type: 'datetime',
    update: false,
  })
  createdAt: Date;
}
