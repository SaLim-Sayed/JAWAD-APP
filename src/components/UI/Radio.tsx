import React from "react";
import {
  TouchableOpacity,
  Text,
  View,
  ViewStyle,
  TextStyle,
} from "react-native";
import clsx from "clsx";

interface RadioProps {
  label: string;
  value: string;
  selected: boolean;
  onPress: (value: string) => void;
  containerClassName?: string;
  circleClassName?: string;
  labelClassName?: string;
  style?: ViewStyle;
  labelStyle?: TextStyle;
}

const Radio: React.FC<RadioProps> = ({
  label,
  value,
  selected,
  onPress,
  containerClassName = "flex-row items-center my-4  gap-2",
  circleClassName = "w-5 h-5 rounded-full border border-brownColor-400 items-center justify-center",
  labelClassName = "text-gray-800",
  style,
  labelStyle,
}) => {
  return (
    <TouchableOpacity
      className={containerClassName}
      onPress={() => onPress(value)}
      style={style}
    >
      <View className={clsx(circleClassName, selected && "bg-yellowColor-300 ")}/>
      <Text className={labelClassName} style={labelStyle}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

export default Radio;
