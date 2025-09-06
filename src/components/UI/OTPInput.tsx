import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import OtpInputs from 'react-native-otp-inputs';
import AppText from './AppText';

interface OTPInputProps {
  onVerify: (code: string) => void;
  onResend?: () => void;
  value?: string;
  error?: string;
  className?: string;
  containerClassName?: string;
}

export default function OTPInput({

  onVerify,
  onResend,
  value = '',
  error,
  className = "",
  containerClassName = "",
}: OTPInputProps) {
  return (
    <View className={`w-full items-center justify-center ${containerClassName}`}>
      <View className={` relative py-6 rounded-xl w-full max-w-md ${className}`}>
        <OtpInputs
          numberOfInputs={6}
          autofillFromClipboard
          keyboardType="phone-pad"
          inputContainerStyles={{
            borderColor:"#000",
            borderWidth: 1,
            borderRadius: 10,
            marginHorizontal: 2,
 
          }}
          
          isRTL={false}
          inputStyles={{
            width: 50,
            height: 50,
            textAlign: 'center',
            borderRadius: 8,
            fontSize: 18,
            color: "#000",
          }}
          focusStyles={{
            borderLeftColor: "#1C57D4",
            borderRightColor: "#9C09CF",
            borderTopColor: "#1C57D4",
            borderBottomColor: "#9C09CF",
            borderWidth: 2,
            borderRadius: 10,
          }}
          handleChange={(code) => {
            onVerify(code);
          }}
        />



        {error ? (
          <AppText className="text-red-500 text-start mt-2">{error}</AppText>
        ) : null}
        
      </View>
    </View>
  );
}