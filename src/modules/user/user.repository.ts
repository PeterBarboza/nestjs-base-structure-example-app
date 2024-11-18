import { Inject, Injectable } from '@nestjs/common';

import {
  DrizzleAsyncProvider,
  DrizzleDatabase,
} from '../../lib/drizzle/drizzle.provider';
import * as schemas from '../../lib/drizzle/schema';
import {
  CreateSingleUserParams,
  CreateSingleUserResponse,
  IUserRepository,
} from '../../domain/modules/user/user.repository.interface';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(
    @Inject(DrizzleAsyncProvider)
    private db: DrizzleDatabase,
  ) {}

  async findById(id: string) {
    return await this.db.query.users.findFirst({
      where: (entity, op) => op.eq(entity.id, id),
    });
  }

  async findByEmail(email: string) {
    return await this.db.query.users.findFirst({
      where: (entity, op) => op.eq(entity.email, email),
    });
  }

  async createSingleUser(
    dto: CreateSingleUserParams,
  ): Promise<CreateSingleUserResponse> {
    const result = await this.db
      .insert(schemas.users)
      .values({
        email: dto.email,
        password: dto.password,
      })
      .returning({
        id: schemas.users.id,
        createdAt: schemas.users.createdAt,
        updatedAt: schemas.users.updatedAt,
        email: schemas.users.email,
      });

    return result[0];
  }
}
