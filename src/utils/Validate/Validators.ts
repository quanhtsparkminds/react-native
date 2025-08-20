import { TxKeyPath } from "i18n";
import { z } from "zod";
import { getTrErrorMessage } from "./ErrorMessage";
import { inputMaxLength } from "./MaxLength";
import { inputMinLength } from "./MinLength";

export const textBoxValidator = (labelTx: TxKeyPath) => {
  const errorMsg = getTrErrorMessage();
  return z
    .string()
    .min(1, { message: errorMsg.required(labelTx) })
    .max(inputMaxLength.text, {
      message: errorMsg.maxLength({ length: inputMaxLength.text }),
    });
};

export const emailValidator = () => {
  const errorMsg = getTrErrorMessage();
  return z
    .string()
    .min(1, { message: errorMsg.required("input.email.label") })
    .max(inputMaxLength.email, {
      message: errorMsg.maxLength({
        length: inputMaxLength.email,
      }),
    })
    .email({ message: errorMsg.incorrectEmail() });
};

export const passwordValidator = () => {
  const errorMsg = getTrErrorMessage();
  return z
    .string()
    .min(1, { message: errorMsg.required("input.password.label") })
    .min(inputMinLength.password, {
      message: errorMsg.minLength({
        length: inputMinLength.password,
      }),
    })
    .max(inputMaxLength.password, {
      message: errorMsg.maxLength({
        length: inputMaxLength.password,
      }),
    });
};

export const textAreaValidator = (labelTx: TxKeyPath) => {
  const errorMsg = getTrErrorMessage();
  return z
    .string()
    .min(1, { message: errorMsg.required(labelTx) })
    .max(inputMaxLength.note, {
      message: errorMsg.maxLength({
        length: inputMaxLength.note,
      }),
    });
};

export const inputRequired = (labelTx: TxKeyPath) => {
  const errorMsg = getTrErrorMessage();
  return z.string().min(1, { message: errorMsg.required(labelTx) });
};

export const validators = {
  textBox: textBoxValidator,
  email: emailValidator,
  password: passwordValidator,
  note: textAreaValidator,
  inputRequired: inputRequired,
};
