import { Inject, Injectable } from '@nestjs/common';

import { IProductsService } from '../../domain/modules/products/products.service.interface';
import { ProductsRepository } from './products.repository';
import {
  CreateSingleProductParams,
  DeleteSingleProductParams,
  GetProductByIdParams,
  GetProductsParams,
  IProductsRepository,
  UpdateSingleProductParams,
} from 'src/domain/modules/products/products.repository.interface';

@Injectable()
export class ProductsService implements IProductsService {
  constructor(
    @Inject(ProductsRepository)
    private productsRepository: IProductsRepository,
  ) {}

  async getProducts(params: GetProductsParams) {
    return await this.productsRepository.getProducts(params);
  }

  async getProductById(params: GetProductByIdParams) {
    return await this.productsRepository.getProductById(params);
  }

  async createSingleProduct(params: CreateSingleProductParams) {
    return await this.productsRepository.createSingleProduct(params);
  }

  async updateSingleProduct(params: UpdateSingleProductParams) {
    return await this.productsRepository.updateSingleProduct(params);
  }

  async deleteSingleProduct(params: DeleteSingleProductParams) {
    return await this.productsRepository.deleteSingleProduct(params);
  }
}
