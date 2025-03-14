import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { SupabaseModule } from '../supabase/supabase.module';
import { ProfilesModule } from '../../profiles/profiles.module';

@Module({
  imports: [SupabaseModule, ProfilesModule],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
