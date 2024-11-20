import { Module } from '@nestjs/common';

import { DrizzleProviderToken, drizzleProvider } from './drizzle.provider';
import { EnvironmentConfigModule } from '../../common/config/environment-config.module';

@Module({
  imports: [EnvironmentConfigModule],
  providers: [drizzleProvider],
  exports: [DrizzleProviderToken],
})
export class DrizzleModule {}
