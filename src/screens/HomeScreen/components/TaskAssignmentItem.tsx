import React, { useRef } from "react";
import { View, Pressable, StyleSheet } from "react-native";
import { Swipeable } from "react-native-gesture-handler";
import { TAssignment, TExam } from "..";
import { formatTimestamp } from "utils";
import { STextStyle } from "types";
import { style } from "theme";
import { AppText } from "components";

type TaskAssignmentItemProps = {
  item: TAssignment;
  index: number;
  onConfirmDone?: (item: TAssignment, onCloseSwipe: () => void) => void;
};

export const TaskAssignmentItem: React.FC<TaskAssignmentItemProps> = ({
  item,
  onConfirmDone,
}) => {
  const swipeRef = useRef<Swipeable>(null);

  const handleRightOpen = () => {
    const onCloseSwipe = () => swipeRef.current?.close();
    onConfirmDone?.(item, onCloseSwipe);
  };

  const renderRightActions = () => (
    <View style={[$actionContainer, $doneAction]}>
      <AppText style={$actionText}>Done</AppText>
    </View>
  );

  const backgroundColor = item.status === "done" ? "#d3ffd3" : "#fff";

  return (
    <Swipeable
      ref={swipeRef}
      renderRightActions={renderRightActions}
      overshootLeft={false}
      renderLeftActions={undefined}
      onSwipeableRightOpen={handleRightOpen}
    >
      <Pressable style={[$card, { backgroundColor }]} onPress={() => {}}>
        <View style={[style.row, style.justify_between]}>
          <AppText style={$title}>{item.subject}</AppText>
          <AppText style={$timestamps}>{formatTimestamp(item.dealine)}</AppText>
        </View>
        <AppText style={$content}>{item.description}</AppText>
      </Pressable>
    </Swipeable>
  );
};

const $actionContainer: STextStyle = [
  style.justify_center,
  style.align_center,
  { width: 100 },
];
const $doneAction: STextStyle = [{}];
const $actionText: STextStyle = [style.tx_color_black, style.tx_font_bold];

const $card: STextStyle = [
  style.p_sm,
  style.round_sm,
  style.self_start,
  style.shadow,
  {
    margin: 2,
    height: 100,
  },
];
const $title: STextStyle = [
  style.align_center,
  style.tx_size_md,
  style.tx_font_bold,
  style.mb_sm,
  style.tx_color_primary500,
];
const $timestamps: STextStyle = [
  style.align_center,
  style.tx_size_md,
  style.mb_sm,
  style.tx_color_gray600,
];
const $content: STextStyle = [style.tx_size_md];
