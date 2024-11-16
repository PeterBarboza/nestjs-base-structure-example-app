import { IsString } from 'class-validator';

import { ICreateUserDto } from '../../../domain/dtos/user/create-user.dto.interface';

export class CreateUserDto implements ICreateUserDto {
  @IsString()
  email: string;

  @IsString()
  password: string;
}
