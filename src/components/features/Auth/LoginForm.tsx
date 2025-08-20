import { zodResolver } from "@hookform/resolvers/zod";
import { useTx } from "i18n";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { style } from "theme";
import { LoginFormValues, loginSchema, STextStyle } from "types";
import { AppButton, AppText, AppTextInput, PasswordInput } from "../../ui";

type LoginFormProps = {
  onSubmit: (values: LoginFormValues) => void;
  loading?: boolean;
};

export const LoginForm = ({ onSubmit, loading }: LoginFormProps) => {
  const { t } = useTx();

  const {
    control,
    handleSubmit,
    formState: { errors, isValid, isDirty },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "quanht@yopmail.com",
      password: "Abc@12345",
    },
    mode: "onChange",
  });

  return (
    <>
      <Controller
        control={control}
        name="email"
        render={({ field }) => (
          <AppTextInput
            labelTx="input.login.label"
            placeholderTx="input.login.placeholder"
            value={field.value}
            onChangeText={field.onChange}
            errorMessage={errors.email?.message}
          />
        )}
      />
      <Controller
        control={control}
        name="password"
        render={({ field }) => (
          <PasswordInput
            labelTx="input.password.label"
            placeholderTx="input.password.placeholder"
            value={field.value}
            onChangeText={field.onChange}
            errorMessage={errors.password?.message}
          />
        )}
      />
      <AppButton
        titleTx="signIn.submitButton"
        onPress={handleSubmit(onSubmit)}
        loading={loading}
        disabled={(loading || !isValid) && isDirty}
      />
    </>
  );
};

const $txForgot: STextStyle = [style.tx_right];
