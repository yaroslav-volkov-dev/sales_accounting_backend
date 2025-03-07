import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateSupplierDto } from '../../dto/create-supplier.dto';
import { UpdateSupplierDto } from '../../dto/update-supplier-dto';

@Injectable()
export class SuppliersService {
  constructor(private prisma: PrismaService) {}

  findAll(includeCount: boolean) {
    if (!includeCount) {
      return this.prisma.supplier.findMany({
        orderBy: {
          createdAt: 'desc',
        },
      });
    }

    return this.prisma.supplier.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      select: {
        id: true,
        name: true,
        phoneNumber: true,
        _count: {
          select: {
            Product: true,
          },
        },
      },
    });
  }

  create(data: CreateSupplierDto) {
    return this.prisma.supplier.create({ data });
  }

  remove(id: number) {
    return this.prisma.supplier.delete({ where: { id } });
  }

  update(id: number, data: UpdateSupplierDto) {
    return this.prisma.supplier.update({
      where: { id },
      data,
    });
  }
}
