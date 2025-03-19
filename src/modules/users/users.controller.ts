import { Body, Controller, Get, Post, Req, Res, UnauthorizedException, ValidationPipe, Put, Param, ParseUUIDPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user-dto';
import { request, Response } from 'express';
import { LoginUserDto } from './dto/login-user.dto';
import { Request } from 'express';
import { UpdateUserDto } from './dto/update-user.dto';
import { TokenName } from 'src/constants';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Get()
  async getUsers() {
    return this.usersService.getUsers();
  }

  @Get('me')
  async getMe(@Req() req) {
    return this.usersService.getMe(req.cookies[TokenName.ACCESS_TOKEN]);
  }

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
  async refresh(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const refreshToken = req.cookies[TokenName.REFRESH_TOKEN];

    if (!refreshToken) {
      throw new UnauthorizedException('Refresh token not found');
    }

    return this.usersService.refreshSession(refreshToken, res);
  }

  @Post('logout')
  async logout(@Res({ passthrough: true }) res: Response) {
    return this.usersService.logout(res);
  }

  @Put('update/:id')
  async updateUser(@Param('id', ParseUUIDPipe) id: string, @Body() dto: UpdateUserDto) {
    return this.usersService.updateUser(id, dto);
  }
}
