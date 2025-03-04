import { IsArray, IsBoolean, IsInt, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';

export class GetProductsQueryDto {
  @IsOptional()
  @IsArray()
  @Transform(({ value }) => value.split(',').map((id) => parseInt(id)), {
    toClassOnly: true,
  })
  @IsInt({ each: true })
  categoryIds?: number[];

  @IsOptional()
  @Transform(({ value }) => value === 'true')
  @IsBoolean()
  withoutCategory?: boolean;
}
