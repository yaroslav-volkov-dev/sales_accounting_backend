import { Global, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { PrismaService } from '../../prisma/prisma.service';

@Global()
@Module({
  providers: [UsersService, PrismaService],
  exports: [UsersService],
})
export class UsersModule { }
