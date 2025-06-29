import { cn } from "@/lib";
import React from "react";
import { View, ViewStyle } from "react-native";
import LinearGradient from "react-native-linear-gradient";

interface DividerProps {
  containerStyle?: ViewStyle;
  className?: string;
  gradientColors?: string[];
}

const Divider: React.FC<DividerProps> = ({
  containerStyle,
  className,
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
        className={cn("h-px my-2 rounded-full flex-1",  className)}
      />

    </View>
  );
};

export default Divider;
