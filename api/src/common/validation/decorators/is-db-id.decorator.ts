import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { isBigSerial } from '../lib/isBigSerial';

export function IsDbId(validationOptions?: ValidationOptions) {
  return (object: any, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: IsDbIdConstraint,
    });
  };
}

@ValidatorConstraint({ name: 'IsDbId' })
class IsDbIdConstraint implements ValidatorConstraintInterface {
  validate(value: string) {
    return isBigSerial(value);
  }

  defaultMessage(args: ValidationArguments) {
    return `${args.property} does not exist`;
  }
}
