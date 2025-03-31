import { createParamDecorator, ExecutionContext, UnauthorizedException } from '@nestjs/common';

export const User = createParamDecorator(
  (property: string | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user;

    if (!user) {
      throw new UnauthorizedException('Missing user in request');
    }

    return property ? user[property] : user;
  },
);