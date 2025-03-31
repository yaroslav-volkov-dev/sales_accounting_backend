import { Body, Controller, Get, Put, Param, ParseUUIDPipe, Post, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { CurrentUser } from 'src/decorators/current-user';
import { CurrentUserType } from 'src/decorators/current-user';
import { AuthGuard } from '../auth/auth.guard';
import { WorkspaceMember, WorkspaceMemberGuard } from 'src/guards/workspace-member.guard';

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

  @UseGuards(AuthGuard, WorkspaceMemberGuard)
  @WorkspaceMember('workspaceId')
  @Put('start-session/:workspaceId')
  async startWorkspaceSession(
    @Param('workspaceId', ParseUUIDPipe) workspaceId: string,
    @CurrentUser() user: CurrentUserType
  ) {
    return this.usersService.startWorkspaceSession(workspaceId, user.id);
  }
}
