import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { StoresService } from './stores.service';
import { CreateStoreDto } from '../../dto/create-store.dto';
import { UpdateStoreDto } from '../../dto/update-store.dto';

@Controller('stores')
export class StoresController {
  constructor(private readonly storesService: StoresService) {}

  @Get()
  findAllStores() {
    return this.storesService.findAll();
  }

  @Post()
  addCategory(@Body() store: CreateStoreDto) {
    return this.storesService.create(store);
  }

  @Put(':id')
  updateCategory(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateStoreDto,
  ) {
    return this.storesService.update(id, body);
  }

  @Delete(':id')
  deleteCategory(@Param('id', ParseIntPipe) id: number) {
    return this.storesService.delete(id);
  }
}
