import { ApiResponse } from "services/Api.types";
import * as Types from "./MPermissionApi.types";
import { delay } from "utils";

const mockPermissionRoleData: Types.TPermissionRole[] = [
  {
    id: "1",
    name: "Admin",
    permissions: ["Dashboard", "Phân quyền", "Khách hàng"],
    users: ["Admin", "Manager"],
    creator: "System",
    description: "Quyền admin hệ thống",
    createdAt: new Date("2024-01-01"),
  },
  {
    id: "2",
    name: "Nhân viên",
    permissions: ["Dashboard", "Khách hàng", "Phiếu cân"],
    users: ["User1", "User2"],
    creator: "Admin",
    description: "Quyền nhân viên thường",
    createdAt: new Date("2024-01-15"),
  },
];

const permissionRole = async (
  params: Types.TPermissionParams
): Promise<ApiResponse<Types.TPermissionRole[]>> => {
  ///mock api
  /// const response = await api.post<Types.TLoginResponse>("login", data);
  ///
  await delay(1000);
  return {
    data: mockPermissionRoleData,
    message: "Sucesss",
    messageCode: "Sucesss",
    status: 200,
  };
};

export const permissionApi = { permissionRole };
