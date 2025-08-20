import "i18n";

import { LoaderProvider } from "@baont97/rn-loader";
import { createStaticNavigation } from "@react-navigation/native";
import { QueryClientProvider } from "@tanstack/react-query";
import { ModertProvider } from "components/ui";
import { useQueryClient } from "hooks";
import { AppStack } from "navigators/AppStack";
import { AppThemeProvider, useAppTheme } from "provider";
import React from "react";
import BootSplash from "react-native-bootsplash";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { api } from "services";
import { persistor, store } from "store";
import { getReactNavigationTheme, style } from "theme";
import { secureStorage, StorageKeys } from "utils";

export const App = () => {
  const queryClient = useQueryClient();

  const boostrapAsync = async () => {
    // Retrieve tokens from secure storage
    const token = await secureStorage.getItem(StorageKeys.token);

    if (token) {
      // Setup API with tokens
      api.setup({ token, enableLogging: __DEV__ });
    }
  };

  return (
    <QueryClientProvider client={queryClient}>
      <AppThemeProvider>
        <GestureHandlerRootView style={style.flex_1}>
          <LoaderProvider>
            <Provider store={store}>
              <PersistGate persistor={persistor} onBeforeLift={boostrapAsync}>
                <ModertProvider>
                  <ThemedNavigation />
                </ModertProvider>
              </PersistGate>
            </Provider>
          </LoaderProvider>
        </GestureHandlerRootView>
      </AppThemeProvider>
    </QueryClientProvider>
  );
};

const RootNavigation = createStaticNavigation(AppStack);

const ThemedNavigation = () => {
  const appTheme = useAppTheme();
  const navTheme = getReactNavigationTheme(appTheme);

  return <RootNavigation onReady={() => BootSplash.hide()} theme={navTheme} />;
};
