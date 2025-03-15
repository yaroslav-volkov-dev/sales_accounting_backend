import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { SupabaseModule } from '../supabase/supabase.module';
import { PrismaService } from '../../prisma/prisma.service';
@Module({
  controllers: [UsersController],
  providers: [UsersService, PrismaService],
  imports: [SupabaseModule]
})
export class UsersModule { }
