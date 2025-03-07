import { IsOptional, IsString } from 'class-validator';

export class UpdateStoreDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  location?: string;

  @IsOptional()
  @IsString()
  phoneNumber?: string;
}
