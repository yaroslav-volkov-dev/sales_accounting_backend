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
  Session,
  UseGuards,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { UpdateCategoryDto } from '../../dto/category/update-category-dto';
import { CreateCategoryDto } from '../../dto/category/create-category.dto';
import { ActiveSessionGuard } from 'src/common/guards/session.guard';
import { AuthGuard } from '../../common/guards/auth.guard';
import { ActiveSession } from 'src/common/decorators/active-session.decorator';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) { }

  @UseGuards(AuthGuard, ActiveSessionGuard)
  @Get()
  findWorkspaceCategories(@ActiveSession('workspaceId') workspaceId: string) {
    return this.categoriesService.findWorkspaceCategories(workspaceId);
  }

  @UseGuards(AuthGuard, ActiveSessionGuard)
  @Post()
  async addCategory(
    @Body() category: CreateCategoryDto,
    @ActiveSession('workspaceId') workspaceId: string,
  ) {
    return this.categoriesService.create(category, workspaceId);
  }

  @UseGuards(AuthGuard, ActiveSessionGuard)
  @Delete(':id')
  async deleteCategory(@Param('id', ParseUUIDPipe) id: string, @ActiveSession('workspaceId') workspaceId: string) {
    return this.categoriesService.remove(id, workspaceId);
  }

  @UseGuards(AuthGuard, ActiveSessionGuard)
  @Put(':id')
  async updateCategory(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() body: UpdateCategoryDto,
    @ActiveSession('workspaceId') workspaceId: string,
  ) {
    return this.categoriesService.update(id, body, workspaceId);
  }
}
