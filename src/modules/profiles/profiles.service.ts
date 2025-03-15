import { Injectable } from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { SupabaseClient } from '@supabase/supabase-js';
import { Inject } from '@nestjs/common';

@Injectable()
export class ProfilesService {
  constructor(
    private readonly prisma: PrismaService,
    @Inject('SUPABASE_CLIENT') private readonly supabase: SupabaseClient,
  ) { }

  create(createProfileDto: CreateProfileDto) {
    return this.prisma.profile.create({
      data: createProfileDto,
    });
  }

  findAll() {
    return `This action returns all profiles`;
  }

  findOne(id: string) {
    return this.prisma.profile.findFirst({ where: { id } });
  }

  async update(id: string, updateProfileDto: UpdateProfileDto) {
    const { error } = await this.supabase.auth.updateUser({
      email: updateProfileDto.email,
      data: {
        username: updateProfileDto.username,
      }
    });

    if (error) {
      throw new Error(error.message);
    }

    return this.prisma.profile.update({
      where: { id },
      data: updateProfileDto,
    });
  }

  remove(id: number) {
    return `This action removes a #${id} profile`;
  }
}
