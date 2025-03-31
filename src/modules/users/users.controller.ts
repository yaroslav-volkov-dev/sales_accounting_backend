import { Body, Controller, Get, Put, Param, ParseUUIDPipe, Post, UseGuards, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from 'src/common/decorators/user.decorator';
import { AuthGuard } from '../auth/auth.guard';
import { MembershipGuard, WorkspaceIdParam } from 'src/common/guards/membership.guard';
import { Membership } from 'src/common/decorators/membership.decorator';

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

  @UseGuards(AuthGuard, MembershipGuard)
  @WorkspaceIdParam('workspaceId')
  @Put('start-session/:workspaceId')
  async startWorkspaceSession(
    @Param('workspaceId', ParseUUIDPipe) workspaceId: string,
    @User('id', ParseUUIDPipe) userId: string,
    @Membership('id', ParseUUIDPipe) membershipId: string
  ) {
    return this.usersService.startWorkspaceSession({
      organizationId: workspaceId,
      userId: userId,
      membershipId: membershipId
    });
  }
}
