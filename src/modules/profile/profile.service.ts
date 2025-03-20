import { Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { UpdateProfileDto } from "./dto/update-profile.dto";
import { SupabaseClient } from "@supabase/supabase-js";

@Injectable()
export class ProfileService {
  constructor(
    private readonly prisma: PrismaService,
    @Inject('SUPABASE_CLIENT') private readonly supabase: SupabaseClient,
  ) { }

  async updateProfile(accessToken: string, dto: UpdateProfileDto) {
    if (!accessToken) {
      throw new UnauthorizedException('Token not provided');
    }

    const { data, error } = await this.supabase.auth.getUser(accessToken);

    if (error) {
      throw new UnauthorizedException('Failed to get user');
    }

    const userId = data.user.id;

    const user = await this.prisma.profile.update({
      where: { id: userId },
      data: dto,
    });

    return user;
  }
} 