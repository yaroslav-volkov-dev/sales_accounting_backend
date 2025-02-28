import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateProductDto } from '../../dto/create-product.dto';
import { UpdateProductDto } from '../../dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async getAllProducts() {
    return this.prisma.product.findMany({});
  }

  async addProduct(product: CreateProductDto) {
    return this.prisma.product.create({
      data: {
        name: product.name,
        category: product.categoryId
          ? { connect: { id: product.categoryId } }
          : undefined,
      },
    });
  }

  async updateProduct(id: number, body: UpdateProductDto) {
    return this.prisma.product.update({
      where: { id },
      data: {
        name: body.name,
        category: body.categoryId
          ? { connect: { id: body.categoryId } }
          : undefined,
      },
    });
  }

  async deleteProduct(id: number) {
    return this.prisma.product.delete({ where: { id } });
  }
}
