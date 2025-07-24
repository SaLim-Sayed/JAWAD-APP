import React from "react";
import { Controller, Control } from "react-hook-form";
import {
  Text,
  TextInput,
  TextInputProps,
  View,
  TouchableOpacity,
} from "react-native";
import AppText from "./AppText";
import { isRTL } from "@/provider/constant";
 
interface InputProps extends TextInputProps {
  label: string;
  name: string;
  control: Control<any>;
  error?: string;
  secureTextEntry?: boolean;
  endIcon?: React.ReactNode;
  dir?: "rtl" | "ltr";
  onEndIconPress?: () => void;
}

export const Input: React.FC<InputProps> = ({
  label,
  name,
  control,
  error,
  secureTextEntry,
  endIcon,
  numberOfLines,
  dir="ltr",
  onEndIconPress,
  ...rest
}) => {
  return (
    <View className="w-full">
      <AppText className="text-brownColor-400 mb-2">{label}</AppText>
      <View  className="relative  ">
        <Controller
          control={control}
          name={name}
          render={({ field: { onChange, value }, formState: { errors } }) => (
            <>
              <TextInput
                className="flex-1 w-full rounded-xl border border-brownColor-400 p-3"
                placeholder={label}
                placeholderTextColor="#888"
                onChangeText={onChange}
                value={value}
                secureTextEntry={secureTextEntry}
                style={{
                  color: "#684735",
                  fontSize: 16,
                  fontFamily: "Poppins_400Regular",
                  borderWidth: 1,
                  borderColor: "#684735",
                  borderRadius: 10,
                  flex: 1,
                  textAlign: dir === "rtl" ? "right" :  undefined,
                  width: "100%",
                }}
                numberOfLines={numberOfLines}
                {...rest}
              />
              {errors[name] && (
                <Text className="text-red-500 mt-1">{errors[name].message as string}</Text>
              )}
            </>
          )}
        />
        {endIcon && (
          <TouchableOpacity className="absolute right-6 top-4" onPress={onEndIconPress}>
            {endIcon}
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};
