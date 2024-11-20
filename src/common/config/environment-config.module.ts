import { Module } from '@nestjs/common';

import { EnvironmentConfigService } from '@/common/config/environment-config.service';

@Module({
  providers: [EnvironmentConfigService],
  exports: [EnvironmentConfigService],
})
export class EnvironmentConfigModule {}
