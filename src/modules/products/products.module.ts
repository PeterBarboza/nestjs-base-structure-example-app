import { Module } from '@nestjs/common';

import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { ProductsRepository } from './products.repository';
import { DrizzleModule } from 'src/lib/drizzle/drizzle.module';

@Module({
  imports: [DrizzleModule],
  providers: [ProductsRepository, ProductsService],
  controllers: [ProductsController],
})
export class ProductsModule {}
