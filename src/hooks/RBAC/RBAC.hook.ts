export enum ERole {
  ADMIN = "admin",
  USER1 = "user1",
  USER2 = "user2",
}
export enum EPermissionName {
  REPORT,
  CLIENT,
}

export enum EPermissions {
  CREATE,
  READ,
  UPDATE,
  DELETE,
}

export type TAction = {
  [EPermissions.CREATE]: ERole[];
  [EPermissions.READ]: ERole[];
  [EPermissions.UPDATE]: ERole[];
  [EPermissions.DELETE]: ERole[];
};

export const PERMISSIONS: Record<EPermissionName, TAction> = {
  [EPermissionName.REPORT]: {
    [EPermissions.CREATE]: [ERole.ADMIN],
    [EPermissions.READ]: [ERole.ADMIN, ERole.USER1, ERole.USER2],
    [EPermissions.UPDATE]: [ERole.ADMIN],
    [EPermissions.DELETE]: [ERole.ADMIN],
  },
  [EPermissionName.CLIENT]: {
    [EPermissions.CREATE]: [ERole.ADMIN],
    [EPermissions.READ]: [ERole.ADMIN, ERole.USER1, ERole.USER2],
    [EPermissions.UPDATE]: [ERole.ADMIN],
    [EPermissions.DELETE]: [ERole.ADMIN],
  },
};

type TRbac = {
  role: ERole;
  name: EPermissionName;
  action: keyof TAction;
};

export const hasPermission = ({ role, name, action }: TRbac) => {
  return PERMISSIONS[name][action].includes(role);
};
