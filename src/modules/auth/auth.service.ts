import { Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { SupabaseClient } from "@supabase/supabase-js";
import { PrismaService } from "src/prisma/prisma.service";
import { Response } from "express";
import { TokenName, ACCESS_TOKEN_MAX_AGE, REFRESH_TOKEN_MAX_AGE } from "src/constants";
import { UsersService } from "../users/users.service";
import { toUserDto } from "src/common/mappers/toUserDto";
import { CreateUserDto } from "src/dto/user/create-user-dto";
import { LoginUserDto } from "src/dto/user/login-user.dto";

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    @Inject('SUPABASE_CLIENT') private readonly supabase: SupabaseClient,
    private readonly usersService: UsersService,
  ) { }
  async register(registerDto: CreateUserDto, res: Response) {
    const userData = await this.usersService.create(registerDto);

    if (!userData) {
      throw new UnauthorizedException('Registration failed');
    }

    const { user, refreshToken, accessToken } = userData;

    this.setRefreshTokenCookie(res, refreshToken);
    this.setAccessTokenCookie(res, accessToken);

    return toUserDto(user);
  }

  async login(dto: LoginUserDto, res: Response) {
    const userData = await this.usersService.findByLogin(dto);

    if (!userData) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const { user, refreshToken, accessToken } = userData;

    this.setRefreshTokenCookie(res, refreshToken);
    this.setAccessTokenCookie(res, accessToken);

    return toUserDto(user);
  }

  async getMe(accessToken: string) {
    const user = await this.usersService.findByToken(accessToken);

    if (!user) {
      throw new UnauthorizedException('Invalid token');
    }

    return toUserDto(user);
  }

  async refreshSession(token: string, res: Response) {
    const { data, error } = await this.supabase.auth.refreshSession({ refresh_token: token });

    if (error) {
      throw new UnauthorizedException('Failed to refresh token');
    }

    const refreshToken = data.session.refresh_token;
    const accessToken = data.session.access_token;

    const user = await this.usersService.findByToken(accessToken);

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    this.setRefreshTokenCookie(res, refreshToken);
    this.setAccessTokenCookie(res, accessToken);

    return toUserDto(user);
  }

  async logout(res: Response) {
    await this.usersService.closeUserSession();

    res.clearCookie(TokenName.REFRESH_TOKEN);
    res.clearCookie(TokenName.ACCESS_TOKEN);

    return { success: true };
  }

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
} 