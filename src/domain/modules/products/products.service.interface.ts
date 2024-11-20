import { ProductModel } from '../../models/product';
import {
  GetProductsParams,
  GetProductByIdParams,
  CreateSingleProductParams,
  UpdateSingleProductParams,
  DeleteSingleProductParams,
} from './products.repository.interface';

export interface IProductsService {
  getProducts(params: GetProductsParams): Promise<ProductModel[]>;
  getProductById(params: GetProductByIdParams): Promise<ProductModel>;
  createSingleProduct(params: CreateSingleProductParams): Promise<ProductModel>;
  updateSingleProduct(params: UpdateSingleProductParams): Promise<ProductModel>;
  deleteSingleProduct(params: DeleteSingleProductParams): Promise<void>;
}
