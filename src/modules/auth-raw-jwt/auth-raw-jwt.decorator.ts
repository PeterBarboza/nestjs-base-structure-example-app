import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export interface AuthenticatedUserData {
  sub: string;
}

export const AuthenticatedUser = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
