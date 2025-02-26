import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { RegisterUserDto } from '../../dto/register-user.dto';
import { LoginUserDto } from '../../dto/login-user.dto';

@Injectable()
export class AuthService {
  constructor(
    @Inject('SUPABASE_CLIENT') private readonly supabase: SupabaseClient,
  ) {}

  async register(dto: RegisterUserDto) {
    const { email, password, username } = dto;
    const { data, error } = await this.supabase.auth.signUp({
      email,
      password,
      options: {
        data: { username },
      },
    });

    if (error) {
      throw new UnauthorizedException(error.message);
    }

    return data.user;
  }

  async login(dto: LoginUserDto) {
    const { data, error } = await this.supabase.auth.signInWithPassword(dto);

    if (error) {
      throw new UnauthorizedException('Incorrect email or password');
    }

    return data.session;
  }

  async getMe(accessToken: string) {
    const { data, error } = await this.supabase.auth.getUser(accessToken);

    if (error || !data.user) {
      throw new UnauthorizedException('User not found');
    }

    return data.user;
  }
}
