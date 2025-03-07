import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateStoreDto } from '../../dto/create-store.dto';
import { UpdateStoreDto } from '../../dto/update-store.dto';

@Injectable()
export class StoresService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.store.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  create(data: CreateStoreDto) {
    return this.prisma.store.create({ data });
  }

  update(id: number, data: UpdateStoreDto) {
    return this.prisma.store.update({ where: { id }, data });
  }

  delete(id: number) {
    return this.prisma.store.delete({ where: { id } });
  }
}
