import { IsNotEmpty, IsUUID } from "class-validator";

export class SetActiveOrganizationDto {
  @IsNotEmpty()
  @IsUUID()
  organizationId: string;
}

