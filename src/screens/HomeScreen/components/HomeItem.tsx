import React from "react";
import { AppText } from "components/ui";
import { STextStyle } from "types";
import { Pressable } from "react-native";
import { style } from "theme";
import { TExam } from "..";

type HomeItemProps = {
  item: TExam;
  index: number;
};

export const HomeItem: React.FC<HomeItemProps> = ({ item, index }) => {
  const backgroundColor = index % 2 === 0 ? "#E6F0FF" : "#E6FFF0";
  return (
    <Pressable style={[$card, { backgroundColor }]} onPress={() => {}}>
      <AppText style={$title}>{item.title}</AppText>
      <AppText style={$content}>{item.content}</AppText>
    </Pressable>
  );
};
const $card: STextStyle = [
  style.mr_sm,
  style.p_sm,
  style.round_md,
  style.self_start,
  {
    width: 200,
    height: 150,
  },
];
const $title: STextStyle = [
  style.align_center,
  style.tx_font_bold,
  style.mb_sm,
];
const $content: STextStyle = [style.tx_size_md];
