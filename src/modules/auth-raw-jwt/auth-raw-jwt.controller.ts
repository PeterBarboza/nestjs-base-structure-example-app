import { Body, Controller, Post } from '@nestjs/common';

import { AuthRawJwtService } from './auth-raw-jwt.service';
import { SignInDto } from './dtos/sign-in.dto';
import { SignUpDto } from './dtos/sign-up.dto';

@Controller('auth')
export class AuthRawJwtController {
  constructor(private authRawJwtService: AuthRawJwtService) {}

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
