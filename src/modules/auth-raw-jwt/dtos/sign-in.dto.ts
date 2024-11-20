import { IsString } from 'class-validator';

import { ISignInDto } from '@/domain/modules/auth/dtos/sign-in.dto.interface';

export class SignInDto implements ISignInDto {
  @IsString()
  email: string;

  @IsString()
  password: string;
}
