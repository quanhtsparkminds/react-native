import React from "react";
import { Modal, Pressable, StyleSheet, View, ViewStyle } from "react-native";
import { useModert } from "./ModertConfigs";
import { useAppTheme } from "provider";
import { hexToRgbA } from "utils";
import { AppButton } from "../AppButton";
import { spacing, style } from "theme";
import { STextStyle, SViewStyle } from "types";
import { AppText } from "../AppText";
import Animated, { Keyframe } from "react-native-reanimated";

const enteringKeyframes = new Keyframe({
  0: { opacity: 0.5, transform: [{ scale: 1.1 }] },
  100: { opacity: 1, transform: [{ scale: 1 }] },
}).duration(250);

export const Modert: React.FC = () => {
  const { modert, hide } = useModert();
  const appTheme = useAppTheme();

  return (
    <Modal
      visible={modert.visible}
      statusBarTranslucent
      transparent
      animationType="fade"
    >
      <View style={$root}>
        <Pressable
          onPress={modert.disabledBackdropPress ? undefined : hide}
          style={[$backdrop, { backgroundColor: hexToRgbA("#000", 0.2) }]}
        />
        <Animated.View
          entering={enteringKeyframes}
          style={[
            $content,
            {
              backgroundColor:
                appTheme.colorSchemeName === "dark" ? "black" : "white",
            },
          ]}
        >
          {Boolean(modert.title) && (
            <AppText style={$title}>{modert.title}</AppText>
          )}
          <AppText style={$message}>{modert.message}</AppText>
          <View style={$buttons}>
            {modert.buttons.map((item, key) => (
              <AppButton style={[$button, item.style]} {...item} key={key} />
            ))}
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
};

const $root: ViewStyle = {
  flex: 1,
  alignItems: "center",
  justifyContent: "center",
};

const $content: ViewStyle = {
  width: spacing.screenWidth * 0.8,
  borderRadius: style.inbut.borderRadius,
  padding: spacing.md,
  gap: spacing.md,
};

const $title: STextStyle = [style.tx_font_medium];
const $message: STextStyle = [style.opacity_7, style.tx_size_sm];

const $buttons: SViewStyle = [
  style.row,
  style.align_center,
  style.justify_end,
  style.gap_sm,
];

const $backdrop: ViewStyle = {
  ...StyleSheet.absoluteFillObject,
  zIndex: -1,
};

const buttonHeight = 28;
const $button: SViewStyle = [
  { height: buttonHeight, borderRadius: buttonHeight / 5 },
  style.px_md,
];
