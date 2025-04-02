import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { UpdateProductDto } from '../../dto/product/update-product.dto';
import { CreateProductDto } from '../../dto/product/create-product.dto';
import { GetProductsQueryDto } from '../../dto/get-products-query.dto';
import { AuthGuard } from '../../common/guards/auth.guard';
import { ActiveSessionGuard } from 'src/common/guards/session.guard';
import { ActiveSession } from 'src/common/decorators/active-session.decorator';

@UseGuards(AuthGuard, ActiveSessionGuard)
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) { }

  @Get()
  async getWorkspaceProducts(
    @Query() query: GetProductsQueryDto,
    @ActiveSession('workspaceId', ParseUUIDPipe) workspaceId: string,
  ) {
    return this.productsService.getProducts(query, workspaceId);
  }

  @Post()
  async addProduct(
    @Body() product: CreateProductDto,
    @ActiveSession('workspaceId', ParseUUIDPipe) workspaceId: string,
  ) {
    return this.productsService.addProduct(product, workspaceId);
  }

  @Put(':id')
  async updateProduct(
    @Param('id') id: string,
    @Body() body: UpdateProductDto,
    @ActiveSession('workspaceId', ParseUUIDPipe) workspaceId: string,
  ) {
    return this.productsService.updateProduct(id, body, workspaceId);
  }

  @Delete(':id')
  async deleteProduct(
    @Param('id') id: string,
    @ActiveSession('workspaceId', ParseUUIDPipe) workspaceId: string,
  ) {
    return this.productsService.deleteProduct(id, workspaceId);
  }

  @Delete(':id/permanent')
  async permanentDeleteProduct(
    @Param('id') id: string,
    @ActiveSession('workspaceId', ParseUUIDPipe) workspaceId: string,
  ) {
    return this.productsService.permanentDeleteProduct(id, workspaceId);
  }
}
