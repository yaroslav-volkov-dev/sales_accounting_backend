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
}
