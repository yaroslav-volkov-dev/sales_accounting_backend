import { Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { UpdateUserDto } from "../../dto/user/update-user.dto";
import { CreateUserDto } from "../../dto/user/create-user-dto";
import { SupabaseClient } from "@supabase/supabase-js";
import { UserType } from "src/types/user.types";
import { Prisma } from "@prisma/client";
import { LoginUserDto } from "../../dto/user/login-user.dto";

@Injectable()
export class UsersService {
  constructor(
    private readonly prisma: PrismaService,
    @Inject('SUPABASE_CLIENT') private readonly supabase: SupabaseClient,
  ) { }

  async getUsers() {
    return this.prisma.profile.findMany();
  }

  async create(createUserDto: CreateUserDto) {
    const userData = {
      email: createUserDto.email,
      firstName: createUserDto.firstName,
      lastName: createUserDto.lastName,
      phoneNumber: createUserDto.phoneNumber,
    };

    const { data, error } = await this.supabase.auth.signUp({
      email: createUserDto.email,
      password: createUserDto.password,
      options: {
        data: { userData },
      },
    });

    if (error) {
      throw new UnauthorizedException(error.message);
    }

    const id = data.user.id;

    const user = await this.prisma.profile.create({
      data: { id, ...userData },
      include: this.userInclude
    });

    if (!user) {
      throw new UnauthorizedException('User not found after registration');
    }

    const refreshToken = data.session.refresh_token;
    const accessToken = data.session.access_token;

    return { user, refreshToken, accessToken };
  }

  async findByLogin(loginUserDto: LoginUserDto) {
    const { data, error } = await this.supabase.auth.signInWithPassword(loginUserDto);

    if (error) {
      throw new UnauthorizedException('Incorrect email or password');
    }

    const user: UserType = await this.prisma.profile.findUnique({
      where: { id: data.user.id },
      include: this.userInclude
    });

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    const refreshToken = data.session.refresh_token;
    const accessToken = data.session.access_token;

    return { user, refreshToken, accessToken };
  }

  async findByToken(accessToken: string) {
    const { data, error } = await this.supabase.auth.getUser(accessToken);

    if (error) {
      throw new UnauthorizedException('Failed to get user');
    }

    const user: UserType = await this.prisma.profile.findUnique({
      where: { id: data.user.id },
      include: this.userInclude
    });

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    return user;
  }

  async closeUserSession() {
    const { error } = await this.supabase.auth.signOut();

    if (error) {
      throw new UnauthorizedException('Failed to sign out');
    }
  }

  async updateUser(id: string, dto: UpdateUserDto) {
    const user = await this.prisma.profile.update({
      where: { id },
      data: dto,
    });

    return user;
  }

  private userInclude = {
    memberOrganizations: {
      include: {
        organization: true,
        session: true
      }
    }
  } satisfies Prisma.profileInclude
}
