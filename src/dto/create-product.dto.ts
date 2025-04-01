import { IsInt, IsOptional, IsPositive, IsString, IsUUID } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateProductDto {
  @IsString()
  name: string;

  @Type(() => Number)
  @IsInt()
  price: number;

  @IsOptional()
  @IsUUID()
  categoryId?: string;
}
