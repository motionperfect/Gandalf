import PasswordValidator from "password-validator";
import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface
} from "class-validator";

const schema = new PasswordValidator().has().
  uppercase().
  has().
  lowercase().
  has().
  digits().
  has().
  symbols().
  has().
  not().
  spaces();

@ValidatorConstraint({ async: false })
export class ComplexPasswordConstraint implements ValidatorConstraintInterface {
  validate (text: string, args: ValidationArguments) {
    return schema.validate(text) as boolean;
  }

  defaultMessage (args: ValidationArguments) {
    return "$property must be a string conforming to the specified constraints";
  }
}

export const IsComplexPassword = (validationOptions?: ValidationOptions) =>
  (object: Object, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: ComplexPasswordConstraint
    });
  };
