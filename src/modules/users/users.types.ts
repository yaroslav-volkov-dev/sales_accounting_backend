import { Prisma } from "@prisma/client";

export type User = Prisma.profileGetPayload<{
  include: {
    memberOrganizations: {
      include: {
        session: true,
        organization: true,
      }
    }
  }
}>