import { IsBoolean, IsDate, IsEmail, IsUUID } from 'class-validator';
import { Exclude, Expose, plainToClass } from 'class-transformer';

import { UserEntity } from '../entities';

@Exclude()
export class UserDto implements Readonly<UserDto> {
  @IsUUID()
  @Expose()
  id: string;

  @IsEmail()
  @Expose()
  email: string;

  @IsBoolean()
  isEmailVerified: boolean;

  @IsBoolean()
  isBanned: boolean;

  @IsDate()
  createdAt: Date;

  public static from(dto: Partial<UserDto>) {
    return plainToClass<UserDto, Partial<UserDto>>(UserDto, dto, {
      excludeExtraneousValues: true,
    });
  }

  public static fromEntity(entity: UserEntity) {
    return plainToClass<UserDto, Partial<UserEntity>>(UserDto, entity, {
      excludeExtraneousValues: true,
    });
  }

  public toEntity() {
    return plainToClass<UserEntity, Partial<UserDto>>(UserEntity, this, {
      excludeExtraneousValues: true,
    });
  }
}
