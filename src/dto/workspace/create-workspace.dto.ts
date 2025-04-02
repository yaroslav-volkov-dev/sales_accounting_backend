import { IsNotEmpty, IsString, IsUUID } from "class-validator";

export class CreateWorkspaceDto {
  @IsString()
  @IsNotEmpty()
  organizationName: string;
}
