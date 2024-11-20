import { IsNumberString, IsString } from 'class-validator';

import { ICreateSingleProductBodyDto } from '@/domain/modules/products/dtos/create-single-product.dto.interface';

export class CreateSingleProductBodyDto implements ICreateSingleProductBodyDto {
  @IsString()
  name: string;

  @IsNumberString()
  price: string;
}
