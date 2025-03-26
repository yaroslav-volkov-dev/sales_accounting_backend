import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateOrganizationDto } from "./dto/create-organization.dto";

@Injectable()
export class OrganizationsService {
  constructor(private readonly prisma: PrismaService) { }

  async createOrganization({ dto, ownerId }: { dto: CreateOrganizationDto, ownerId: string }) {
    const organization = await this.prisma.organization.create({
      data: {
        name: dto.name,
        owner: {
          connect: {
            id: ownerId
          }
        }
      },
      include: {
        owner: true
      }
    });

    return organization;
  }

  async setActiveOrganization(organizationId: string, userId: string) {
    await this.prisma.profile.update({
      where: { id: userId },
      data: {
        activeOrganization: {
          connect: {
            id: organizationId
          }
        }
      },
    });
  }
}
