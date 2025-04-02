import { Body, Controller, Delete, Get, Put, Param, ParseUUIDPipe, Post, UseGuards, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from '../auth/auth.guard';
import { MembershipGuard, WorkspaceIdParam } from 'src/common/guards/membership.guard';
import { Membership } from 'src/common/decorators/membership.decorator';
import { SessionGuard } from 'src/common/guards/session.guard';
import { Session } from 'src/common/decorators/session.decorator';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }
  @Get()
  async getUsers() {
    return this.usersService.getUsers();
  }

  @Put('update/:id')
  async updateUser(@Param('id', ParseUUIDPipe) id: string, @Body() dto: UpdateUserDto) {
    return this.usersService.updateUser(id, dto);
  }
}
