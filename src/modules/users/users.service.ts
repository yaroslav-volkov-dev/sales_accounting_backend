import { Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { SupabaseClient } from "@supabase/supabase-js";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateUserDto } from "./dto/create-user-dto";
import { Response } from "express";
import { LoginUserDto } from "./dto/login-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
@Injectable()
export class UsersService {
  constructor(
    private readonly prisma: PrismaService,
    @Inject('SUPABASE_CLIENT') private readonly supabase: SupabaseClient,
  ) { }

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

  async register(createUserDto: CreateUserDto, res: Response) {
    const { email, password } = createUserDto;

    const userData = {
      email,
      firstName: createUserDto.firstName,
      lastName: createUserDto.lastName,
      phoneNumber: createUserDto.phoneNumber,
    }

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

    return { accessToken, user };
  }

  async login(dto: LoginUserDto, res: Response) {
    const { data, error } = await this.supabase.auth.signInWithPassword(dto);

    if (error) {
      throw new UnauthorizedException('Incorrect email or password');
    }

    const refreshToken = data.session.refresh_token;
    const accessToken = data.session.access_token;
    const user = await this.prisma.profile.findUnique({ where: { id: data.user.id } });

    this.setRefreshTokenCookie(res, refreshToken);

    return { accessToken, user };
  }

  async getMe(accessToken: string) {
    if (!accessToken) {
      throw new UnauthorizedException('Token not provided');
    }

    const { data, error } = await this.supabase.auth.getUser(accessToken);

    if (error) {
      throw new UnauthorizedException('Failed to get user');
    }

    const user = await this.prisma.profile.findUnique({ where: { id: data.user.id } });

    return { user };
  }

  async refreshSession(refreshToken: string) {
    const { data, error } = await this.supabase.auth.refreshSession({ refresh_token: refreshToken });

    if (error) {
      throw new UnauthorizedException('Failed to refresh token');
    }

    const accessToken = data.session.access_token;
    const user = await this.prisma.profile.findUnique({ where: { id: data.user.id } });

    return { accessToken, user };
  }

  async logout(res: Response) {
    res.clearCookie('refresh_token');

    await this.supabase.auth.signOut();

    return { success: true };
  }

  async getUsers() {
    return this.prisma.profile.findMany();
  }

  async updateUser(id: string, dto: UpdateUserDto) {
    const user = await this.prisma.profile.update({
      where: { id },
      data: dto,
    });

    return user;
  }
}
