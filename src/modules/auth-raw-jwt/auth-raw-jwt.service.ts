import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import bcrypt from 'bcryptjs';

import { UserRepository } from '../user/user.repository';
import { SignUpDto } from './dtos/sign-up.dto';
import { SignInDto } from './dtos/sign-in.dto';
import { Exceptions } from '../../common/exceptions/exceptions';
import { EnvironmentConfigService } from '../../common/config/environment-config.service';

@Injectable()
export class AuthRawJwtService {
  constructor(
    @Inject(UserRepository)
    private userRepository: UserRepository,
    @Inject(EnvironmentConfigService)
    private envConfig: EnvironmentConfigService,
    @Inject(JwtService)
    private jwtService: JwtService,
  ) {}

  async signUp(dto: SignUpDto) {
    const userAlreadyExists = await this.userRepository.findByEmail(dto.email);

    if (userAlreadyExists) {
      Exceptions.BadRequest('Email already in use');
    }

    const hashedPassword = await this.encriptPassword(dto.password);

    const newUser = await this.userRepository.createSingleUser({
      email: dto.email,
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

  async signIn(dto: SignInDto) {
    const user = await this.userRepository.findByEmail(dto.email);

    if (!user) {
      Exceptions.Unauthorized('Email or password incorrect');
    }

    const passwordMatch = await this.comparePasswords(
      dto.password,
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
