import React, { JSX } from "react";
import { TouchableOpacity, View } from "react-native";
import AppText from "@/components/UI/AppText";

type NavButtonProps = {

  text: string;
  onPress: () => void;
  disabled?: boolean;
  iconLeft?: JSX.Element;
  iconRight?: JSX.Element;
  className?: string;
};

export default function NavButton({

  text,
  onPress,
  disabled,
  iconLeft,
  iconRight,
  className,
}: NavButtonProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      className={`h-12 w-32 rounded-full flex-row rtl:flex-row-reverse items-center justify-between bg-gray-100 ${disabled ? "opacity-0" : ""
        } ${className}`}
      activeOpacity={0.8}
    >
      <View>{iconLeft}</View>
      <AppText className="text-amber-950 pl-2 pr-2  tajawal-semibold font-medium">
        {text}
      </AppText>
      <View>{iconRight}</View>
    </TouchableOpacity>
  );
}