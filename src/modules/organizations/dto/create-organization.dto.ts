import { IsNotEmpty, IsString, IsUUID } from "class-validator";
export class CreateOrganizationDto {
  @IsString()
  @IsNotEmpty()
  organizationName: string;
}
