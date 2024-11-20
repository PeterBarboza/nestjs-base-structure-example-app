import { ProductModel } from '../../models/product';
import { IAuthenticatedUserData } from '../auth/auth.service.interface';
import { IGetProductsQueryDto } from './dtos/get-products.dto.interface';
import { ICreateSingleProductBodyDto } from './dtos/create-single-product.dto.interface';
import {
  IUpdateSingleProductBodyDto,
  IUpdateSingleProductParamsDto,
} from './dtos/update-single-product.dto.interface';
import { IGetProductByIdParamsDto } from './dtos/get-product-by-id.dto.interface';
import { IDeleteSingleProductParamsDto } from './dtos/delete-single-product.dto.interface';

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
