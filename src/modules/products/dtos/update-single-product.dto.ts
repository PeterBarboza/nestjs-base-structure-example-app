import { IsNumberString, IsString, IsUUID } from 'class-validator';

import {
  IUpdateSingleProductBodyDto,
  IUpdateSingleProductParamsDto,
} from 'src/domain/modules/products/dtos/update-single-product.dto.interface';

export class UpdateSingleProductParamsDto
  implements IUpdateSingleProductParamsDto
{
  @IsUUID()
  id: string;
}

export class UpdateSingleProductBodyDto implements IUpdateSingleProductBodyDto {
  @IsString()
  name?: string;

  @IsNumberString()
  price?: string;
}
