import { ApiProperty } from '@nestjs/swagger';
import { Expose, plainToClass } from 'class-transformer';
import { IsEmail } from 'class-validator';

import { IsUniqueEmail } from './validator';

export class CreateUserDto implements Readonly<CreateUserDto> {
  @ApiProperty()
  @IsEmail()
  @IsUniqueEmail({
    message: 'This email is already taken',
  })
  @Expose()
  email: string;

  public static from(dto: Partial<CreateUserDto>) {
    return plainToClass<CreateUserDto, Partial<CreateUserDto>>(
      CreateUserDto,
      dto,
      { excludeExtraneousValues: true },
    );
  }
}
