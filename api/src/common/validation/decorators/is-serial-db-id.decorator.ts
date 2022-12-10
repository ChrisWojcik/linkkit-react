import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { isSerial } from '@/api/common/validation/lib';

export function IsSerialDbId(validationOptions?: ValidationOptions) {
  return (object: any, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: IsSerialDbIdConstraint,
    });
  };
}

@ValidatorConstraint({ name: 'IsSerialDbId' })
class IsSerialDbIdConstraint implements ValidatorConstraintInterface {
  validate(value: number) {
    return isSerial(value);
  }

  defaultMessage(args: ValidationArguments) {
    return `${args.property} does not exist`;
  }
}
