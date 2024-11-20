import { UserModel } from '@/domain/models/user';

export type CreateSingleUserParams = Pick<UserModel, 'email' | 'password'>;
export type CreateSingleUserResponse = Omit<UserModel, 'password'>;

export interface IUserRepository {
  findById(id: string): Promise<UserModel | null>;
  findByEmail(email: string): Promise<UserModel | null>;
  createSingleUser(
    dto: CreateSingleUserParams,
  ): Promise<CreateSingleUserResponse>;
}

export const UserRepositoryToken = Symbol('IUserRepository');
