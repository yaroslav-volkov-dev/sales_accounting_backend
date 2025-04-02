import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateCategoryDto } from '../../dto/category/create-category.dto';
import { UpdateCategoryDto } from '../../dto/category/update-category-dto';

@Injectable()
export class CategoriesService {
  constructor(private prisma: PrismaService) { }

  findWorkspaceCategories(workspaceId: string) {
    return this.prisma.category.findMany({
      where: {
        workspaceId,
      },
      orderBy: {
        createdAt: 'desc',
      },
      select: {
        id: true,
        name: true,
        createdAt: true,
        updatedAt: true,
        _count: {
          select: {
            product: true,
          },
        },
      },
    });
  }

  create(data: CreateCategoryDto, workspaceId: string) {
    return this.prisma.category.create({
      data: {
        ...data,
        workspace: {
          connect: { id: workspaceId }
        }
      }
    });
  }

  update(id: string, data: UpdateCategoryDto, workspaceId: string) {
    return this.prisma.category.update({
      where: { id, workspaceId },
      data,
    });
  }

  remove(id: string, workspaceId: string) {
    return this.prisma.category.delete({ where: { id, workspaceId } });
  }
}
