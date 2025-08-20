import { validators } from "utils";
import { z } from "zod";

export const createCustomerSupplierSchema = z.object({
  type: z.string().min(1, { message: "Vui lòng chọn loại" }),
  name: validators.inputRequired("form.createCustomerSupplier.name.label"),
  code: validators.inputRequired("form.createCustomerSupplier.code.label"),
  note: z.string().optional(),
});

export type CreateCustomerSupplierFormValues = z.infer<
  typeof createCustomerSupplierSchema
>;

// Translation keys for i18n (nested JSON format)
export const createCustomerSupplierTranslations = {
  form: {
    createCustomerSupplier: {
      type: {
        label: "Loại",
        placeholder: "Chọn loại",
      },
      name: {
        label: "Tên",
        placeholder: "Nhập tên",
      },
      code: {
        label: "Mã",
        placeholder: "Nhập mã",
      },
      note: {
        label: "Ghi chú",
        placeholder: "Nhập ghi chú",
      },
    },
  },
  validation: {
    required: "Trường này là bắt buộc",
    type: {
      required: "Vui lòng chọn loại",
    },
    code: {
      exists: "Mã đã tồn tại. Vui lòng nhập mã khác",
    },
  },
  success: {
    createCustomerSupplier: "Tạo mới thành công",
    updateCustomerSupplier: "Cập nhật thành công",
  },
  button: {
    createNew: "Tạo mới",
    update: "Cập nhật",
    generateCode: "Tạo mã",
    cancel: "Hủy",
  },
  screen: {
    createCustomerSupplier: {
      title: "Tạo mới",
    },
    editCustomerSupplier: {
      title: "Chỉnh sửa",
    },
  },
  customerSupplierTypes: {
    customer: "Khách hàng",
    supplier: "Nhà cung cấp",
  },
};
