import { Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { SupabaseClient } from "@supabase/supabase-js";
import { PrismaService } from "src/prisma/prisma.service";
import { RegisterDto } from "./dto/register.dto";
import { Response } from "express";
import { LoginDto } from "./dto/login.dto";
import { TokenName, ACCESS_TOKEN_MAX_AGE, REFRESH_TOKEN_MAX_AGE } from "src/constants";

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    @Inject('SUPABASE_CLIENT') private readonly supabase: SupabaseClient,
  ) { }

  private setRefreshTokenCookie(res: Response, refreshToken: string): void {
    res.cookie(TokenName.REFRESH_TOKEN, refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: REFRESH_TOKEN_MAX_AGE,
      path: '/',
    });
  }

  private setAccessTokenCookie(res: Response, accessToken: string): void {
    res.cookie(TokenName.ACCESS_TOKEN, accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: ACCESS_TOKEN_MAX_AGE,
      path: '/',
    });
  }

  async register(registerDto: RegisterDto, res: Response) {
    const { email, password } = registerDto;

    const userData = {
      email,
      firstName: registerDto.firstName,
      lastName: registerDto.lastName,
      phoneNumber: registerDto.phoneNumber,
    };

    const { data, error } = await this.supabase.auth.signUp({
      email,
      password,
      options: {
        data: { userData },
      },
    });

    if (error) {
      throw new UnauthorizedException(error.message);
    }

    const id = data.user?.id;

    if (!id) {
      throw new UnauthorizedException('User ID not found after registration');
    }

    const refreshToken = data.session.refresh_token;
    const accessToken = data.session.access_token;
    const user = await this.prisma.profile.create({ data: { id, ...userData } });

    this.setRefreshTokenCookie(res, refreshToken);
    this.setAccessTokenCookie(res, accessToken);

    return { user };
  }

  async login(dto: LoginDto, res: Response) {
    const { data, error } = await this.supabase.auth.signInWithPassword(dto);

    if (error) {
      throw new UnauthorizedException('Incorrect email or password');
    }

    const refreshToken = data.session.refresh_token;
    const accessToken = data.session.access_token;
    const user = await this.prisma.profile.findUnique({ where: { id: data.user.id } });

    this.setRefreshTokenCookie(res, refreshToken);
    this.setAccessTokenCookie(res, accessToken);

    return { user };
  }

  async getMe(accessToken: string) {
    const { data, error } = await this.supabase.auth.getUser(accessToken);

    if (error) {
      throw new UnauthorizedException('Failed to get user');
    }

    const user = await this.prisma.profile.findUnique({ where: { id: data.user.id } });

    return { user };
  }

  async refreshSession(token: string, res: Response) {
    const { data, error } = await this.supabase.auth.refreshSession({ refresh_token: token });

    if (error) {
      throw new UnauthorizedException('Failed to refresh token');
    }

    const user = await this.prisma.profile.findUnique({ where: { id: data.user.id } });

    const refreshToken = data.session.refresh_token;
    const accessToken = data.session.access_token;

    this.setRefreshTokenCookie(res, refreshToken);
    this.setAccessTokenCookie(res, accessToken);

    return { user };
  }

  async logout(res: Response) {
    res.clearCookie(TokenName.REFRESH_TOKEN);
    res.clearCookie(TokenName.ACCESS_TOKEN);

    await this.supabase.auth.signOut();

    return { success: true };
  }
} 