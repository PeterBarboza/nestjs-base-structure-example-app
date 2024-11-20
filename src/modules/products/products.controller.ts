import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';

import { IProductsController } from '@/domain/modules/products/products.controller.interface';
import { ProductModel } from '@/domain/models/product';
import { IAuthenticatedUserData } from '@/domain/modules/auth/auth.service.interface';
import { AuthenticatedUser } from '@/modules/auth-raw-jwt/auth-raw-jwt.decorator';
import { AuthGuard } from '@/modules/auth-raw-jwt/auth-raw-jwt.guard';
import { GetProductsQueryDto } from '@/modules/products/dtos/get-products.dto';
import { CreateSingleProductBodyDto } from '@/modules/products/dtos/create-single-product.dto';
import {
  UpdateSingleProductBodyDto,
  UpdateSingleProductParamsDto,
} from '@/modules/products/dtos/update-single-product.dto';
import { GetProductByIdParamsDto } from '@/modules/products/dtos/get-product-by-id.dto';
import { DeleteSingleProductParamsDto } from '@/modules/products/dtos/delete-single-product.dto';
import {
  IProductsService,
  ProductsServiceToken,
} from 'src/domain/modules/products/products.service.interface';
import { Exceptions } from '@/common/exceptions/exceptions';

@Controller('products')
@UseGuards(AuthGuard)
export class ProductsController implements IProductsController {
  constructor(
    @Inject(ProductsServiceToken)
    private productsService: IProductsService,
  ) {}

  @Get()
  async getProducts(
    @AuthenticatedUser()
    user: IAuthenticatedUserData,
    @Query()
    query: GetProductsQueryDto,
  ): Promise<ProductModel[]> {
    return await this.productsService.getProducts({
      params: {
        limit: query.limit,
        skip: query.skip,
      },
      userId: user.sub,
    });
  }

  @Get('/:id')
  async getProductById(
    @AuthenticatedUser()
    user: IAuthenticatedUserData,
    @Param()
    params: GetProductByIdParamsDto,
  ): Promise<ProductModel> {
    return await this.productsService.getProductById({
      params: {
        id: params.id,
      },
      userId: user.sub,
    });
  }

  @Post()
  async createSingleProduct(
    @AuthenticatedUser()
    user: IAuthenticatedUserData,
    @Body()
    body: CreateSingleProductBodyDto,
  ): Promise<ProductModel> {
    return await this.productsService.createSingleProduct({
      params: {
        name: body.name,
        price: body.price,
      },
      userId: user.sub,
    });
  }

  @Patch('/:id')
  async updateSingleProduct(
    @AuthenticatedUser()
    user: IAuthenticatedUserData,
    @Param()
    params: UpdateSingleProductParamsDto,
    @Body()
    body: UpdateSingleProductBodyDto,
  ): Promise<ProductModel> {
    if (!body.name && !body.price) {
      Exceptions.BadRequest('At least one property need to be defined');
    }

    return await this.productsService.updateSingleProduct({
      params: {
        data: {
          name: body.name,
          price: body.price,
        },
        id: params.id,
      },
      userId: user.sub,
    });
  }

  @Delete('/:id')
  async deleteSingleProduct(
    @AuthenticatedUser()
    user: IAuthenticatedUserData,
    @Param()
    params: DeleteSingleProductParamsDto,
  ): Promise<void> {
    return await this.productsService.deleteSingleProduct({
      params: {
        id: params.id,
      },
      userId: user.sub,
    });
  }
}
