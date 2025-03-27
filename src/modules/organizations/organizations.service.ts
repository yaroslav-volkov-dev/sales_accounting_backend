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

  async setActiveOrganization(organizationId: string, userId: string) {

    const membership = await this.prisma.organization_member.findUnique({
      where: {
        profileId_organizationId: {
          profileId: userId,
          organizationId: organizationId
        }
      }
    });

    if (!membership) {
      throw new Error('User is not a member of this organization');
    }

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
        membershipId: membership.id
      },
      include: {
        membership: {
          include: {
            organization: true
          }
        }
      }
    });
  }
}
