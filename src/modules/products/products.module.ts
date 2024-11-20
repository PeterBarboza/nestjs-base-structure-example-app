import { Module } from '@nestjs/common';

import { ProductsService } from '@/modules/products/products.service';
import { ProductsController } from '@/modules/products/products.controller';
import { ProductsRepository } from '@/modules/products/products.repository';
import { ProductsRepositoryToken } from '@/domain/modules/products/products.repository.interface';
import { DrizzleModule } from '@/lib/drizzle/drizzle.module';
import { ProductsServiceToken } from '@/domain/modules/products/products.service.interface';

@Module({
  imports: [DrizzleModule],
  providers: [
    {
      provide: ProductsRepositoryToken,
      useClass: ProductsRepository,
    },
    {
      provide: ProductsServiceToken,
      useClass: ProductsService,
    },
  ],
  controllers: [ProductsController],
})
export class ProductsModule {}
