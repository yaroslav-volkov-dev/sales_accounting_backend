import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async getAllProducts() {
    return this.prisma.product.findMany({});
  }

  async addProduct(product: { name: string; category?: string }) {
    return this.prisma.product.create({ data: product });
  }

  async updateProduct(id: number, body: { name?: string; category?: string }) {
    return this.prisma.product.update({ where: { id }, data: body });
  }

  async deleteProduct(id: number) {
    return this.prisma.product.delete({ where: { id } });
  }
}
