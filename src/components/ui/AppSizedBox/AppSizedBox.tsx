import React from "react";
import { View } from "react-native";

export const AppSizedBox = ({
  width,
  height,
}: {
  width?: number;
  height?: number;
}) => {
  return <View style={{ width, height }} />;
};
