import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateProductDto } from '../../dto/create-product.dto';
import { UpdateProductDto } from '../../dto/update-product.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  private commonProductQueryOptions: Partial<Prisma.ProductFindManyArgs> = {
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      Category: {
        select: {
          name: true,
          id: true,
        },
      },
      Supplier: {
        select: {
          name: true,
          id: true,
        },
      },
    },
  };

  async getProducts({
    categoryIds,
    withoutCategory,
    suppliersIds,
    withoutSupplier,
  }: {
    categoryIds?: number[];
    withoutCategory?: boolean;
    suppliersIds?: number[];
    withoutSupplier?: boolean;
  }) {
    if (
      !categoryIds?.length &&
      !withoutCategory &&
      !suppliersIds?.length &&
      !withoutSupplier
    ) {
      return this.prisma.product.findMany(this.commonProductQueryOptions);
    }

    return this.prisma.product.findMany({
      where: {
        OR: [
          ...(categoryIds && categoryIds.length > 0
            ? [{ categoryId: { in: categoryIds } }]
            : []),
          ...(suppliersIds && suppliersIds.length > 0
            ? [{ supplierId: { in: suppliersIds } }]
            : []),
          ...(withoutCategory ? [{ categoryId: null }] : []),
          ...(withoutSupplier ? [{ supplierId: null }] : []),
        ],
      },
      ...this.commonProductQueryOptions,
    });
  }

  async addProduct({ categoryId, price, supplierId, name }: CreateProductDto) {
    return this.prisma.product.create({
      data: {
        name,
        price,
        Category: categoryId ? { connect: { id: categoryId } } : undefined,
        Supplier: supplierId ? { connect: { id: supplierId } } : undefined,
      },
      include: {
        Category: {
          select: {
            name: true,
            id: true,
          },
        },
        Supplier: {
          select: {
            name: true,
            id: true,
          },
        },
      },
    });
  }

  async updateProduct(
    id: number,
    { name, categoryId, supplierId, price }: UpdateProductDto,
  ) {
    return this.prisma.product.update({
      where: { id },
      data: {
        name,
        price,
        Category: categoryId ? { connect: { id: categoryId } } : undefined,
        Supplier: supplierId ? { connect: { id: supplierId } } : undefined,
      },
      include: {
        Category: {
          select: {
            name: true,
            id: true,
          },
        },
        Supplier: {
          select: {
            name: true,
            id: true,
          },
        },
      },
    });
  }

  async deleteProduct(id: number) {
    return this.prisma.product.delete({ where: { id } });
  }
}
