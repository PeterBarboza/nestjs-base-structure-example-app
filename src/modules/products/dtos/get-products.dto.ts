import { IsNumber, Max, Min } from 'class-validator';

import { IGetProductsQueryDto } from 'src/domain/modules/products/dtos/get-products.dto.interface';

export class GetProductsQueryDto implements IGetProductsQueryDto {
  @IsNumber()
  @Min(0)
  @Max(200)
  limit: number = 20;

  @IsNumber()
  @Min(0)
  skip: number = 0;
}
