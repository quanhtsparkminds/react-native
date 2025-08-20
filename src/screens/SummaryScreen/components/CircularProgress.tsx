import { AppText } from "components";
import React from "react";
import { AnimatedCircularProgress } from "react-native-circular-progress";

type CircularProgressProps = {
  fill: number;
  size: number;
  width: number;
  bgColor: string;
};

export const AttendanceCircularProgress: React.FC<CircularProgressProps> = ({
  fill,
  size,
  width,
  bgColor,
}) => {
  return (
    <AnimatedCircularProgress
      size={size}
      width={width}
      fill={fill}
      tintColor="#00e0ff"
      backgroundColor={bgColor}
      children={() => <AppText>{fill}%</AppText>}
    />
  );
};
