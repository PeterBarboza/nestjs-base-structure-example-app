import { IsNumberString, IsString, IsUUID, IsOptional } from 'class-validator';

import {
  IUpdateSingleProductBodyDto,
  IUpdateSingleProductParamsDto,
} from '@/domain/modules/products/dtos/update-single-product.dto.interface';

export class UpdateSingleProductParamsDto
  implements IUpdateSingleProductParamsDto
{
  @IsUUID()
  id: string;
}

export class UpdateSingleProductBodyDto implements IUpdateSingleProductBodyDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsNumberString()
  price?: string;
}
