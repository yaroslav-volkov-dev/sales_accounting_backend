import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateCategoryDto } from '../../dto/create-category.dto';

@Injectable()
export class CategoriesService {
  constructor(private prisma: PrismaService) {}

  create(category: CreateCategoryDto) {
    return this.prisma.category.create({
      data: {
        name: category.name,
      },
    });
  }

  findAll() {
    return this.prisma.category.findMany();
  }

  update(id: number) {
    return `This action updates a #${id} category`;
  }

  remove(id: number) {
    return this.prisma.category.delete({ where: { id } });
  }
}
