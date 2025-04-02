import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateStoreDto } from '../../dto/store/create-store.dto';
import { UpdateStoreDto } from '../../dto/store/update-store.dto';

@Injectable()
export class StoresService {
  constructor(private prisma: PrismaService) { }

  findAllByWorkspaceId(workspaceId: string) {
    return this.prisma.store.findMany({
      where: {
        workspaceId,
      },
    });
  }

  createInWorkspace(data: CreateStoreDto, workspaceId: string) {
    return this.prisma.store.create({
      data: {
        ...data,
        workspace: {
          connect: { id: workspaceId }
        }
      }
    });
  }

  updateInWorkspace(data: UpdateStoreDto, id: string, workspaceId: string) {
    return this.prisma.store.update({
      where: {
        id,
        workspaceId
      },
      data
    });
  }

  deleteInWorkspace(id: string, workspaceId: string) {
    return this.prisma.store.delete({
      where: { id, workspaceId }
    });
  }
}
