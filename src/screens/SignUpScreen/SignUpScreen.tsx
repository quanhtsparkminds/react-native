import { zodResolver } from "@hookform/resolvers/zod";
import {
  AppButton,
  AppCheckBox,
  AppText,
  AppTextInput,
  Layout,
} from "components";
import { TxKeyPath, useTx } from "i18n";
import { useAppNavigation } from "navigators";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { style } from "theme";
import { SignUpFormValues, signupSchema, STextStyle } from "types";

export const SignUpScreen = () => {
  const { t } = useTx();
  const navigation = useAppNavigation();
  const loading = false;

  const {
    control,
    handleSubmit,
    formState: { errors, isValid, isDirty },
  } = useForm<SignUpFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      checkTerm: false,
    },
  });

  const handleSignIn = () => {
    navigation.popToTop();
    navigation.navigate("SignIn");
  };

  return (
    <Layout padding="md" style={style.gap_sm} nonFill>
      <>
        <Controller
          control={control}
          name="fullName"
          render={({ field }) => (
            <AppTextInput
              labelTx="input.fullName.label"
              placeholderTx="input.fullName.placeholder"
              value={field.value}
              onChangeText={field.onChange}
              errorMessage={t(errors.email?.message as TxKeyPath, {
                input: t("input.fullName.label"),
              })}
            />
          )}
        />
        <Controller
          control={control}
          name="email"
          render={({ field }) => (
            <AppTextInput
              labelTx="input.email.label"
              placeholderTx="input.email.placeholder"
              value={field.value}
              onChangeText={field.onChange}
              errorMessage={t(errors.email?.message as TxKeyPath, {
                input: t("input.email.label"),
              })}
            />
          )}
        />
        <Controller
          control={control}
          name="password"
          render={({ field }) => (
            <AppTextInput
              labelTx="input.password.label"
              placeholderTx="input.password.placeholder"
              value={field.value}
              onChangeText={field.onChange}
              errorMessage={t(errors.password?.message as TxKeyPath, {
                input: t("input.password.label"),
              })}
            />
          )}
        />
        <Controller
          control={control}
          name="checkTerm"
          render={({ field }) => (
            <AppCheckBox
              labelTx="signUp.terms"
              checked={field.value}
              onValueChange={field.onChange}
            />
          )}
        />

        {/* <AppText tx="signIn.forgot" style={$txForgot} /> */}
        <AppButton
          titleTx="signIn.submitButton"
          onPress={handleSubmit(() => {})}
          loading={loading}
          disabled={(loading || !isValid) && isDirty}
        />
        <AppText style={$noAccount}>
          {t("signUp.haveAccount")}{" "}
          <AppText style={$txCreateAccount} onPress={handleSignIn}>
            {t("signUp.signIn")}
          </AppText>
        </AppText>
      </>
    </Layout>
  );
};

const $txForgot: STextStyle = [style.tx_right];
const $noAccount: STextStyle = [style.tx_center, style.tx_color_gray400];
const $txCreateAccount: STextStyle = [style.tx_color_primary500];
