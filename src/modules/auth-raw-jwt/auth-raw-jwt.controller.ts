import { Body, Controller, Inject, Post } from '@nestjs/common';

import { SignInDto } from '@/modules/auth-raw-jwt/dtos/sign-in.dto';
import { SignUpDto } from '@/modules/auth-raw-jwt/dtos/sign-up.dto';
import { IAuthController } from '@/domain/modules/auth/auth.controller.interface';
import {
  AuthServiceToken,
  IAuthService,
} from '@/domain/modules/auth/auth.service.interface';

@Controller('auth')
export class AuthRawJwtController implements IAuthController {
  constructor(
    @Inject(AuthServiceToken)
    private authRawJwtService: IAuthService,
  ) {}

  @Post('sign-in')
  async signIn(
    @Body()
    body: SignInDto,
  ) {
    return await this.authRawJwtService.signIn(body);
  }

  @Post('sign-up')
  async signUp(
    @Body()
    body: SignUpDto,
  ) {
    return await this.authRawJwtService.signUp(body);
  }
}
