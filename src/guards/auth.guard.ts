import { CanActivate, ExecutionContext, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { PrismaService } from 'src/prisma/prisma.service';
import { TokenName } from 'src/constants';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    @Inject('SUPABASE_CLIENT') private readonly supabase: SupabaseClient,
    private readonly prisma: PrismaService,
  ) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const accessToken = request.cookies[TokenName.ACCESS_TOKEN];

    if (!accessToken) {
      throw new UnauthorizedException('Token not provided');
    }

    const { data, error } = await this.supabase.auth.getUser(accessToken);

    if (error) {
      throw new UnauthorizedException('Invalid token');
    }

    const userId = data.user.id;

    const user = await this.prisma.profile.findUnique({
      where: { id: userId },
      // include: {
      //   ownedOrganizations: true,
      //   memberOrganizations: {
      //     include: {
      //       organization: true,
      //       roles: {
      //         include: {
      //           role: {
      //             include: {
      //               permissions: {
      //                 include: {
      //                   permission: true
      //                 }
      //               }
      //             }
      //           }
      //         }
      //       }
      //     }
      //   }
      // }
    });

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    request.user = user;
    return true;
  }
} 