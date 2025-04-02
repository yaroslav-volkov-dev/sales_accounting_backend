import { Controller, Post, Body, Put, ParseUUIDPipe, UseGuards } from "@nestjs/common";
import { CreateWorkspaceDto } from "../../dto/workspace/create-workspace.dto";
import { OrganizationsService } from "./organizations.service";
import { AuthGuard } from "../../common/guards/auth.guard";
import { User } from "src/common/decorators/user.decorator";

@Controller('workspaces')
export class OrganizationsController {
  constructor(private readonly organizationService: OrganizationsService) { }

  @Post('create')
  @UseGuards(AuthGuard)
  async createOrganization(@Body() dto: CreateWorkspaceDto, @User('id', ParseUUIDPipe) userId: string) {
    return this.organizationService.createOrganization({ dto, ownerId: userId });
  }
}

