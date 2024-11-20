import { IsEmail, IsStrongPassword, MaxLength } from 'class-validator';

import { ISignUpDto } from '@/domain/modules/auth/dtos/sign-up.dto.interface';

export class SignUpDto implements ISignUpDto {
  @IsEmail()
  email: string;

  @IsStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minNumbers: 1,
    minUppercase: 1,
  })
  @MaxLength(255)
  password: string;
}
