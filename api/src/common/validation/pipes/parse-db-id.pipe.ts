import {
  PipeTransform,
  Injectable,
  NotFoundException,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import { isBigSerial } from '../lib/isBigSerial';
import { isEmpty } from '../lib/isEmpty';

/**
 * throws a 400 if the value is empty or a 404 if the value is not a valid db id
 */
@Injectable()
export class ParseDbIdPipe implements PipeTransform {
  async transform(
    value: string,
    { data, type }: ArgumentMetadata
  ): Promise<string> {
    if (isEmpty(value)) {
      throw new BadRequestException(`${data || type} should not be empty`);
    }

    if (!isBigSerial(value)) {
      throw new NotFoundException();
    }

    return value;
  }
}
