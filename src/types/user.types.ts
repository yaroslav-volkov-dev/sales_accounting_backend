import { Prisma } from "@prisma/client";

export type CurrentUser = Prisma.profileGetPayload<{
  include: {
    memberOrganizations: {
      include: {
        organization: true
      }
    },
    session: true
  }
}>;