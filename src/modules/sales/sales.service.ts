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
        Product: true,
        Store: true,
        Shift: true,
        Profile: true,
      },
    });
  }

  findAll() {
    return this.prisma.sale.findMany({
      include: {
        Product: true,
        Store: true,
        Shift: true,
        Profile: true,
      },
    });
  }

  findOne(id: number) {
    return this.prisma.sale.findUnique({
      where: { id },
      include: {
        Product: true,
        Store: true,
        Shift: true,
        Profile: true,
      },
    });
  }

  update(id: number, updateSaleDto: UpdateSaleDto) {
    return this.prisma.sale.update({
      where: { id },
      data: updateSaleDto,
      include: {
        Product: true,
        Store: true,
        Shift: true,
        Profile: true,
      },
    });
  }

  remove(id: number) {
    return this.prisma.sale.delete({
      where: { id },
    });
  }

  findAllByShiftId(shiftId: number) {
    return this.prisma.sale.findMany({
      where: { shiftId },
      include: {
        Product: true,
        Store: true,
        Shift: true,
        Profile: true,
      },
    });
  }
}
