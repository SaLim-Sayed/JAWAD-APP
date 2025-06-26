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

interface InputProps extends TextInputProps {
  label: string;
  name: string;
  control: Control<any>;
  error?: string;
  secureTextEntry?: boolean;
  endIcon?: React.ReactNode;
  onEndIconPress?: () => void;
}

export const Input: React.FC<InputProps> = ({
  label,
  name,
  control,
  error,
  secureTextEntry,
  endIcon,
  onEndIconPress,
  ...rest
}) => {

  return (
    <>
      <AppText className="text-brownColor-400 mb-2">{label}</AppText>
      <View className=" relative    w-full ">
        <Controller
          control={control}
          name={name}
          render={({ field: { onChange, value }, formState: { errors } }) => (
            <>
              <TextInput
                className="flex-1 w-full"
                placeholder={label}
                placeholderTextColor="#888"
                onChangeText={onChange}
                value={value}
                secureTextEntry={secureTextEntry}
                style={{ color: "#684735" }}
                {...rest}
              />
              {errors[name] && (
                <Text className="text-red-500 mb-2">{errors[name].message as string}</Text>
              )}            </>
          )}
        />
        {endIcon && (
          <TouchableOpacity className="absolute right-4 top-4" onPress={onEndIconPress}>
            {endIcon}
          </TouchableOpacity>
        )}
      </View>
    </>
  );
};
