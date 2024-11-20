import { Inject, Injectable } from '@nestjs/common';

import { IProductsService } from '@/domain/modules/products/products.service.interface';
import {
  CreateSingleProductParams,
  DeleteSingleProductParams,
  GetProductByIdParams,
  GetProductsParams,
  IProductsRepository,
  ProductsRepositoryToken,
  UpdateSingleProductParams,
} from '@/domain/modules/products/products.repository.interface';
import { Exceptions } from '@/common/exceptions/exceptions';

@Injectable()
export class ProductsService implements IProductsService {
  constructor(
    @Inject(ProductsRepositoryToken)
    private productsRepository: IProductsRepository,
  ) {}

  async getProducts(params: GetProductsParams) {
    return await this.productsRepository.getProducts(params);
  }

  async getProductById(params: GetProductByIdParams) {
    const product = await this.productsRepository.getProductById(params);

    if (!product) Exceptions.NotFound('Product not found');

    return product;
  }

  async createSingleProduct(params: CreateSingleProductParams) {
    return await this.productsRepository.createSingleProduct(params);
  }

  async updateSingleProduct(params: UpdateSingleProductParams) {
    const product = await this.productsRepository.getProductById({
      params: { id: params.params.id },
      userId: params.userId,
    });

    if (!product) Exceptions.NotFound('Product not found');

    return await this.productsRepository.updateSingleProduct(params);
  }

  async deleteSingleProduct(params: DeleteSingleProductParams) {
    const product = await this.productsRepository.getProductById({
      params: { id: params.params.id },
      userId: params.userId,
    });

    if (!product) Exceptions.NotFound('Product not found');

    return await this.productsRepository.deleteSingleProduct(params);
  }
}
