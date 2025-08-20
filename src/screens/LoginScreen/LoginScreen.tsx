import { images } from "@assets/index";
import { useNavigation } from "@react-navigation/native";
import { AppText, LoginForm, useModert } from "components";
import { ERole, useAppDispatch, useLoginMutation } from "hooks";
import React from "react";
import { useTranslation } from "react-i18next";
import { Image, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { signIn } from "store";
import { spacing, style } from "theme";
import { LoginFormValues, SImageStyle, STextStyle, SViewStyle } from "types";

export const LoginScreen = () => {
  const navigate = useNavigation();
  const { t } = useTranslation();
  const { mutate, isPending } = useLoginMutation();
  const modert = useModert();
  const dispatch = useAppDispatch();

  const handleLogin = (values: LoginFormValues) => {
    mutate(values, {
      onSuccess: (value) =>
        dispatch(
          signIn({ token: value.data?.accessToken || "", role: ERole.ADMIN })
        ),
      onError: (error: any) => {
        modert.show({
          title: "Login failed",
          message: "unknow error " + error,
        });
      },
    });
  };

  const handleSignup = () => {
    navigate.navigate("SignUp");
  };

  const insets = useSafeAreaInsets();

  return (
    <View style={[$root, { paddingTop: insets.top || spacing.lg }]}>
      <View>
        <View style={$header}>
          <View style={[$logo]}>
            <Image source={images.logo} style={$img} />
          </View>
          <View style={$title}>
            <AppText style={$text}>{t("signIn.welcomeBack")}</AppText>
            <AppText style={$sub}>{t("signIn.subTitle")}</AppText>
          </View>
        </View>

        <View style={$container}>
          <LoginForm onSubmit={handleLogin} loading={isPending} />
          <View style={[$title, { alignItems: "flex-end" }]}>
            <AppText style={$forgotPw}>{t("signIn.forgot")}</AppText>
          </View>
        </View>
      </View>

      <View style={$bottom}>
        <AppText>{t("signIn.noAccount")}</AppText>
        <AppText
          onPress={handleSignup}
          style={$bottomText}
          tx="signIn.signUpNow"
        />
      </View>
    </View>
  );
};
const $header: SViewStyle = [style.gap_md, style.pt_txBaseSize];
const $container: SViewStyle = [style.mx_md, style.gap_sm, style.mt_lg];
const $title: STextStyle = [style.align_center, style.mx_md];
const $text: STextStyle = [style.tx_font_bold];
const $sub: STextStyle = [style.tx_size_md, style.pt_md];
const $forgotPw: STextStyle = [style.m_lg, style.tx_color_primary500];
const $logo: SViewStyle = [style.align_center];
const $root: SViewStyle = [
  style.w_full,
  style.h_full,
  style.bg_color_white,
  style.justify_between,
];
const $img: SImageStyle = [{ width: 100, height: 100, borderRadius: 12 }];
const $bottom: SViewStyle = [style.row_center, style.pb_lg, style.flex_start];
const $bottomText: STextStyle = [
  style.tx_size_md,
  style.tx_color_primary500,

  style.mx_sm,
  style.pb_md,
];
