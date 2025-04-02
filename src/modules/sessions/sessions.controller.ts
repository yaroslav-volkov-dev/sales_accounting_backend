import { Controller, Delete, ParseUUIDPipe, Post, UseGuards } from "@nestjs/common";
import { MembershipGuard } from "src/common/guards/membership.guard";
import { AuthGuard } from "../auth/auth.guard";
import { SessionGuard } from "src/common/guards/session.guard";
import { Membership } from "src/common/decorators/membership.decorator";
import { WorkspaceIdParam } from "src/common/guards/membership.guard";
import { SessionsService } from "./sessions.service";
import { Session } from "src/common/decorators/session.decorator";

@Controller('sessions')
export class SessionsController {
  constructor(private readonly sessionsService: SessionsService) { }

  @UseGuards(AuthGuard, MembershipGuard)
  @WorkspaceIdParam('workspaceId')
  @Post('start/:workspaceId')
  async startWorkspaceSession(
    @Membership('id', ParseUUIDPipe) memberId: string,
  ) {
    return this.sessionsService.startWorkspaceSession(memberId);
  }

  @UseGuards(AuthGuard, SessionGuard)
  @Delete('close')
  async closeWorkspaceSession(
    @Session('id', ParseUUIDPipe) sessionId: string,
  ) {
    return this.sessionsService.closeWorkspaceSession(sessionId);
  }
}
