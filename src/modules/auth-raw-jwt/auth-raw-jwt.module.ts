import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { AuthRawJwtService } from '@/modules/auth-raw-jwt/auth-raw-jwt.service';
import { AuthRawJwtController } from '@/modules/auth-raw-jwt/auth-raw-jwt.controller';
import { EnvironmentConfigModule } from '@/common/config/environment-config.module';
import { UserModule } from '@/modules/user/user.module';
import { AuthServiceToken } from '@/domain/modules/auth/auth.service.interface';

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
