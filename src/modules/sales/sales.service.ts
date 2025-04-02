import { Injectable } from '@nestjs/common';
import { CreateSaleDto } from './dto/create-sale.dto';
import { UpdateSaleDto } from './dto/update-sale.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class SalesService {
  constructor(private readonly prisma: PrismaService) { }

  create(createSaleDto: CreateSaleDto) {

    return this.prisma.sale.create({
      data: createSaleDto,
      include: {
        store: true,
        shift: true,
      },
    });
  }

  findAll() {
    return this.prisma.sale.findMany({
      include: {
        store: true,
        shift: true,
      },
    });
  }

  findOne(id: string) {
    return this.prisma.sale.findUnique({
      where: { id },
      include: {
        store: true,
        shift: true,
      },
    });
  }

  update(id: string, updateSaleDto: UpdateSaleDto) {
    return this.prisma.sale.update({
      where: { id },
      data: updateSaleDto,
      include: {
        store: true,
        shift: true,
      },
    });
  }

  remove(id: string) {
    return this.prisma.sale.delete({
      where: { id },
    });
  }

  findAllByShiftId(shiftId: number) {
    return this.prisma.sale.findMany({
      where: { shiftId },
      include: {
        store: true,
        shift: true,
      },
    });
  }
}
