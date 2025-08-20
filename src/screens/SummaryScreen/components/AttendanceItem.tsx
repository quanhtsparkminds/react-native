import { AppText } from "components";
import { View } from "react-native";
import { style } from "theme";
import { formatAttendanceDate } from "utils";
import { TAttendances } from "..";
import React from "react";
import { STextStyle } from "types";

type AttendanceProps = {
  data: TAttendances;
  index: number;
};

export const AttendanceItem: React.FC<AttendanceProps> = ({ data, index }) => {
  return (
    <View style={[style.row, style.pb_sm]}>
      <AppText
        style={[style.flex_3, $text, { textAlign: "left" }]}
        numberOfLines={1}
        ellipsizeMode="tail"
      >
        {formatAttendanceDate(data.timestemp)}
      </AppText>
      <AppText
        style={[style.flex_3, $text, { textAlign: "left" }]}
        numberOfLines={1}
        ellipsizeMode="tail"
      >
        {data.subject}
      </AppText>
      <AppText
        style={[style.flex_3, $text, { textAlign: "left" }]}
        numberOfLines={1}
        ellipsizeMode="tail"
      >
        {data.reason}
      </AppText>
    </View>
  );
};
const $text: STextStyle = [style.tx_size_md, style.tx_font_italic];
