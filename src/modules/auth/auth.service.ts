import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { RegisterUserDto } from '../../dto/register-user.dto';
import { LoginUserDto } from '../../dto/login-user.dto';
import { Response } from 'express';

@Injectable()
export class AuthService {
  constructor(
    @Inject('SUPABASE_CLIENT') private readonly supabase: SupabaseClient,
  ) {}

  private setRefreshTokenCookie(res: Response, refreshToken: string) {
    const tokenMaxAge = 60 * 60 * 24 * 7 * 1000;
    res.cookie('refresh_token', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: tokenMaxAge,
      path: '/',
    });
  }

  async register(dto: RegisterUserDto, res: Response) {
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

    this.setRefreshTokenCookie(res, data.session.refresh_token);

    return data.user;
  }

  async login(dto: LoginUserDto, res: Response) {
    const { data, error } = await this.supabase.auth.signInWithPassword(dto);

    if (error) {
      throw new UnauthorizedException('Incorrect email or password');
    }

    this.setRefreshTokenCookie(res, data.session.refresh_token);

    return data.session;
  }

  async getMe(accessToken: string) {
    const { data, error } = await this.supabase.auth.getUser(accessToken);

    if (error || !data.user) {
      throw new UnauthorizedException('User not found');
    }

    return data.user;
  }

  async refreshToken(refreshToken: string) {
    const { data, error } = await this.supabase.auth.refreshSession({
      refresh_token: refreshToken,
    });

    if (error) {
      throw new UnauthorizedException('Failed to refresh token');
    }

    return data;
  }

  async logout(res: Response) {
    res.clearCookie('refresh_token');

    await this.supabase.auth.signOut();

    return { success: true };
  }
}
