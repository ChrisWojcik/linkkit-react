import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

export function IsMutuallyExclusiveWith(
  relatedPropertyNames: string[],
  validationOptions?: ValidationOptions
) {
  return (object: any, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: relatedPropertyNames,
      validator: IsMutuallyExclusiveWithConstraint,
    });
  };
}

@ValidatorConstraint({ name: 'IsMutuallyExclusiveWith' })
class IsMutuallyExclusiveWithConstraint
  implements ValidatorConstraintInterface
{
  validate(value: any, args: ValidationArguments) {
    const relatedPropertyNames: string[] = args.constraints;
    const hasARelatedValue = relatedPropertyNames.reduce(
      (result: boolean, propertyName: string) => {
        return result || args.object[propertyName] != null;
      },
      false
    );

    return value == null || !hasARelatedValue;
  }

  defaultMessage(args: ValidationArguments) {
    return `${args.property} is mutually exclusive with ${args.constraints.join(
      ', '
    )}`;
  }
}
