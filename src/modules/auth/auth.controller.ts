import { Body, Controller, Get, Headers, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDto } from '../../dto/register-user.dto';
import { LoginUserDto } from '../../dto/login-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() dto: RegisterUserDto) {
    return this.authService.register(dto);
  }

  @Post('login')
  async login(@Body() dto: LoginUserDto) {
    return this.authService.login(dto);
  }

  @Get('me')
  async getMe(@Headers('authorization') authHeader: string) {
    const accessToken = authHeader?.replace('Bearer ', '');
    return this.authService.getMe(accessToken);
  }
}
