import { IsUUID } from 'class-validator';

import { IDeleteSingleProductParamsDto } from 'src/domain/modules/products/dtos/delete-single-product.dto.interface';

export class DeleteSingleProductParamsDto
  implements IDeleteSingleProductParamsDto
{
  @IsUUID()
  id: string;
}