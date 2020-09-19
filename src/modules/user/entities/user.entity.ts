import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'Users' })
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', {
    length: 320,
    unique: true,
  })
  email: string;

  @Column('boolean', {
    default: false,
  })
  isEmailVerified: boolean;

  @Column('boolean', {
    default: false,
  })
  isBanned: boolean;

  @CreateDateColumn({
    type: 'datetime',
    update: false,
  })
  createdAt: Date;
}
