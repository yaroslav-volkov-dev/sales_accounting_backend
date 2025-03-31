import { Controller, Post, Body, Put, ParseUUIDPipe, UseGuards } from "@nestjs/common";
import { CreateOrganizationDto } from "./dto/create-organization.dto";
import { OrganizationsService } from "./organizations.service";
import { AuthGuard } from "../auth/auth.guard";
import { User } from "src/common/decorators/user.decorator";

@Controller('workspaces')
export class OrganizationsController {
  constructor(private readonly organizationService: OrganizationsService) { }

  @Post('create')
  @UseGuards(AuthGuard)
  async createOrganization(@Body() dto: CreateOrganizationDto, @User('id', ParseUUIDPipe) userId: string) {
    return this.organizationService.createOrganization({ dto, ownerId: userId });
  }
}

