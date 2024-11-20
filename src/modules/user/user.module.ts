import { Module } from '@nestjs/common';

import { UserRepository } from './user.repository';
import { DrizzleModule } from '../../lib/drizzle/drizzle.module';
import { UserRepositoryToken } from 'src/domain/modules/user/user.repository.interface';

@Module({
  imports: [DrizzleModule],
  providers: [
    {
      provide: UserRepositoryToken,
      useClass: UserRepository,
    },
  ],
  exports: [UserRepositoryToken],
})
export class UserModule {}
