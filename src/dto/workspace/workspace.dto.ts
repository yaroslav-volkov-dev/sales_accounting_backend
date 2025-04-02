import { IsNotEmpty, IsString, IsUUID } from "class-validator";

export class WorkspaceDto {
  @IsUUID()
  id: string;

  @IsString()
  @IsNotEmpty()
  name: string;
}