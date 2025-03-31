import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateOrganizationDto } from "./dto/create-organization.dto";

@Injectable()
export class OrganizationsService {
  constructor(private readonly prisma: PrismaService) { }

  async createOrganization({ dto, ownerId }: { dto: CreateOrganizationDto, ownerId: string }) {
    const { organizationName } = dto;

    const organization = await this.prisma.organization.create({ data: { name: organizationName } });

    await this.prisma.member_role.create({
      data: {
        member: {
          create: {
            profile: {
              connect: {
                id: ownerId
              }
            },
            organization: {
              connect: {
                id: organization.id
              }
            }
          },
        },
        role: {
          create: {
            name: "Superadmin",
            organization: {
              connect: {
                id: organization.id
              }
            },
            isSuperAdmin: true
          }
        }
      }
    })

    return organization;
  }
}
