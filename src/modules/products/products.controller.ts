import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { UpdateProductDto } from '../../dto/update-product.dto';
import { CreateProductDto } from '../../dto/create-product.dto';
import { GetProductsQueryDto } from '../../dto/get-products-query.dto';
import { AuthGuard } from '../auth/auth.guard';
import { SessionGuard } from 'src/common/guards/session.guard';
import { Session } from 'src/common/decorators/session.decorator';

@UseGuards(AuthGuard, SessionGuard)
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) { }

  @Get()
  async getWorkspaceProducts(
    @Query() query: GetProductsQueryDto,
    @Session('workspaceId', ParseUUIDPipe) workspaceId: string,
  ) {
    return this.productsService.getProducts(query, workspaceId);
  }

  @Post()
  async addProduct(
    @Body() product: CreateProductDto,
    @Session('workspaceId', ParseUUIDPipe) workspaceId: string,
  ) {
    return this.productsService.addProduct(product, workspaceId);
  }

  @Put(':id')
  async updateProduct(
    @Param('id') id: string,
    @Body() body: UpdateProductDto,
    @Session('workspaceId', ParseUUIDPipe) workspaceId: string,
  ) {
    return this.productsService.updateProduct(id, body, workspaceId);
  }

  @Delete(':id')
  async deleteProduct(
    @Param('id') id: string,
    @Session('workspaceId', ParseUUIDPipe) workspaceId: string,
  ) {
    return this.productsService.deleteProduct(id, workspaceId);
  }

  @Delete(':id/permanent')
  async permanentDeleteProduct(
    @Param('id') id: string,
    @Session('workspaceId', ParseUUIDPipe) workspaceId: string,
  ) {
    return this.productsService.permanentDeleteProduct(id, workspaceId);
  }
}
