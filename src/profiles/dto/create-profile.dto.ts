import { IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateProfileDto {
  @IsUUID()
  id: string;

  @IsString()
  username: string;

  @IsString()
  email: string;

  @IsOptional()
  @IsString()
  firstName?: string;

  @IsOptional()
  @IsString()
  lastName?: string;

  @IsOptional()
  @IsString()
  phoneNumber?: string;
}
