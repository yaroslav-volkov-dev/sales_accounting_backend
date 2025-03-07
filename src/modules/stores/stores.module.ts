import { Module } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { StoresService } from './stores.service';
import { StoresController } from './stores.controller';

@Module({
  controllers: [StoresController],
  providers: [PrismaService, StoresService],
})
export class StoresModule {}
