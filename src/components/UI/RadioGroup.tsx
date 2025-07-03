import React from "react";
import { View, TouchableOpacity, Text, ViewStyle, TextStyle } from "react-native";
import clsx from "clsx";

type Option = {
  label: string;
  value: string;
};

interface RadioGroupProps {
  options: Option[];
  value: string;
  onChange: (val: string) => void;
  containerClassName?: string;
  optionClassName?: string;
  labelClassName?: string;
  circleClassName?: string;
  style?: ViewStyle;
  labelStyle?: TextStyle;
}

const RadioGroup: React.FC<RadioGroupProps> = ({
  options,
  value,
  onChange,
  containerClassName = "flex-row items-center justify-between w-[80%] space-x-5 mt-2 mb-4",
  optionClassName = "flex-row gap-2 items-center space-x-2",
  labelClassName = "",
  circleClassName = "w-5 h-5 rounded-full border",
  style,
  labelStyle,
}) => {
  return (
    <View className={containerClassName} style={style}>
      {options.map(opt => (
        <TouchableOpacity
          key={opt.value}
          onPress={() => onChange(opt.value)}
          className={optionClassName}
        >
          <View
            className={clsx(
              circleClassName,
              value === opt.value ? "bg-brownColor-400 border-brownColor-400" : "bg-grayColor-100 border-brownColor-400"
            )}
          />
          <Text className={labelClassName} style={labelStyle}>{opt.label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default RadioGroup;