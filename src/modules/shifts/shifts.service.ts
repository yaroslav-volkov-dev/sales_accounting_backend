import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { StartShiftDto } from './dto/start-shift.dto';
import { CloseShiftDto } from './dto/close-shift.dto';

@Injectable()
export class ShiftsService {
  constructor(private readonly prisma: PrismaService) { }

  async getAll() {
    return this.prisma.shift.findMany();
  }

  async startShift(startShiftDto: StartShiftDto) {
    const activeShift = await this.prisma.shift.findFirst({
      where: { userId: startShiftDto.userId, endedAt: null },
    });
    if (activeShift) {
      throw new ConflictException(
        'You already have an active shift. You should close it before start a new one.',
      );
    }

    return this.prisma.shift.create({ data: startShiftDto });
  }

  async closeShift({ userId }: CloseShiftDto) {
    const activeShift = await this.prisma.shift.findFirst({
      where: { userId, endedAt: null },
    });
    if (!activeShift) {
      throw new NotFoundException('There is no active shift to close.');
    }

    return this.prisma.shift.update({
      where: { id: activeShift.id },
      data: { endedAt: new Date() },
    });
  }

  async getActiveShift(userId: string) {
    return this.prisma.shift.findFirst({
      where: { userId, endedAt: null },
      include: {
        store: true,
      },
    });
  }
}
