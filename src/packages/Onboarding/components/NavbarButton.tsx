import React, { JSX } from "react";
import { TouchableOpacity, View } from "react-native";
import AppText from "@/components/UI/AppText";

type NavButtonProps = {
  text: string;
  onPress: () => void;
  disabled?: boolean;
  iconLeft?: JSX.Element;
  iconRight?: JSX.Element;
};

export default function NavButton({
  text,
  onPress,
  disabled,
  iconLeft,
  iconRight,
}: NavButtonProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      className={`h-12 w-32 gap-4 rounded-full flex-row rtl:flex-row-reverse items-center justify-between bg-gray-100 ${
        disabled ? "opacity-0" : ""
      }`}
      activeOpacity={0.8}
    >
      {iconLeft}
      <AppText className="text-amber-950 px-3 tajawal-semibold font-medium">
        {text}
      </AppText>
      {iconRight}
    </TouchableOpacity>
  );
}