import { Module } from '@nestjs/common';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';
import { PrismaService } from '../../prisma/prisma.service';
import { SupabaseModule } from '../supabase/supabase.module';

@Module({
  controllers: [ProfileController],
  providers: [ProfileService, PrismaService],
  imports: [SupabaseModule]
})
export class ProfileModule { } 