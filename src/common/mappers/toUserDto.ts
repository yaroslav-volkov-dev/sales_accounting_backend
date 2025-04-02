import { UserDto } from "src/dto/user/user.dto";
import { UserType } from "src/types/user.types";

export const toUserDto = (user: UserType): UserDto => {
  return {
    id: user.id,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    workspaces: user.memberOrganizations.map((membership) => ({
      id: membership.organizationId,
      name: membership.organization.name,
    })),
    isSessionActive: !!user.memberOrganizations.find((org) => org.session),
  };
};

