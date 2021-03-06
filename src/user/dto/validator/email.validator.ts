import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { Injectable } from '@nestjs/common';

import { UserService } from '../..';

@Injectable()
@ValidatorConstraint({ async: true })
export class UniqueEmailConstraint implements ValidatorConstraintInterface {
  constructor(private readonly userService: UserService) {}

  validate(email: any /* , args: ValidationArguments */) {
    return this.userService
      .findByEmail(email)
      .then(user => !user)
      .catch(() => true);
  }
}

export const IsUniqueEmail = (validationOptions?: ValidationOptions) => (
  object: Record<string, any>,
  propertyName: string,
) => {
  registerDecorator({
    target: object.constructor,
    propertyName: propertyName,
    options: validationOptions,
    constraints: [],
    validator: UniqueEmailConstraint,
  });
};
