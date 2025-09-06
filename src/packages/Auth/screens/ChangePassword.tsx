import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Text, TouchableOpacity, View } from 'react-native';
import { z } from 'zod';

import { Input } from '@/components';
import AppButton from '@/components/UI/AppButton';
import AuthWrapper from '@/components/UI/AuthWrapper';
import Or from '@/components/UI/Or';
import Radio from '@/components/UI/Radio';
import { Icons } from '@/constants';
import useGlobalNavigation from '@/provider/useGlobalNavigation';
import { useAuthStore } from '@/store/useAuthStore';
import AppText from '@/components/UI/AppText';
import Image from '@/components/UI/Image';
import Row from '@/components/UI/Row';
import Col from '@/components/UI/Col';
import { navigationEnums } from '@/provider/navigationEnums';
const Schema = z
  .object({
    password: z.string().min(6, 'Password too short'),
    confirmPassword: z.string().min(6, 'Password too short'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ['confirmPassword'],  
  });

type Schema = z.infer<typeof Schema>;

const ChangePassword = () => {
  const { navigate } = useGlobalNavigation();
  const { setActiveApp } = useAuthStore()
  const [showPassword, setShowPassword] = useState(false);

  const [rememberMe, setRememberMe] = useState(false);
  const {
    control,
    handleSubmit,
  } = useForm<Schema>({
    mode: "onChange",
    resolver: zodResolver(Schema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = (data: Schema) => {
    console.log('✅ Login Data:', data);
    navigate(navigationEnums.CHANGE_PASSWORD_SUCCESS_SCREEN)
  };

  return (
    <AuthWrapper>
      <View className='mt-12' >
        <Col gap={4}>
          <AppText className="text-brownColor-400 text-3xl font-bold mb-2">Login</AppText>
          <AppText className="text-brownColor-400 mb-4">Welcome back! Please login to continue</AppText>
          <AppText className="text-brownColor-100 mb-4">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</AppText>
        </Col>
        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, value } }) => (
            <Input
              name='password'
              control={control}
              label="Password"
              placeholder="Enter your phone number"
              keyboardType="phone-pad"
              onChangeText={onChange}
              value={value}
            />
          )}
        />

        <Controller
          control={control}
          name="confirmPassword"
          render={({ field: { onChange, value } }) => (
            <Input
               placeholder="Enter Your Password"
              secureTextEntry={!showPassword}
              onChangeText={onChange}
              value={value}
              name="confirmPassword"
              control={control}
              label="Confirm Password"
              endIcon={<Image source={showPassword ? Icons.eye : Icons.eyeOff} style={{ width: 12, height: 12 }} tint={"#684735"} />}
              onEndIconPress={() => setShowPassword((prev) => !prev)}
            />
          )}
        />
        
        <AppButton title="Change Password" onPress={handleSubmit(onSubmit)} />

 
      </View>
    </AuthWrapper>
  );
};  

export default ChangePassword;
