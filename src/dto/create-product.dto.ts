import { IsInt, IsOptional, IsPositive, IsString } from 'class-validator';

export class CreateProductDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsInt()
  @IsPositive()
  categoryId?: number;
}
