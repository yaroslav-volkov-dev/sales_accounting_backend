import { Body, Controller, Get, Post, Req, Res, UnauthorizedException, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { Response, Request } from 'express';
import { LoginDto } from './dto/login.dto';
import { TokenName } from 'src/constants';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Get('me')
  async getMe(@Req() req: Request) {
    const accessToken = req.cookies[TokenName.ACCESS_TOKEN];

    if (!accessToken) {
      throw new UnauthorizedException('Token not provided');
    }

    return this.authService.getMe(accessToken);
  }

  @Post('register')
  async register(
    @Body(new ValidationPipe({ whitelist: true })) dto: RegisterDto,
    @Res({ passthrough: true, }) res: Response,
  ) {
    return this.authService.register(dto, res);
  }

  @Post('login')
  async login(
    @Body() dto: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.authService.login(dto, res);
  }

  @Post('refresh')
  async refresh(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const refreshToken = req.cookies[TokenName.REFRESH_TOKEN];

    if (!refreshToken) {
      throw new UnauthorizedException('Refresh token not found');
    }

    return this.authService.refreshSession(refreshToken, res);
  }

  @Post('logout')
  async logout(@Res({ passthrough: true }) res: Response) {
    return this.authService.logout(res);
  }
} 