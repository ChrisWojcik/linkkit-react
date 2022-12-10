import {
  ValidationPipe as BaseValidationPipe,
  ValidationPipeOptions,
} from '@nestjs/common';

/**
 * Extends NestJS built in ValidationPipe with default options
 */
export class ValidationPipe extends BaseValidationPipe {
  constructor(options?: ValidationPipeOptions) {
    options = options || {};

    super({
      transform: true,
      whitelist: true,
      forbidUnknownValues: true,
      ...options,
    });
  }
}
