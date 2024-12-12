import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async getAllProducts() {
    return this.prisma.product.findMany();
  }

  async addProduct() {
    return 'Hello';
  }

  async updateProduct() {
    return 'Hello';
  }

  async deleteProduct() {
    return 'Hello';
  }
}
