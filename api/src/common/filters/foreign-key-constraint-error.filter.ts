import {
  ExceptionFilter,
  Catch,
  HttpStatus,
  ArgumentsHost,
} from '@nestjs/common';
import { Response } from 'express';
import { ForeignKeyConstraintError } from 'sequelize';

const constraintNameToErrorMessage = {
  comment_post_id_fkey: 'postId does not exist',
  comment_parent_id_fkey: 'parentId does not exist',
};

/**
 * Catches foreign key constraint errors and returns a 400 with a friendly error message
 */
@Catch(ForeignKeyConstraintError)
export class ForeignKeyConstraintErrorFilter implements ExceptionFilter {
  catch(exception: ForeignKeyConstraintError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const { index } = exception;
    const message = constraintNameToErrorMessage[index];
    const statusCode = message
      ? HttpStatus.BAD_REQUEST
      : HttpStatus.INTERNAL_SERVER_ERROR;
    const error = message ? 'Bad Request' : 'Internal server error';

    response.status(statusCode).json({
      error,
      message,
      statusCode,
    });
  }
}
