import { Module } from '@nestjs/common';

import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { ProductsRepository } from './products.repository';
import { ProductsRepositoryToken } from '../../domain/modules/products/products.repository.interface';
import { DrizzleModule } from 'src/lib/drizzle/drizzle.module';
import { ProductsServiceToken } from 'src/domain/modules/products/products.service.interface';

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
