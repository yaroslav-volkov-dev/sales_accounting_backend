import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { StoresService } from './stores.service';
import { CreateStoreDto } from '../../dto/store/create-store.dto';
import { UpdateStoreDto } from '../../dto/store/update-store.dto';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { ActiveSessionGuard } from 'src/common/guards/session.guard';
import { ActiveSession } from 'src/common/decorators/active-session.decorator';

@UseGuards(AuthGuard, ActiveSessionGuard)

@Controller('stores')
export class StoresController {
  constructor(private readonly storesService: StoresService) { }

  @Get()
  findAllByWorkspaceId(
    @ActiveSession('workspaceId') workspaceId: string,
  ) {
    return this.storesService.findAllByWorkspaceId(workspaceId);
  }

  @Post()
  createInWorkspace(
    @Body() store: CreateStoreDto,
    @ActiveSession('workspaceId') workspaceId: string,
  ) {
    return this.storesService.createInWorkspace(store, workspaceId);
  }

  @Put(':id')
  updateInWorkspace(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() body: UpdateStoreDto,
    @ActiveSession('workspaceId') workspaceId: string,
  ) {
    return this.storesService.updateInWorkspace(body, id, workspaceId);
  }

  @Delete(':id')
  deleteInWorkspace(@Param('id', ParseUUIDPipe) id: string, @ActiveSession('workspaceId') workspaceId: string) {
    return this.storesService.deleteInWorkspace(id, workspaceId);
  }
}
