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
import { SuppliersService } from './suppliers.service';
import { CreateSupplierDto } from '../../dto/create-supplier.dto';
import { UpdateSupplierDto } from '../../dto/update-supplier-dto';

@Controller('suppliers')
export class SuppliersController {
  constructor(private readonly suppliersService: SuppliersService) {}

  @Get()
  findAll(@Query('includeCount') includeCount: boolean) {
    return this.suppliersService.findAll(includeCount);
  }

  @Post()
  async addSupplier(@Body() supplier: CreateSupplierDto) {
    return this.suppliersService.create(supplier);
  }

  @Delete(':id')
  async deleteSupplier(@Param('id', ParseIntPipe) id: number) {
    return this.suppliersService.remove(id);
  }

  @Put(':id')
  async updateSupplier(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateSupplierDto,
  ) {
    return this.suppliersService.update(id, body);
  }
}
