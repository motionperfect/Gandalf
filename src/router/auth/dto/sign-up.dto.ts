import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { Length, ValidateNested } from 'class-validator';

import { IsComplexPassword } from './validators';
import { CreateUserDto } from '../../../user/dto';

export class SignUpDto implements Readonly<SignUpDto> {
  // FIXME: error messages aren't displayed
  @ApiProperty()
  @ValidateNested()
  @Type(() => CreateUserDto)
  user: CreateUserDto;

  @ApiProperty()
  @Length(8, 64)
  @IsComplexPassword()
  password: string;
}
