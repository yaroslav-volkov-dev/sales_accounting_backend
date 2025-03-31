import { Controller, Post, Body, Put } from "@nestjs/common";
import { CreateOrganizationDto } from "./dto/create-organization.dto";
import { CurrentUser, CurrentUserType } from "src/decorators/current-user";
import { OrganizationsService } from "./organizations.service";
import { UseGuards } from "@nestjs/common";
import { AuthGuard } from "../auth/auth.guard";

@Controller('workspaces')
export class OrganizationsController {
  constructor(private readonly organizationService: OrganizationsService) { }

  @Post('create')
  @UseGuards(AuthGuard)
  async createOrganization(@Body() dto: CreateOrganizationDto, @CurrentUser() user: CurrentUserType) {
    return this.organizationService.createOrganization({ dto, ownerId: user.id });
  }
}

