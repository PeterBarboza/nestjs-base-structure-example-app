import { Inject, Injectable } from '@nestjs/common';

import {
  DrizzleAsyncProvider,
  DrizzleDatabase,
} from '../../lib/drizzle/drizzle.provider';
import * as schemas from '../../lib/drizzle/schema';
import { CreateUserDto } from './dtos/createUser.dto';

@Injectable()
export class UserRepository {
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

  async createSingleUser(dto: CreateUserDto) {
    await this.db.insert(schemas.users).values({
      email: dto.email,
      password: dto.password,
    });

    return dto;
  }
}
