import { Module } from '@nestjs/common';

import { EnvironmentConfigModule } from './common/config/environment-config.module';
import { LoggerModule } from './lib/logger/logger.module';
import { DrizzleModule } from './lib/drizzle/drizzle.module';
import { ConfigModule } from '@nestjs/config';
import { validate } from './common/config/environment-config.service';

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
  ],
})
export class AppModule {}
