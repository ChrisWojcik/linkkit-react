import {
  PipeTransform,
  Injectable,
  NotFoundException,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import { isEmpty } from 'class-validator';
import { isIntegerString, isSerial } from '@/api/common/validation/lib';

/**
 * throws a 400 if the value is empty or a 404 if the value is not a valid db id
 */
@Injectable()
export class ParseSerialDbIdPipe implements PipeTransform {
  async transform(
    value: string,
    { data, type }: ArgumentMetadata
  ): Promise<number> {
    if (isEmpty(value)) {
      throw new BadRequestException([`${data || type} should not be empty`]);
    }

    if (!isIntegerString(value)) {
      throw new NotFoundException();
    }

    const asInteger = parseInt(value, 10);

    if (!isSerial(asInteger)) {
      throw new NotFoundException();
    }

    return asInteger;
  }
}
