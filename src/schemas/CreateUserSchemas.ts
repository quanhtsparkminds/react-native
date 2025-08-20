import { validators } from "utils";
import { z } from "zod";

export const createUserSchema = z
  .object({
    name: validators.inputRequired("form.createUser.name.label"),
    username: validators.inputRequired("form.createUser.username.label"),
    password: validators.inputRequired("form.createUser.password.label"),
    confirmPassword: validators.inputRequired(
      "form.createUser.confirmPassword.label"
    ),
    permission: z
      .array(z.string())
      .min(1, { message: "Vui lòng chọn quyền hạn" }),
    note: z.string().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Nhập lại mật khẩu không khớp. Vui lòng nhập lại.",
    path: ["confirmPassword"],
  });

export type CreateUserFormValues = z.infer<typeof createUserSchema>;
