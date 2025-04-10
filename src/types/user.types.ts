import { Prisma } from "@prisma/client";

export type UserType = Prisma.profileGetPayload<{
  include: {
    memberOrganizations: {
      include: {
        organization: true
        session: true
      }
    },
  }
}>;
