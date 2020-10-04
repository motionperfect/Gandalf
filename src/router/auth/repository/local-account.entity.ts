import {
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  JoinColumn,
  OneToOne,
} from 'typeorm';

import { UserEntity } from '../../../user/repository';

@Entity({ name: 'local_account' })
export class LocalAccountEntity {
  @OneToOne(() => UserEntity, {
    primary: true,
  })
  @JoinColumn({ name: 'user_uuid' })
  user: UserEntity;

  @Column('datetime', {
    name: 'last_password_failure_at',
    nullable: true,
  })
  lastPasswordFailureAt: Date;

  @Column('tinyint', {
    name: 'login_failure_since_last_success',
    unsigned: true,
    default: 0,
  })
  loginFailureSinceLastSuccess: number;

  @Column('varchar', {
    name: 'password',
    length: 64,
  })
  password: string;

  @Column('datetime', {
    name: 'last_password_change_at',
    nullable: true,
  })
  lastPasswordChangeAt: Date;

  @Column('char', {
    name: 'email_confirmation_token',
  })
  @Generated('uuid')
  emailConfirmationToken: string;

  @CreateDateColumn({
    name: 'created_at',
    update: false,
    type: 'datetime',
  })
  createdAt: Date;
}
