import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from "@nestjs/common";

@Injectable()
export class ActiveSessionGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const activeSession = request.activeSession;

    if (!activeSession) {
      throw new ForbiddenException('Active session not found');
    }

    return true;
  }
}