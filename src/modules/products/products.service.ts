import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateProductDto } from '../../dto/create-product.dto';
import { UpdateProductDto } from '../../dto/update-product.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) { }

  private buildGetProductsFilters(
    filters?: Prisma.productWhereInput,
  ): Prisma.productFindManyArgs {
    return {
      where: {
        isActive: true,
        ...(filters || {}),
      },
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        category: {
          select: {
            name: true,
            id: true,
          },
        },
      },
    };
  }

  async getProducts({
    categoryIds,
    withoutCategory,
    suppliersIds,
    withoutSupplier,
  }: {
    categoryIds?: string[];
    withoutCategory?: boolean;
    suppliersIds?: string[];
    withoutSupplier?: boolean;
  }) {
    if (
      !categoryIds?.length &&
      !withoutCategory &&
      !suppliersIds?.length &&
      !withoutSupplier
    ) {
      return this.prisma.product.findMany(this.buildGetProductsFilters());
    }

    return this.prisma.product.findMany(this.buildGetProductsFilters({
      OR: [
        ...(categoryIds && categoryIds.length > 0
          ? [{ categoryId: { in: categoryIds } }]
          : []),
        ...(withoutCategory ? [{ categoryId: null }] : []),
      ]
    }));

  }

  async addProduct({ categoryId, price, name }: CreateProductDto) {
    return this.prisma.product.create({
      data: {
        name,
        price,
        isActive: true,
        category: categoryId ? { connect: { id: categoryId } } : undefined,
      },
      include: {
        category: {
          select: {
            name: true,
            id: true,
          },
        },
      },
    });
  }

  async updateProduct(
    id: string,
    { name, categoryId, price }: UpdateProductDto,
  ) {
    return this.prisma.product.update({
      where: { id },
      data: {
        name,
        price,
        category: categoryId ? { connect: { id: categoryId } } : undefined,
      },
      include: {
        category: {
          select: {
            name: true,
            id: true,
          },
        },
      },
    });
  }

  async deleteProduct(id: string) {
    return this.prisma.product.update({
      where: { id },
      data: { isActive: false },
    });
  }

  async permanentDeleteProduct(id: string) {
    return this.prisma.product.delete({ where: { id } });
  }
}
