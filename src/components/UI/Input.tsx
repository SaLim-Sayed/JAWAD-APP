import React from "react";
import { Controller, Control } from "react-hook-form";
import { Text, View, TouchableOpacity } from "react-native";
import { TextInput, TextInputProps } from "react-native-paper";
import AppText from "./AppText";

interface InputProps extends Omit<TextInputProps, "theme"> {
  label?: string;
  name: string;
  control: Control<any>;
  secureTextEntry?: boolean;
  endIcon?: React.ReactNode;
  onEndIconPress?: () => void;
}

export const Input: React.FC<InputProps> = ({
  label,
  name,
  control,
  secureTextEntry,
  endIcon,
  onEndIconPress,
  ...rest
}) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value }, formState: { errors } }) => (
        <View style={{ marginBottom: 16 }}>
          <AppText className="text-brownColor-400 mb-3">{label}</AppText>

          <TextInput
            mode="outlined"
            value={value}
          
            onChangeText={onChange}
            secureTextEntry={secureTextEntry}
            error={!!errors[name]}
            right={
              endIcon ? (
                <TextInput.Icon icon={() => endIcon} onPress={onEndIconPress} />
              ) : undefined
            }
            textColor='black'
             theme={{
              roundness: 10,
              colors: {
                primary: "black",
                background: "#1D2027",
                text: "black",
              },
              
            }}
            placeholderTextColor={'#bbb'}
            style={{ backgroundColor: "#fff", height: 50 }}
            {...rest} 
          />

          {errors[name] && (
            <Text className="text-red-500 mt-1">
              {errors[name]?.message as string}
            </Text>
          )}
        </View>
      )}
    />
  );
};
