import { HttpException, HttpStatus } from '@nestjs/common';

export class Exceptions {
  static BadRequest(message: string): never {
    throw new HttpException(message, HttpStatus.BAD_REQUEST);
  }

  static Unauthorized(message: string): never {
    throw new HttpException(message, HttpStatus.UNAUTHORIZED);
  }

  static InternalServerError(message: string): never {
    throw new HttpException(message, HttpStatus.INTERNAL_SERVER_ERROR);
  }

  static NotFound(message: string): never {
    throw new HttpException(message, HttpStatus.NOT_FOUND);
  }
  static Forbidden(message: string): never {
    throw new HttpException(message, HttpStatus.FORBIDDEN);
  }
}
