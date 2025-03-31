import { Injectable } from "@nestjs/common";
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

  async startWorkspaceSession({ organizationId, userId, membershipId }: { organizationId: string, userId: string, membershipId: string }) {
    const existingSession = await this.prisma.user_session.findUnique({
      where: { profileId: userId },
      include: {
        membership: true
      }
    });

    if (existingSession && existingSession.membership.organizationId === organizationId) {
      return await this.prisma.user_session.findUnique({
        where: { id: existingSession.id },
        include: {
          membership: {
            include: {
              organization: true
            }
          }
        }
      });
    }

    if (existingSession) {
      await this.prisma.user_session.delete({
        where: { id: existingSession.id }
      });
    }

    return await this.prisma.user_session.create({
      data: {
        profileId: userId,
        membershipId: membershipId
      },
    });
  }
}
