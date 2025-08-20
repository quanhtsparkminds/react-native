import { DrawerContentComponentProps } from "@react-navigation/drawer";
import { useAppDispatch } from "hooks";
import { TxKeyPath } from "i18n";
import { useAppTheme } from "provider";
import React from "react";
import {
  FlatList,
  Image,
  ImageStyle,
  Pressable,
  StyleProp,
  View,
} from "react-native";
import { signOut } from "store";
import { style } from "theme";
import { STextStyle, SViewStyle } from "types";
import { hexToRgbA } from "utils";
import { AppButton } from "../AppButton";
import { AppIcon } from "../AppIcon";
import { AppText } from "../AppText";
import { Layout } from "../Layout";

import { images } from "@assets/index";
import * as Types from "./DrawerContent.types";

export const DrawerContentScreen: React.FC<DrawerContentComponentProps> = (
  props
) => {
  const { colorScheme } = useAppTheme();
  const tabs = props.state.routeNames;
  const dispatch = useAppDispatch();

  const handleChangeTab = (name: string) => {
    props.navigation.navigate(name);
  };

  const handleLogout = () => {
    dispatch(signOut());
  };

  return (
    <Layout safeAreaOnTop paddingX="sm" safeAreaOnBottom>
      <View style={$boxHeader}>
        <View style={[style.round_xs, { overflow: "hidden" }]}>
          <Image source={images.logo} style={$logo} />
        </View>
        <View style={style.gap_xxxs}>
          <AppText style={[style.tx_font_bold, style.tx_size_md]}>
            React Native
          </AppText>
          <AppText>Study System</AppText>
        </View>
      </View>
      <FlatList
        data={tabs}
        renderItem={({ item, index }) => {
          const isActive = props.state.index === index;
          return (
            <Pressable
              key={item}
              style={[
                $item,
                isActive && {
                  backgroundColor: hexToRgbA(
                    colorScheme.primary.toString(),
                    0.1
                  ),
                },
              ]}
              onPress={() => handleChangeTab(item)}
            >
              <AppIcon
                name={Types.imagesDrawer[item]}
                colorName={isActive ? "primary" : "onBackground"}
              />
              <AppText
                tx={`drawer.${item}` as TxKeyPath}
                style={isActive && $txActive}
              />
            </Pressable>
          );
        }}
      />
      <AppButton title="Đăng xuất" style={style.mt_md} onPress={handleLogout} />
    </Layout>
  );
};

const $boxHeader: SViewStyle = [
  style.row,
  style.gap_sm,
  style.align_center,
  style.mb_md,
];
const $item: SViewStyle = [
  style.py_sm,
  style.px_md,
  style.round_xs,
  style.row,
  style.gap_sm,
];
const $txActive: STextStyle = [style.tx_font_medium];
const $logo: StyleProp<ImageStyle> = [style.w_xxxl, style.h_xxxl];
