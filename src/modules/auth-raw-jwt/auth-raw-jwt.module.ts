import { Module } from '@nestjs/common';

import { AuthRawJwtService } from './auth-raw-jwt.service';
import { AuthRawJwtController } from './auth-raw-jwt.controller';
import { EnvironmentConfigModule } from '../../common/config/environment-config.module';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthServiceToken } from 'src/domain/modules/auth/auth.service.interface';

@Module({
  imports: [
    EnvironmentConfigModule,
    UserModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: '15m',
      },
    }),
  ],
  providers: [
    {
      provide: AuthServiceToken,
      useClass: AuthRawJwtService,
    },
  ],
  controllers: [AuthRawJwtController],
})
export class AuthModule {}
