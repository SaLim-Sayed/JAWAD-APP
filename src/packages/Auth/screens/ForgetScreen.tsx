import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';

import { Input } from '@/components';
import AppButton from '@/components/UI/AppButton';
import AppText from '@/components/UI/AppText';
import AuthWrapper from '@/components/UI/AuthWrapper';
import Col from '@/components/UI/Col';
import Or from '@/components/UI/Or';
import useGlobalNavigation from '@/provider/useGlobalNavigation';
import { useAuthStore } from '@/store/useAuthStore';

const loginSchema = z.object({
  phone: z.string().min(6, 'Phone number is required'),
});

type LoginSchema = z.infer<typeof loginSchema>;

const ForgetScreen = () => {
  const { navigate } = useGlobalNavigation();
  const { setActiveApp } = useAuthStore()

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      phone: '',
    },
  });

  const onSubmit = (data: LoginSchema) => {
    console.log('✅ Login Data:', data);
    navigate('otp')
  };

  return (
    <AuthWrapper>
      <Col className='mt-12' gap={16}>
        <Col gap={4}>
          <AppText className="text-brownColor-400 text-3xl font-bold mb-2">Don’t WORRY !</AppText>
          <AppText className="text-brownColor-400 mb-4">did you forgot your password?</AppText>
          <AppText className="text-brownColor-100 mb-4">Enter your Mobile number to get OPT Code.</AppText>
        </Col>
        <Controller
          control={control}
          name="phone"
          render={({ field: { onChange, value } }) => (
            <Input
              name='phone'
              control={control}
              label="Mobile Number"
              placeholder="Enter your phone number"
              keyboardType="phone-pad"
              className="bg-white p-3 rounded-xl border mt-1 mb-3"
              onChangeText={onChange}
              value={value}
              error={errors.phone?.message}
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
      </Col>
    </AuthWrapper>
  );
};

export default ForgetScreen;
