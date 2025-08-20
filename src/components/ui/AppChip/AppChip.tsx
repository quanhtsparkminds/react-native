import React from "react";
import { View } from "react-native";
import { style } from "theme";
import { STextStyle, SViewStyle } from "types";
import { hexToRgbA } from "utils";
import { AppText } from "../AppText";

type AppChipProps = {
  label: string;
  color: string;
};

export const AppChip: React.FC<AppChipProps> = ({ label, color }) => {
  return (
    <View style={[$chip, { backgroundColor: hexToRgbA(color, 0.1) }]}>
      <AppText style={[$text, { color }]}>{label}</AppText>
    </View>
  );
};

const $chip: SViewStyle = [
  style.px_xs,
  style.py_xxxs,
  style.round_xxs,
  style.align_center,
];

const $text: STextStyle = [style.tx_size_sm, style.tx_font_medium];
