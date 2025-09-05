import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';

import AppButton from '@/components/UI/AppButton';
import AuthWrapper from '@/components/UI/AuthWrapper';
import Or from '@/components/UI/Or';
import Col from '@/components/UI/Col';
import OTPInput from '@/components/UI/OTPInput';
import AppText from '@/components/UI/AppText';
import useGlobalNavigation from '@/provider/useGlobalNavigation';
import { useAuthStore } from '@/store/useAuthStore';
import { navigationEnums } from '@/provider/navigationEnums';
import { View } from 'react-native';

const loginSchema = z.object({
  otp: z.string().min(4, 'OTP is required'),
});

type LoginSchema = z.infer<typeof loginSchema>;

const OtpScreen = () => {
  const { setActiveApp } = useAuthStore();
  const { navigate } = useGlobalNavigation();
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      otp: '',
    },
  });

  const onSubmit = (data: LoginSchema) => {
    console.log('✅ Login Data:', data);
    navigate(navigationEnums.CHANGE_PASSWORD_SCREEN)
    // You can call your verify function here
  };

  return (
    <AuthWrapper>
      <View className="mt-12" >
        <Col gap={4}>
          <AppText className="text-brownColor-400 text-3xl font-bold mb-2">OTP Verification</AppText>
          <AppText className="text-brownColor-100 mb-4">Your new password must be unique from those previously used.</AppText>
        </Col>

        {/* Controlled OTPInput with react-hook-form */}
        <Controller
          control={control}
          name="otp"
          render={({ field: { value, onChange } }) => (
            <OTPInput
              onVerify={onChange}
              onResend={() => {
                // handle resend logic here
                setValue('otp', '');  
              }}
              value={value}
              error={errors.otp?.message}
            />
          )}
        />

        <AppButton title="Next" onPress={handleSubmit(onSubmit)} />

        <Or />

        <AppButton
          title="Continue as Guest"
          variant="outline"
          onPress={() => setActiveApp("Client")}
        />
      </View>
    </AuthWrapper>
  );
};

export default OtpScreen;