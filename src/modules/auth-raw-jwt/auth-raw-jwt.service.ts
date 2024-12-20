import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import bcrypt from 'bcryptjs';

import { SignUpDto } from '@/modules/auth-raw-jwt/dtos/sign-up.dto';
import { SignInDto } from '@/modules/auth-raw-jwt/dtos/sign-in.dto';
import { Exceptions } from '@/common/exceptions/exceptions';
import { IAuthService } from '@/domain/modules/auth/auth.service.interface';
import {
  IUserRepository,
  UserRepositoryToken,
} from '@/domain/modules/user/user.repository.interface';

@Injectable()
export class AuthRawJwtService implements IAuthService {
  constructor(
    @Inject(UserRepositoryToken)
    private userRepository: IUserRepository,
    @Inject(JwtService)
    private jwtService: JwtService,
  ) {}

  async signUp(data: SignUpDto) {
    const userAlreadyExists = await this.userRepository.findByEmail(data.email);

    if (userAlreadyExists) {
      Exceptions.BadRequest('Email already in use');
    }

    const hashedPassword = await this.encriptPassword(data.password);

    const newUser = await this.userRepository.createSingleUser({
      email: data.email,
      password: hashedPassword,
    });

    const accessToken = await this.jwtService.signAsync({ sub: newUser.id });
    const refreshToken = await this.jwtService.signAsync(
      { sub: newUser.id },
      { expiresIn: '7d' },
    );

    return {
      accessToken,
      refreshToken,
    };
  }

  async signIn(data: SignInDto) {
    const user = await this.userRepository.findByEmail(data.email);

    if (!user) {
      Exceptions.Unauthorized('Email or password incorrect');
    }

    const passwordMatch = await this.comparePasswords(
      data.password,
      user.password,
    );

    if (!passwordMatch) {
      Exceptions.Unauthorized('Email or password incorrect');
    }

    const accessToken = await this.jwtService.signAsync({ sub: user.id });
    const refreshToken = await this.jwtService.signAsync(
      { sub: user.id },
      { expiresIn: '7d' },
    );

    return {
      accessToken,
      refreshToken,
    };
  }

  private async encriptPassword(plainTextPassword: string) {
    return await bcrypt.hash(plainTextPassword, 10);
  }

  private async comparePasswords(
    plainTextPassword: string,
    hashedPassword: string,
  ) {
    return await bcrypt.compare(plainTextPassword, hashedPassword);
  }
}
