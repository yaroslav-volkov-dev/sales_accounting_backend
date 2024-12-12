import { Controller, Get } from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  async getAllProducts() {
    return this.productsService.getAllProducts();
  }

  // @Post()
  // async addProduct(@Body() product: { name: string; category: string }) {
  //   return this.productsService.addProduct();
  // }
  //
  // @Put(':id')
  // async updateProduct(
  //   @Param('id') id: string,
  //   @Body() updates: { name?: string; category?: string },
  // ) {
  //   return this.productsService.updateProduct();
  // }
  //
  // @Delete(':id')
  // async deleteProduct(@Param('id') id: string) {
  //   return this.productsService.deleteProduct();
  // }
}
