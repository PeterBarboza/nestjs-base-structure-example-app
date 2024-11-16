import { IsString } from 'class-validator';

import { ISignInDto } from '../../../domain/dtos/auth/sign-in.dto.interface';

export class SignInDto implements ISignInDto {
  @IsString()
  email: string;

  @IsString()
  password: string;
}
