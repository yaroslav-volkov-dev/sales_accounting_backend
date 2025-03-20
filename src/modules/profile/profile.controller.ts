import { Body, Controller, Put, Req, UnauthorizedException, ValidationPipe } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { Request } from 'express';
import { TokenName } from 'src/constants';
import { UpdateProfileDto } from './dto/update-profile.dto';

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) { }

  @Put('update')
  async updateProfile(
    @Req() req: Request,
    @Body(new ValidationPipe({ whitelist: true })) dto: UpdateProfileDto
  ) {
    const accessToken = req.cookies[TokenName.ACCESS_TOKEN];

    if (!accessToken) {
      throw new UnauthorizedException('Access token not found');
    }

    return this.profileService.updateProfile(accessToken, dto);
  }
} 