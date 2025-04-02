import { Controller, Delete, ParseUUIDPipe, Post, UseGuards } from "@nestjs/common";
import { MembershipGuard } from "src/common/guards/membership.guard";
import { AuthGuard } from "../../common/guards/auth.guard";
import { ActiveSessionGuard } from "src/common/guards/session.guard";
import { Membership } from "src/common/decorators/membership.decorator";
import { WorkspaceIdParam } from "src/common/guards/membership.guard";
import { SessionsService } from "./sessions.service";
import { ActiveSession } from "src/common/decorators/active-session.decorator";

@Controller('sessions')
export class SessionsController {
  constructor(private readonly sessionsService: SessionsService) { }

  @UseGuards(AuthGuard, MembershipGuard)
  @WorkspaceIdParam('workspaceId')
  @Post('start/:workspaceId')
  async startWorkspaceSession(
    @Membership('id', ParseUUIDPipe) membershipId: string,
  ) {
    return this.sessionsService.startWorkspaceSession(membershipId);
  }

  @UseGuards(AuthGuard, ActiveSessionGuard)
  @Delete('close')
  async closeWorkspaceSession(
    @ActiveSession('id') sessionId: string,
  ) {
    return this.sessionsService.closeWorkspaceSession(sessionId);
  }
}
