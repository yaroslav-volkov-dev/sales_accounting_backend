import { CanActivate, ExecutionContext, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { TokenName } from 'src/constants';
import { UsersService } from 'src/modules/users/users.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly usersService: UsersService,
  ) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const accessToken = request.cookies[TokenName.ACCESS_TOKEN];

    const userData = await this.usersService.findByToken(accessToken);

    if (!userData) {
      throw new UnauthorizedException('User not found');
    }

    const { memberOrganizations, ...user } = userData;
    const activeMembership = memberOrganizations.find(({ session }) => !!session);
    const activeSession = activeMembership ? {
      id: activeMembership?.session?.id,
      workspaceId: activeMembership?.organization?.id,
      memberId: activeMembership?.id,
    } : null;

    request.user = user;
    request.memberships = memberOrganizations;
    request.activeSession = activeSession;

    return true;
  }
} 