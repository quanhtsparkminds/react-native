import { images } from "@assets/index";
import { StaticParamList, useNavigation } from "@react-navigation/native";
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from "@react-navigation/native-stack";
import { useAppSelector } from "hooks";
import { LanguageScreen, LoginScreen, SignUpScreen } from "screens";
import { selectIsSignedIn } from "store";
import { palette } from "theme";
import { isAndroid } from "utils";
import { AppDrawer } from "./AppDrawers";

const useIsSignedIn = () => useAppSelector(selectIsSignedIn);
const useIsSignedOut = () => !useAppSelector(selectIsSignedIn);

export const AppStack = createNativeStackNavigator({
  screenOptions: {
    headerBackImageSource: isAndroid ? images.chevron_left : undefined,
    headerShadowVisible: false,
    headerBackButtonDisplayMode: "minimal",
    headerTintColor: isAndroid ? palette.primary500 : undefined,
  },
  groups: {
    SignedIn: {
      if: useIsSignedIn,
      screens: {
        AppDrawer: {
          screen: AppDrawer,
          options: { headerShown: false },
        },
      },
    },
    SignedOut: {
      if: useIsSignedOut,
      screens: {
        SignIn: {
          screen: LoginScreen,
          options: { headerShown: false },
        },
        SignUp: {
          screen: SignUpScreen,
          options: {
            presentation: "modal",
            sheetAllowedDetents: "fitToContents",
            sheetGrabberVisible: true,
          },
        },
      },
    },
  },
  screens: {
    Language: LanguageScreen,
  },
});

export type AppStackParamList = StaticParamList<typeof AppStack>;

export type AppStackNavigationProps<T extends keyof AppStackParamList> =
  NativeStackNavigationProp<AppStackParamList, T>;

export function useAppNavigation<T extends keyof AppStackParamList>() {
  return useNavigation<AppStackNavigationProps<T>>();
}

declare global {
  namespace ReactNavigation {
    interface RootParamList extends AppStackParamList {}
  }
}
