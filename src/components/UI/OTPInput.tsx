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
      <View className={` relative p-6 rounded-xl w-full max-w-md ${className}`}>
        <OtpInputs
          numberOfInputs={4}
          autofillFromClipboard
          keyboardType="phone-pad"
          isRTL={false}
          inputStyles={{
            borderWidth: 1,
            borderColor: "#684735",
            width: 58,
            height: 64,
            textAlign: 'center',
            borderRadius: 8,
            fontSize: 18,
            color: "#000",
          }}
          focusStyles={{
            borderColor: "#684735",
            borderWidth: 1,
            borderRadius: 10,
          }}
          handleChange={(code) => {
            onVerify(code); 
          }}
        />



        {error ? (
          <AppText className="text-red-500 text-start mt-2">{error}</AppText>
        ) : null}
        <View className="flex-row items-center my-4 justify-center">
          <AppText className='text-center text-gray-400'>Don’t Receive the Code? </AppText>
          <TouchableOpacity onPress={onResend}>
            <AppText className="text-mainColor font-bold"> Resend</AppText>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}