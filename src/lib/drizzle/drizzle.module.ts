import { Module } from '@nestjs/common';

import { DrizzleAsyncProvider, drizzleProvider } from './drizzle.provider';
import { EnvironmentConfigModule } from '../../common/config/environment-config.module';

@Module({
  imports: [EnvironmentConfigModule],
  providers: [drizzleProvider],
  exports: [DrizzleAsyncProvider],
})
export class DrizzleModule {}
