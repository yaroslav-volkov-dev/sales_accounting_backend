import { createParamDecorator, ExecutionContext, ForbiddenException } from "@nestjs/common";

export const Session = createParamDecorator((property: string | undefined, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();

  const session = request.session;

  if (!session) {
    throw new ForbiddenException('Session not found');
  }

  return property ? session?.[property] : session;
});

