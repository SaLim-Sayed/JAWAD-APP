import React from "react";
import { View, ViewStyle } from "react-native";
import LinearGradient from "react-native-linear-gradient";

interface DividerProps {
  containerStyle?: ViewStyle;
  gradientColors?: string[];
}

const Divider: React.FC<DividerProps> = ({
  containerStyle,
  gradientColors = [
    "transparent",
    "#B27A32",
    "#826657",
    "#B27A32",
    "transparent",
  ],
}) => {
  return (
    <View className="flex-row justify-center items-center w-full" style={containerStyle}>
      <LinearGradient
        colors={gradientColors}
        start={{ x: 0, y: 0.5 }}
        end={{ x: 1, y: 0.5 }}
        className="h-px my-2 rounded-full flex-1"
      />

    </View>
  );
};

export default Divider;
