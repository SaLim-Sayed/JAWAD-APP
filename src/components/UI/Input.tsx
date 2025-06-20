import React from "react";
import { Controller, Control } from "react-hook-form";
import { Text, TextInput, TextInputProps } from "react-native";
import { LoginFormType } from "../Login/types/schema";
import AppText from "./AppText";
 
interface InputProps extends TextInputProps {
  label: string;
  name: keyof LoginFormType;
  control: Control<LoginFormType>;
  error?: string;
  secureTextEntry?: boolean;
}

export const Input: React.FC<InputProps> = ({
  label,
  name,
  control,
  error,
  secureTextEntry,
  ...rest
}) => (
  <>
    <AppText className="text-white mb-2">{label}</AppText>
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value } }) => (
        <TextInput
          className="bg-[#1c2536] text-white p-3 rounded-md border border-gray-600 mb-3"
          placeholder={label}
          placeholderTextColor="#999"
          onChangeText={onChange}
          value={value}
          secureTextEntry={secureTextEntry}
          {...rest}
        />
      )}
    />
    {error && <Text className="text-red-500 mb-2">{error}</Text>}
  </>
);