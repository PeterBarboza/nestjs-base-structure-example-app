import { IsUUID } from 'class-validator';

import { IGetProductByIdParamsDto } from '@/domain/modules/products/dtos/get-product-by-id.dto.interface';

export class GetProductByIdParamsDto implements IGetProductByIdParamsDto {
  @IsUUID()
  id: string;
}
