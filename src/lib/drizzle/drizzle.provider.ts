import { Provider } from '@nestjs/common';
import { drizzle } from 'drizzle-orm/node-postgres';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';

import * as schema from './schema';
import { EnvironmentConfigService } from '../../common/config/environment-config.service';

export type DrizzleDatabase = NodePgDatabase<typeof schema>;

export const DrizzleAsyncProvider = 'DrizzleAsyncProvider';

export const drizzleProvider: Provider = {
  provide: DrizzleAsyncProvider,
  inject: [EnvironmentConfigService],

  useFactory: async (
    environmentVariablesConfigService: EnvironmentConfigService,
  ): Promise<DrizzleDatabase> => {
    const connectionString = environmentVariablesConfigService.getDbUrl();

    const pool = new Pool({
      connectionString,
    });

    return drizzle(pool, { schema });
  },
};
