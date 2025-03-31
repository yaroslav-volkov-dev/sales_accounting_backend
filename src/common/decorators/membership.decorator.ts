import { createParamDecorator, ExecutionContext, UnauthorizedException } from "@nestjs/common";

export const Membership = createParamDecorator((property: string | undefined, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();

  const membership = request.membership;

  if (!membership) {
    throw new UnauthorizedException('Missing membership in request');
  }

  return property ? membership[property] : membership;
});

