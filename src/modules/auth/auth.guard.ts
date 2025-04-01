import { CanActivate, ExecutionContext, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { TokenName } from 'src/constants';
import { AuthService } from 'src/modules/auth/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly authService: AuthService,
  ) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const accessToken = request.cookies[TokenName.ACCESS_TOKEN];

    const userData = await this.authService.getMe(accessToken);

    if (!userData) {
      throw new UnauthorizedException('User not found');
    }

    const { session, user, workspaces } = userData;

    request.user = user;
    request.session = session;
    request.workspaces = workspaces;

    return true;
  }
} 