import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { UpdateUserDto } from "./dto/update-user.dto";

@Injectable()
export class UsersService {
  constructor(
    private readonly prisma: PrismaService,
  ) { }

  async getUsers() {
    return this.prisma.profile.findMany();
  }

  async updateUser(id: string, dto: UpdateUserDto) {
    const user = await this.prisma.profile.update({
      where: { id },
      data: dto,
    });

    return user;
  }

  async startWorkspaceSession({ memberId }: { memberId: string }) {
    return await this.prisma.session.create({
      data: { memberId },
    });
  }

  async closeWorkspaceSession(sessionId: string) {
    return await this.prisma.session.delete({ where: { id: sessionId } });
  }
}
