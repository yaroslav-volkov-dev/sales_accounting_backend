import { Controller, Post, Body, Put } from "@nestjs/common";
import { CreateOrganizationDto } from "./dto/create-organization.dto";
import { CurrentUser } from "src/decorators/current-user";
import { profile } from "@prisma/client";
import { OrganizationsService } from "./organizations.service";
import { UseGuards } from "@nestjs/common";
import { SetActiveOrganizationDto } from "./dto/set-active-organization.dto";
import { AuthGuard } from "../auth/auth.guard";

@Controller('workspaces')
export class OrganizationsController {
  constructor(private readonly organizationService: OrganizationsService) { }

  @Post('create')
  @UseGuards(AuthGuard)
  async createOrganization(@Body() dto: CreateOrganizationDto, @CurrentUser() user: profile) {
    return this.organizationService.createOrganization({ dto, ownerId: user.id });
  }

  @Put('set-active')
  @UseGuards(AuthGuard)
  async setActiveOrganization(@Body() dto: SetActiveOrganizationDto, @CurrentUser() user: profile) {
    return this.organizationService.setActiveOrganization(dto.organizationId, user.id);
  }
}

