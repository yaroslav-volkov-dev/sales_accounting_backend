import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { UpdateProductDto } from '../../dto/update-product.dto';
import { CreateProductDto } from '../../dto/create-product.dto';
import { GetProductsQueryDto } from '../../dto/get-products-query.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) { }

  @Get()
  async getProducts(@Query() query: GetProductsQueryDto) {
    return this.productsService.getProducts(query);
  }

  @Post()
  async addProduct(@Body() product: CreateProductDto) {
    return this.productsService.addProduct(product);
  }

  @Put(':id')
  async updateProduct(
    @Param('id') id: string,
    @Body() body: UpdateProductDto,
  ) {
    return this.productsService.updateProduct(id, body);
  }

  @Delete(':id')
  async deleteProduct(@Param('id') id: string) {
    return this.productsService.deleteProduct(id);
  }

  @Delete(':id/permanent')
  async permanentDeleteProduct(@Param('id') id: string) {
    return this.productsService.permanentDeleteProduct(id);
  }
}
