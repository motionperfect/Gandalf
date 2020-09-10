import {
  IsDate,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  Min,
  ValidateNested,
} from 'class-validator';
import { Exclude, Expose, plainToClass, Type } from 'class-transformer';

import { LocalAccountEntity } from '../entities';
import { UserDto } from '../../user/dto';

@Exclude()
export class LocalAccountDto implements Readonly<LocalAccountDto> {
  @ValidateNested()
  @Type(() => UserDto)
  @Expose()
  user: UserDto;

  @IsDate()
  @IsOptional()
  lastPasswordFailureDate?: Date;

  @IsNumber()
  @Min(0)
  loginFailureSinceLastSuccess: number;

  @IsString()
  password: string;

  @IsDate()
  @IsOptional()
  lastPasswordChangeDate?: Date;

  @IsUUID()
  emailConfirmationToken: string;

  @IsDate()
  createdAt: Date;

  public static from(dto: Partial<LocalAccountDto>) {
    return plainToClass<LocalAccountDto, Partial<LocalAccountDto>>(
      LocalAccountDto,
      dto,
      { excludeExtraneousValues: true },
    );
  }

  public static fromEntity(entity: LocalAccountEntity) {
    return plainToClass<LocalAccountDto, Partial<LocalAccountEntity>>(
      LocalAccountDto,
      entity,
      { excludeExtraneousValues: true },
    );
  }

  public toEntity() {
    return plainToClass<LocalAccountEntity, Partial<LocalAccountDto>>(
      LocalAccountEntity,
      this,
      { excludeExtraneousValues: true },
    );
  }
}
