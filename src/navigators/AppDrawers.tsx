import { images } from "@assets/index";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { StaticParamList, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { DrawerContentScreen } from "components";
import React from "react";
import { Image, ImageStyle, StyleProp, View } from "react-native";
import { BottomTabbar } from "screens";
import { SummaryScreen } from "screens/SummaryScreen";
import { style } from "theme";

export const AppDrawer = createDrawerNavigator({
  screenOptions: {
    headerShadowVisible: false,
    drawerType: "back",
  },
  screens: {
    Dashboard: {
      screen: BottomTabbar,
      options: {
        headerShown: true,
        title: "",
        headerRight: ({}) => (
          <View style={[style.round_xs, { overflow: "hidden" }]}>
            <Image source={images.logo} style={$logo} />
          </View>
        ),
      },
    },
    Summary: {
      screen: SummaryScreen,
      options: {
        headerShown: true,
        title: "",
        headerRight: ({}) => (
          <View style={[style.round_xs, { overflow: "hidden" }]}>
            <Image source={images.logo} style={$logo} />
          </View>
        ),
      },
    },
  },
  drawerContent: (props) => <DrawerContentScreen {...props} />,
});

export type AppDrawerParamList = StaticParamList<typeof AppDrawer>;

export type AppDrawerNavigationProps<T extends keyof AppDrawerParamList> =
  NativeStackNavigationProp<AppDrawerParamList, T>;

export function useDrawNavigation<T extends keyof AppDrawerParamList>() {
  return useNavigation<AppDrawerNavigationProps<T>>();
}
const $logo: StyleProp<ImageStyle> = [
  style.w_xxl,
  style.h_xxl,
  style.round_xxl,
  style.mr_sm,
];
