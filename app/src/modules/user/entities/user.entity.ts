import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn
} from "typeorm";

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @Column(
    "varchar",
    {
      length: 320,
      unique: true
    })
  email: string;

  @Column(
    "boolean",
    {
      default: false
    })
  isEmailVerified: boolean;

  @Column(
    "boolean",
    {
      default: false
    })
  isBanned: boolean;

  @CreateDateColumn()
  readonly createdAt: Date;
}