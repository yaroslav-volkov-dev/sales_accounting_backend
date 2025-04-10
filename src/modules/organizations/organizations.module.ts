import { Module } from "@nestjs/common";
import { OrganizationsController } from "./organizations.controller";
import { OrganizationsService } from "./organizations.service";
import { PrismaService } from "src/prisma/prisma.service";
import { AuthGuard } from "../../common/guards/auth.guard";
import { AuthModule } from "../auth/auth.module";
@Module({
  controllers: [OrganizationsController],
  providers: [OrganizationsService, PrismaService, AuthGuard],
})
export class OrganizationsModule { }
