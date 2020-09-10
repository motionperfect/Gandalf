import { Length, ValidateNested } from 'class-validator';

import { IsComplexPassword } from './validators';
import { CreateUserDto } from '../../user/dto';
import { Type } from 'class-transformer';

export class SignUpDto implements Readonly<SignUpDto> {
  // FIXME: error messages aren't displayed
  @ValidateNested()
  @Type(() => CreateUserDto)
  user: CreateUserDto;

  @Length(8, 64)
  @IsComplexPassword()
  password: string;
}
