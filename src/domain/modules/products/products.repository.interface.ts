import { ProductModel } from '../../models/product';

interface BaseParams<Options extends object> {
  userId: string;
  params: Options;
}

export type GetProductsParams = BaseParams<{
  limit: number;
  skip: number;
}>;
export type GetProductByIdParams = BaseParams<{
  id: string;
}>;
export type CreateSingleProductParams = BaseParams<{
  name: string;
  price: string;
}>;
export type UpdateSingleProductParams = BaseParams<{
  id: string;
  data: {
    name?: string;
    price?: string;
  };
}>;
export type DeleteSingleProductParams = BaseParams<{
  id: string;
}>;

export interface IProductsRepository {
  getProducts(params: GetProductsParams): Promise<ProductModel[]>;
  getProductById(params: GetProductByIdParams): Promise<ProductModel>;
  createSingleProduct(params: CreateSingleProductParams): Promise<ProductModel>;
  updateSingleProduct(params: UpdateSingleProductParams): Promise<ProductModel>;
  deleteSingleProduct(params: DeleteSingleProductParams): Promise<void>;
}

export const ProductsRepositoryToken = Symbol('IProductsRepository');
