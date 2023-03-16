import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { decodeCursor } from '@/api/common/pagination';
import { isPlainObject, isUndefined } from '@/api/common/validation/lib';

/**
 * Decodes and validates a pagination cursor
 */
@Injectable()
export class ParsePaginationCursorPipe implements PipeTransform {
  async transform(value: string, metadata: ArgumentMetadata) {
    const { data, type, metatype } = metadata;

    if (!this.isValidMetatype(metatype)) {
      throw new Error(
        'ParsePaginationCursorPipe requires an expected type compatible with class-validator'
      );
    }

    if (!this.isValidDataAndType(data, type)) {
      throw new Error(
        'ParsePaginationCursorPipe should only be used to parse data that is part of the request'
      );
    }

    if (isUndefined(value)) {
      return value;
    }

    let decoded: any;

    try {
      decoded = decodeCursor(value);
    } catch (error) {
      throw new BadRequestException(this.composeErrorMessage(data));
    }

    if (!isPlainObject(decoded)) {
      throw new BadRequestException(this.composeErrorMessage(data));
    }

    const cursorObject = plainToClass(metatype, decoded);
    const errors = await validate(cursorObject);

    if (errors.length > 0) {
      throw new BadRequestException(this.composeErrorMessage(data));
    }

    return decoded;
  }

  protected composeErrorMessage(data: string) {
    return `${data} is not valid`;
  }

  protected isValidMetatype(metatype: unknown) {
    const types = [String, Boolean, Number, Array, Object, Buffer, Symbol];

    return !types.some((t) => metatype === t) && metatype != null;
  }

  protected isValidDataAndType(data: string, type: string) {
    return data && (type === 'body' || type === 'query' || type === 'param');
  }
}
