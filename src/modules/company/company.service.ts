import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class CompanyService {
  constructor(
    private readonly prisma: PrismaService,
  ) { }

  async getAllProfiles() {
    const profiles = await this.prisma.profile.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    });

    return profiles;
  }
} 