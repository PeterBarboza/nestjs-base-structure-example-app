import { ISignUpDto } from './dtos/sign-up.dto.interface';
import { ISignInDto } from './dtos/sign-in.dto.interface';

export interface AuthenticatedResponse {
  accessToken: string;
  refreshToken: string;
}

export interface IAuthenticatedUserData {
  sub: string;
}

export interface IAuthService {
  signIn(data: ISignInDto): Promise<AuthenticatedResponse>;
  signUp(data: ISignUpDto): Promise<AuthenticatedResponse>;
}

export const AuthServiceToken = Symbol('IAuthService');
