import React from "react";
import { Text, View, ViewStyle, TextStyle } from "react-native";
import LinearGradient from "react-native-linear-gradient";

interface OrProps {
  text?: string;
  containerStyle?: ViewStyle;
  textStyle?: TextStyle;
  gradientColors?: string[];
}

const Or: React.FC<OrProps> = ({
  text = "or",
  containerStyle,
  textStyle,
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
        className="h-1 rounded-full flex-1"
      />
      <Text className="mx-2 text-base text-[#826657]" style={textStyle}>
        {text}
      </Text>
      <LinearGradient
        colors={gradientColors}
        start={{ x: 0, y: 0.5 }}
        end={{ x: 1, y: 0.5 }}
        className="h-1 rounded-full flex-1"
      />
    </View>
  );
};

export default Or;
