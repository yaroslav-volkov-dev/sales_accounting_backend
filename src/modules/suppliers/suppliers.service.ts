import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateSupplierDto } from '../../dto/create-supplier.dto';

@Injectable()
export class SuppliersService {
  constructor(private prisma: PrismaService) {}

  findAll(includeCount: boolean) {
    if (!includeCount) {
      return this.prisma.supplier.findMany();
    }

    return this.prisma.supplier.findMany({
      select: {
        id: true,
        name: true,
        _count: {
          select: {
            Product: true,
          },
        },
      },
    });
  }

  create({ name }: CreateSupplierDto) {
    return this.prisma.supplier.create({ data: { name } });
  }

  remove(id: number) {
    return this.prisma.supplier.delete({ where: { id } });
  }
}
