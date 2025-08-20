import { AppText, Loader, useModert } from "components";
import React, { useEffect, useState } from "react";
import { FlatList, View } from "react-native";
import { style } from "theme";
import { STextStyle } from "types";
import { Notifications, TNotification } from "./Notification.types";
import { NotificationItem } from "./components/NotificationItem";

type DataState = {
  data: TNotification[];
  isLoading: boolean;
};

export const NotificationScreen = () => {
  const modal = useModert();
  const [state, setState] = useState<DataState>({
    data: [],
    isLoading: true,
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setState({
        data: Notifications,
        isLoading: false,
      });
    }, 1000);

    return () => clearTimeout(timer);
  }, []);
  const detailsPressed = () => {
    modal.show({
      title: "Information",
      message: "Please contact customer service!",
    });
  };

  const renderSeparator = () => (
    <View style={{ height: 1, backgroundColor: "#ddd" }} />
  );
  return state.isLoading ? (
    <Loader />
  ) : (
    <View style={[style.p_md, { flex: 1 }]}>
      <View>
        <AppText style={$title}>Notification</AppText>
      </View>
      <FlatList
        data={state.data}
        renderItem={({ item, index }) => (
          <NotificationItem
            item={item}
            index={index}
            onPress={detailsPressed}
          />
        )}
        ItemSeparatorComponent={renderSeparator}
        keyExtractor={(item, index) => `${item.id}-${index}`}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};
const $title: STextStyle = [style.tx_size_xl, style.tx_font_bold];
