import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateSupplierDto } from '../../dto/create-supplier.dto';

@Injectable()
export class SuppliersService {
  constructor(private prisma: PrismaService) {}

  create({ name }: CreateSupplierDto) {
    return this.prisma.category.create({ data: { name } });
  }

  findAll() {
    return this.prisma.supplier.findMany();
  }

  remove(id: number) {
    return this.prisma.supplier.delete({ where: { id } });
  }
}
