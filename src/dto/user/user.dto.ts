import { Type } from "class-transformer";
import { IsArray, IsBoolean, IsEmail, IsNotEmpty, IsString, IsUUID, ValidateNested } from "class-validator";
import { WorkspaceDto } from "../workspace/workspace.dto";

export class UserDto {
  @IsUUID()
  id: string;

  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => WorkspaceDto)
  workspaces: WorkspaceDto[];

  @IsBoolean()
  isSessionActive: boolean;
}