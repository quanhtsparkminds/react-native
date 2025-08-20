import { images } from "@assets/index";
import React from "react";
import { Image, ImageProps } from "react-native";
import { KSpacing, spacing } from "theme";
import { TAppTheme, useAppTheme } from "provider";

type TSize = number | KSpacing;

export type AppIconProps = {
  name: keyof typeof images;
  size?: TSize;
  colorName?: keyof TAppTheme["colorScheme"];
} & ImageProps;

export const AppIcon = ({
  name,
  size = "md",
  colorName,
  tintColor,
  ...rest
}: AppIconProps) => {
  const { colorScheme } = useAppTheme();
  const realSize = typeof size === "number" ? size : spacing[size];
  const resolvedTintColor = tintColor || (colorName && colorScheme[colorName]) || colorScheme.onBackground;

  return (
    <Image
      {...(rest as ImageProps)}
      source={images[name as keyof typeof images]}
      style={[{ width: realSize, height: realSize , tintColor:resolvedTintColor }, rest.style]}
      tintColor={resolvedTintColor}
    />
  );
};
