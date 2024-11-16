import { Module } from '@nestjs/common';

import { UserRepository } from './user.repository';
import { DrizzleModule } from '../../lib/drizzle/drizzle.module';

@Module({
  imports: [DrizzleModule],
  providers: [UserRepository],
  exports: [UserRepository],
})
export class UserModule {}
