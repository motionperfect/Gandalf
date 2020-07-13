import {
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  JoinColumn,
  OneToOne
} from "typeorm";

import { UserEntity } from "../../user/entities";

@Entity()
export class LocalAccountEntity {
  @OneToOne(
    () => UserEntity,
    {
      primary: true
    })
  @JoinColumn()
  user: UserEntity;

  @Column(
    "datetime",
    {
      nullable: true
    })
  lastPasswordFailureDate: Date;

  @Column(
    "tinyint",
    {
      unsigned: true,
      default: 0
    })
  loginFailureSinceLastSuccess: number;

  @Column(
    "varchar",
    {
      length: 64
    })
  password: string;

  @Column(
    "datetime",
    {
      nullable: true
    })
  lastPasswordChangeDate: Date;

  @Column()
  @Generated("uuid")
  emailConfirmationToken: string;

  @CreateDateColumn()
  readonly createdAt: Date;
}
