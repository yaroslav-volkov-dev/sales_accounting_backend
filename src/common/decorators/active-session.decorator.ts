import { createParamDecorator, ExecutionContext, ForbiddenException } from "@nestjs/common";

export const ActiveSession = createParamDecorator((property: string | undefined, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();

  const activeSession = request.activeSession;

  if (!activeSession) {
    throw new ForbiddenException('Active session not found');
  }

  return property ? activeSession?.[property] : activeSession;
});

