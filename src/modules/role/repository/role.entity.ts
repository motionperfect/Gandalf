import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'role' })
export class RoleEntity {
  @PrimaryGeneratedColumn('increment', {
    name: 'role_id',
    type: 'tinyint',
    unsigned: true,
  })
  id: number;

  @Column('varchar', {
    name: 'name',
    unique: true,
    length: 24,
  })
  name: string;

  @Column(
    'boolean',
    {
      name: 'is_default',
      default: false,
    })
  isDefault: boolean;

  @CreateDateColumn({
    name: 'created_at',
    update: false,
    type: 'datetime',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'datetime',
  })
  updatedAt: Date;
}
