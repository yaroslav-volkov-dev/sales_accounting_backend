import { Prisma, profile, session, organization, organization_member } from "@prisma/client"

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

export type SerializedUser = {
  user: profile;
  session: {
    id: string;
    workspaceId: string;
    memberId: string;
  } | null;
  memberships: organization_member[];
}

