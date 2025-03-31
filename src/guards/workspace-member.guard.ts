import { ForbiddenException, Injectable, SetMetadata } from "@nestjs/common";
import { CanActivate } from "@nestjs/common";
import { ExecutionContext } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { CurrentUserType } from "src/decorators/current-user";

const WORKSPACE_ID_PARAM = 'workspaceIdParam';
const FALLBACK_WORKSPACE_ID_PARAM = 'workspaceId';

export const WorkspaceMember = (workspaceIdParam: string = FALLBACK_WORKSPACE_ID_PARAM) => SetMetadata(WORKSPACE_ID_PARAM, workspaceIdParam);

@Injectable()
export class WorkspaceMemberGuard implements CanActivate {
  constructor(private reflector: Reflector) { }

  canActivate(context: ExecutionContext): boolean {
    const workspaceIdParam = this.reflector.get<string>(
      WORKSPACE_ID_PARAM,
      context.getHandler(),
    ) || FALLBACK_WORKSPACE_ID_PARAM;

    const request = context.switchToHttp().getRequest();
    const user: CurrentUserType = request.user;

    if (!user) {
      throw new ForbiddenException('User not authenticated');
    }

    const workspaceId = request.params[workspaceIdParam];

    if (!workspaceId) {
      throw new ForbiddenException('Workspace ID is required');
    }

    const membership = user.memberOrganizations.find((org) => org.organizationId === workspaceId);

    if (!membership) {
      throw new ForbiddenException('User is not a member of this workspace');
    }

    request.membership = membership;

    return true;
  }
}