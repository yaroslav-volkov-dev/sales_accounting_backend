import { Body, Controller, Get, Post, Req, Res, UnauthorizedException, Headers, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user-dto';
import { Response } from 'express';
import { LoginUserDto } from './dto/login-user.dto';
import { Request } from 'express';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post('register')
  async register(
    @Body(new ValidationPipe({ whitelist: true })) dto: CreateUserDto,
    @Res({ passthrough: true, }) res: Response,
  ) {
    return this.usersService.register(dto, res);
  }

  @Post('login')
  async login(
    @Body() dto: LoginUserDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.usersService.login(dto, res);
  }

  @Post('refresh')
  async refresh(@Req() req: Request) {
    const refreshToken = req.cookies['refresh_token'];

    if (!refreshToken) {
      throw new UnauthorizedException('Refresh token not found');
    }

    return this.usersService.refreshToken(refreshToken);
  }

  @Post('logout')
  async logout(@Res({ passthrough: true }) res: Response) {
    return this.usersService.logout(res);
  }
}
