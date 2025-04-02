import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateProductDto } from '../../dto/create-product.dto';
import { UpdateProductDto } from '../../dto/update-product.dto';
import { Prisma } from '@prisma/client';
import { GetProductsQueryDto } from 'src/dto/get-products-query.dto';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) { }

  private buildGetProductsFilters(
    workspaceId: string,
    filters?: Prisma.productWhereInput,
  ): Prisma.productFindManyArgs {
    return {
      where: {
        isActive: true,
        workspaceId,
        ...(filters || {}),
      },
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        category: true
      },
    };
  }

  async getProducts(query: GetProductsQueryDto, workspaceId: string) {
    const { categoryIds, withoutCategory } = query

    if (!categoryIds?.length && !withoutCategory) {
      return this.prisma.product.findMany(this.buildGetProductsFilters(workspaceId));
    }

    return this.prisma.product.findMany(this.buildGetProductsFilters(workspaceId, {
      OR: [
        ...(categoryIds && categoryIds.length > 0
          ? [{ categoryId: { in: categoryIds } }]
          : []),
        ...(withoutCategory ? [{ categoryId: null }] : []),
      ]
    }));

  }

  async addProduct({ categoryId, price, name }: CreateProductDto, workspaceId: string) {
    return this.prisma.product.create({
      data: {
        name,
        price,
        isActive: true,
        category: categoryId ? { connect: { id: categoryId } } : undefined,
        workspace: {
          connect: { id: workspaceId }
        }
      },
      include: {
        category: true,
        workspace: true,
      },
    });
  }

  async updateProduct(
    id: string,
    { name, categoryId, price }: UpdateProductDto,
    workspaceId: string
  ) {
    return this.prisma.product.update({
      where: { id, workspaceId },
      data: {
        name,
        price,
        category: categoryId ? { connect: { id: categoryId } } : undefined,
      },
      include: {
        category: true,
        workspace: true,
      },
    });
  }

  async deleteProduct(id: string, workspaceId: string) {
    return this.prisma.product.update({
      where: { id, workspaceId },
      data: { isActive: false },
    });
  }

  async permanentDeleteProduct(id: string, workspaceId: string) {
    return this.prisma.product.delete({ where: { id, workspaceId } });
  }
}
