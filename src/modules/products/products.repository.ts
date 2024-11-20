import { Inject, Injectable } from '@nestjs/common';
import { and, eq } from 'drizzle-orm';

import {
  DrizzleProviderToken,
  DrizzleDatabase,
} from '@/lib/drizzle/drizzle.provider';
import * as schemas from '@/lib/drizzle/schema';
import {
  IProductsRepository,
  GetProductsParams,
  GetProductByIdParams,
  CreateSingleProductParams,
  UpdateSingleProductParams,
  DeleteSingleProductParams,
} from '@/domain/modules/products/products.repository.interface';

@Injectable()
export class ProductsRepository implements IProductsRepository {
  constructor(
    @Inject(DrizzleProviderToken)
    private db: DrizzleDatabase,
  ) {}

  async getProducts({ params, userId }: GetProductsParams) {
    return await this.db.query.products.findMany({
      where: (entity, op) => {
        return op.eq(entity.ownerId, userId);
      },
      limit: params.limit,
      offset: params.skip,
    });
  }

  async getProductById({ params, userId }: GetProductByIdParams) {
    const result = await this.db.query.products.findFirst({
      where: (entity, op) => {
        return op.and(
          op.eq(entity.id, params.id),
          op.eq(entity.ownerId, userId),
        );
      },
    });

    return result;
  }

  async createSingleProduct({ params, userId }: CreateSingleProductParams) {
    const result = await this.db
      .insert(schemas.products)
      .values({
        name: params.name,
        price: params.price.toString(),
        ownerId: userId,
      })
      .returning({
        id: schemas.products.id,
        createdAt: schemas.products.createdAt,
        updatedAt: schemas.products.updatedAt,
        name: schemas.products.name,
        price: schemas.products.price,
        ownerId: schemas.products.ownerId,
      });

    return result[0];
  }

  async updateSingleProduct({ params, userId }: UpdateSingleProductParams) {
    const setData: UpdateSingleProductParams['params']['data'] = {};

    if (params.data.name) {
      setData.name = params.data.name;
    }
    if (params.data.price) {
      setData.price = params.data.price;
    }

    const result = await this.db
      .update(schemas.products)
      .set(setData)
      .where(
        and(
          eq(schemas.products.id, params.id),
          eq(schemas.products.ownerId, userId),
        ),
      )
      .returning({
        id: schemas.products.id,
        createdAt: schemas.products.createdAt,
        updatedAt: schemas.products.updatedAt,
        name: schemas.products.name,
        price: schemas.products.price,
        ownerId: schemas.products.ownerId,
      });

    return result[0];
  }

  async deleteSingleProduct({ params, userId }: DeleteSingleProductParams) {
    await this.db
      .delete(schemas.products)
      .where(
        and(
          eq(schemas.products.id, params.id),
          eq(schemas.products.ownerId, userId),
        ),
      );
  }
}
