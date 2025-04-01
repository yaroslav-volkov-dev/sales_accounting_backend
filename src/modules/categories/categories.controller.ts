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
import { CategoriesService } from './categories.service';
import { UpdateCategoryDto } from '../../dto/update-category-dto';
import { CreateCategoryDto } from '../../dto/create-category.dto';
import { SessionGuard } from 'src/common/guards/session.guard';
import { AuthGuard } from '../auth/auth.guard';
import { Session } from 'src/common/decorators/session.decorator';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) { }

  @UseGuards(AuthGuard, SessionGuard)
  @Get()
  findWorkspaceCategories(@Session('workspaceId') workspaceId: string) {
    return this.categoriesService.findWorkspaceCategories(workspaceId);
  }

  @UseGuards(AuthGuard, SessionGuard)
  @Post()
  async addCategory(
    @Body() category: CreateCategoryDto,
    @Session('workspaceId') workspaceId: string,
  ) {
    return this.categoriesService.create(category, workspaceId);
  }

  @UseGuards(AuthGuard, SessionGuard)
  @Delete(':id')
  async deleteCategory(@Param('id', ParseUUIDPipe) id: string, @Session('workspaceId') workspaceId: string) {
    return this.categoriesService.remove(id, workspaceId);
  }

  @UseGuards(AuthGuard, SessionGuard)
  @Put(':id')
  async updateCategory(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() body: UpdateCategoryDto,
    @Session('workspaceId') workspaceId: string,
  ) {
    return this.categoriesService.update(id, body, workspaceId);
  }
}
