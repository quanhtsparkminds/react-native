import { palette, style } from "theme";
import { TScoreSubject } from "..";
import { Image, View } from "react-native";
import React from "react";
import { AppText } from "components";
import { images } from "@assets/index";

type RecentScoreProps = {
  item: TScoreSubject;
  index: number;
};

export const RecentScoreItem: React.FC<RecentScoreProps> = ({
  item,
  index,
}) => {
  const colors = [palette.green50, palette.gray100, palette.primary50];
  const backgroundColor = colors[index % colors.length];
  return (
    <View
      style={[
        style.shadow,
        style.p_md,
        style.round_xs,
        style.w_full,
        {
          backgroundColor: backgroundColor,
        },
      ]}
    >
      <View style={[style.row, style.align_center]}>
        {/* <AppIcon name={item.icon} size={30} /> */}
        <Image source={images[item.icon]} style={{ width: 30, height: 30 }} />
        <AppText style={[style.ml_md]}>Mathematics</AppText>
      </View>
      <AppText style={[style.tx_font_bold, style.pt_sm, style.tx_size_md]}>
        {item.score}/{item.maxScore}
      </AppText>
    </View>
  );
};
