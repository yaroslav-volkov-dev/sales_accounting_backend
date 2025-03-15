import { IsString } from 'class-validator';
import { IsOptional } from 'class-validator';

export class UpdateProfileDto {
  @IsString()
  username: string;

  @IsString()
  email: string;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsOptional()
  @IsString()
  phoneNumber?: string;
}
