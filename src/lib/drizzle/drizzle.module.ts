import { Module } from '@nestjs/common';

import {
  DrizzleProviderToken,
  drizzleProvider,
} from '@/lib/drizzle/drizzle.provider';
import { EnvironmentConfigModule } from '@/common/config/environment-config.module';

@Module({
  imports: [EnvironmentConfigModule],
  providers: [drizzleProvider],
  exports: [DrizzleProviderToken],
})
export class DrizzleModule {}
