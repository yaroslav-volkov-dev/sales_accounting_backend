import { Prisma, profile, session, organization, organization_member } from "@prisma/client"

export type User = Prisma.profileGetPayload<{
  include: {
    memberOrganizations: {
      include: {
        session: true
      }
    }
  }
}>

export type SerializedUser = {
  user: profile;
  session: session | null;
  workspaces: organization_member[];
}

