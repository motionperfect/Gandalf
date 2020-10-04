import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  BadRequestException,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus() || HttpStatus.INTERNAL_SERVER_ERROR;

    const errors = exception instanceof BadRequestException
      ? (exception.getResponse() as any).message
      : [exception.message];

    response.status(status).json({
      statusCode: status,
      errors: errors,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
