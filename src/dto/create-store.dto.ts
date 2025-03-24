import { IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateStoreDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  location: string;

  @IsOptional()
  @IsString()
  phoneNumber: string;

  @IsString()
  @IsUUID()
  organizationId: string;
}
