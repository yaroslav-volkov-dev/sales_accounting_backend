import { createParamDecorator, ExecutionContext, UnauthorizedException, UnprocessableEntityException } from '@nestjs/common';
import { Type } from 'class-transformer';
import { IsUUID, IsEmail, IsString, IsArray, ValidateNested } from 'class-validator';
import { z } from 'zod';

export const CurrentUserSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  firstName: z.string(),
  lastName: z.string(),
  phoneNumber: z.string().nullable().optional(),
  memberOrganizations: z.array(z.object({
    id: z.string().uuid(),
    profileId: z.string().uuid(),
    organizationId: z.string().uuid(),
    createdAt: z.date(),
    updatedAt: z.date(),
  })),
  session: z.object({
    id: z.string().uuid(),
  }).nullable(),
});


export type CurrentUserType = z.infer<typeof CurrentUserSchema>;

export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user;

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    const result = CurrentUserSchema.safeParse(user);

    if (result.success) {
      return result.data;
    } else {
      const formattedErrors = result.error.errors.map(err =>
        `${err.path.join('.')}: ${err.message}`
      ).join(', ');

      throw new UnprocessableEntityException(`User validation failed: ${formattedErrors}`);
    }
  },
);
