import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { EnvironmentConfigModule } from '@/common/config/environment-config.module';
import { LoggerModule } from '@/lib/logger/logger.module';
import { DrizzleModule } from '@/lib/drizzle/drizzle.module';
import { validate } from '@/common/config/environment-config.service';
import { AuthModule } from '@/modules/auth-raw-jwt/auth-raw-jwt.module';
import { ProductsModule } from '@/modules/products/products.module';

const IS_PRODUCTION = process.env.NODE_ENV === 'production';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate: validate,
      ignoreEnvFile: IS_PRODUCTION,
      envFilePath: '.env',
    }),
    EnvironmentConfigModule,
    LoggerModule,
    DrizzleModule,
    AuthModule,
    ProductsModule,
  ],
})
export class AppModule {}
