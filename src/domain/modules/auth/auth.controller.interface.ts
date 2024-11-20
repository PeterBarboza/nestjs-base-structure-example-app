import { ISignInDto } from '@/domain/modules/auth/dtos/sign-in.dto.interface';
import { ISignUpDto } from '@/domain/modules/auth/dtos/sign-up.dto.interface';

export interface AuthenticatedResponse {
  accessToken: string;
  refreshToken: string;
}

export interface IAuthController {
  signIn(body: ISignInDto): Promise<AuthenticatedResponse>;
  signUp(body: ISignUpDto): Promise<AuthenticatedResponse>;
}
