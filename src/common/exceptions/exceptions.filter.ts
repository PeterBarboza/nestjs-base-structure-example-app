import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';

interface JsonResponse {
  status: number;
  message: string | string[];
  timestamp: string;
  path: string;
}
type ExceptionResponse =
  | {
      message: string | string[];
    }
  | string;

@Catch(HttpException)
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const responseData: JsonResponse = {
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      message: 'Internal Server Error',
      timestamp: new Date().toISOString(),
      path: request.url,
    };

    if (exception instanceof HttpException) {
      const response = exception.getResponse() as ExceptionResponse;
      responseData.status = exception.getStatus();

      if (typeof response === 'string') {
        responseData.message = response;
      } else {
        responseData.message = response.message;
      }
    }

    response.status(responseData.status).json(responseData);
  }
}
