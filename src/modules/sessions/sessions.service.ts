import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class SessionsService {
  constructor(private readonly prisma: PrismaService) { }

  async startWorkspaceSession(memberId: string) {
    return await this.prisma.session.create({
      data: { memberId },
    });
  }

  async closeWorkspaceSession(sessionId: string) {
    return await this.prisma.session.delete({ where: { id: sessionId } });
  }
}
