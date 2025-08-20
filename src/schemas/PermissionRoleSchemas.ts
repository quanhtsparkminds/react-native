import { validators } from "utils";
import { z } from "zod";

export const permissionRoleSchema = z.object({
  name: validators.inputRequired("form.permissionRole.roleName.label"),
  role: z.array(z.string()).min(1, { message: "Vui lòng chọn quyền hạn" }),
  note: z.string(),
});

export type PermissionRoleFormValues = z.infer<typeof permissionRoleSchema>;
