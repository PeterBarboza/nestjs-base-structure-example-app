import { ProductModel } from '@/domain/models/product';
import { IAuthenticatedUserData } from '@/domain/modules/auth/auth.service.interface';
import { IGetProductsQueryDto } from '@/domain/modules/products/dtos/get-products.dto.interface';
import { ICreateSingleProductBodyDto } from '@/domain/modules/products/dtos/create-single-product.dto.interface';
import {
  IUpdateSingleProductBodyDto,
  IUpdateSingleProductParamsDto,
} from '@/domain/modules/products/dtos/update-single-product.dto.interface';
import { IGetProductByIdParamsDto } from '@/domain/modules/products/dtos/get-product-by-id.dto.interface';
import { IDeleteSingleProductParamsDto } from '@/domain/modules/products/dtos/delete-single-product.dto.interface';

export interface IProductsController {
  getProducts(
    user: IAuthenticatedUserData,
    query: IGetProductsQueryDto,
  ): Promise<ProductModel[]>;
  getProductById(
    user: IAuthenticatedUserData,
    params: IGetProductByIdParamsDto,
  ): Promise<ProductModel>;
  createSingleProduct(
    user: IAuthenticatedUserData,
    body: ICreateSingleProductBodyDto,
  ): Promise<ProductModel>;
  updateSingleProduct(
    user: IAuthenticatedUserData,
    params: IUpdateSingleProductParamsDto,
    body: IUpdateSingleProductBodyDto,
  ): Promise<ProductModel>;
  deleteSingleProduct(
    user: IAuthenticatedUserData,
    params: IDeleteSingleProductParamsDto,
  ): Promise<void>;
}
