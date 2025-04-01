import { IsArray, IsBoolean, IsInt, IsOptional, IsUUID } from 'class-validator';
import { Transform } from 'class-transformer';

export class GetProductsQueryDto {
  @IsOptional()
  @IsArray()
  @Transform(({ value }) => value.split(',').map((id) => parseInt(id)), {
    toClassOnly: true,
  })
  @IsUUID(undefined, { each: true })
  categoryIds?: string[];

  @IsOptional()
  @Transform(({ value }) => value === 'true')
  @IsBoolean()
  withoutCategory?: boolean;
}
