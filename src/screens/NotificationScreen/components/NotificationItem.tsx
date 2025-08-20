import { Image, Pressable, View } from "react-native";
import { TNotification } from "..";
import React from "react";
import { palette, style } from "theme";
import { AppSizedBox, AppText } from "components";
import { formatAttendanceDate } from "utils";
import { STextStyle, SViewStyle } from "types";

type NotificationItemProps = {
  item: TNotification;
  index: number;
  onPress?: (item: TNotification, index: number) => void;
};

export const NotificationItem: React.FC<NotificationItemProps> = ({
  item,
  index,
  onPress,
  ...rest
}) => {
  const handlePress = () => {
    console.log("Pressed notification", item.id); // optional debug
    if (onPress) {
      onPress(item, index);
    }
  };
  return (
    <Pressable {...rest} onPress={handlePress}>
      <View style={[style.flex_1]}>
        <View style={$container}>
          <Image
            source={{ uri: item.avatar, cache: "force-cache" }}
            style={{
              width: 50,
              height: 50,
              borderRadius: 25,
            }}
            onError={(e) =>
              console.log("Image load error", e.nativeEvent.error)
            }
          />
          <View style={[style.ml_md]}>
            <AppText style={[style.tx_font_bold]}>{item.title}</AppText>
            <AppSizedBox height={10} />
            <AppText style={$content} ellipsizeMode="tail" numberOfLines={2}>
              {item.content}
            </AppText>
            <AppSizedBox height={10} />
            <AppText style={{ color: palette.error800 }}>
              {formatAttendanceDate(item.timestamp)}
            </AppText>
          </View>
        </View>
      </View>
    </Pressable>
  );
};

const $container: SViewStyle = [
  style.round_lg,
  style.w_full,
  style.pt_md,
  style.pb_md,
  style.row,
  style.align_center,
];
const $content: STextStyle = [style.tx_color_green600, style.tx_font_medium];
