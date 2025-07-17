import { zodResolver } from '@hookform/resolvers/zod';
import React, { useEffect, useState } from 'react';
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
import { useApiMutation } from '@/hooks';
import { showGlobalToast } from '@/hooks/useGlobalToast';
import useAppRouteParams from '@/provider/useAppRouteParams';
const loginSchema = z.object({
  email: z.string().min(6, 'Email is required'),
  password: z.string().min(4, 'Password too short'),
});

type LoginSchema = z.infer<typeof loginSchema>;

const LoginScreen = () => {
  const { role } = useAppRouteParams("LOGIN_SCREEN")
  const url = `/api/v1/${role}/login`
  const { mutate, isPending, error, data, isSuccess } = useApiMutation(
    {
      url: url,
      method: "post",
    }
  )
  const { navigate } = useGlobalNavigation();
  const { setActiveApp, setAuthData } = useAuthStore()
  const [showPassword, setShowPassword] = useState(false);

  const [rememberMe, setRememberMe] = useState(false);
  const {
    control,
    handleSubmit,
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });
  console.log({data})

  const onSubmit = (formData: LoginSchema) => {
    mutate(formData, {
      onSuccess: (data) => {
        showGlobalToast({
          type: "success",
          title: "Login Success",
          body: data.message
        })
        setAuthData({
          token: data.token,
          role: role,
          id: data.id,
          isCompleted: data.isCompleted,
        })
        // setActiveApp("Client")
      },
      onError: (error) => {
        showGlobalToast({
          type: "error",
          title: "Login Failed",
          body: error.message
        })
      }
    })

  };

  return (
    <AuthWrapper>

      <Col gap={4}>
        <AppText className="text-brownColor-400 text-3xl font-bold mb-2">Login</AppText>
        <AppText className="text-brownColor-400 mb-4">Welcome back! Please login to continue</AppText>
        <AppText className="text-brownColor-100 mb-4">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</AppText>
      </Col>
      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, value } }) => (
          <Input
            name='email'
            control={control}
            label="Email"
            placeholder="Enter your email"
            keyboardType="email-address"
            className="bg-white p-3 rounded-xl border mt-1 mb-3"
            onChangeText={onChange}
            value={value}
          />
        )}
      />

      <Controller
        control={control}
        name="password"
        render={({ field: { onChange, value } }) => (
          <Input
            className="bg-white p-3 rounded-xl border mt-1 mb-3"
            placeholder="Enter Your Password"
            secureTextEntry={!showPassword}
            onChangeText={onChange}
            value={value}
            name="password"
            control={control}
            label="Password"
            endIcon={<Image source={showPassword ? Icons.eye : Icons.eyeOff} style={{ width: 12, height: 12 }} tint={"#684735"} />}
            onEndIconPress={() => setShowPassword((prev) => !prev)}
          />
        )}
      />
      <Row className="justify-between items-center">
        <Radio
          label="Remember me"
          value="remember"
          selected={rememberMe}
          onPress={() => setRememberMe((prev) => !prev)}
        />
        {role === "auth" && <TouchableOpacity onPress={() => navigate('forget-password')}>
          <AppText className="text-brownColor-300 text-sm">Forgot Password?</AppText>

        </TouchableOpacity>}
      </Row>
      <AppButton loading={isPending} title="Login" onPress={handleSubmit(onSubmit)} />
      {role === "auth" &&  <>
        <Text className="text-center text-brownColor-400 mt-4">
          Don't have an account ?{' '}
          <Text className="text-brownColor-300" onPress={() => navigate('signUp')}>
            Sign up
          </Text>
        </Text>

        <Or />

        <View className="flex-row w-full mb-3 justify-between items-center gap-4">
          <AppButton
            className="flex-1 bg-brownColor-50"
            textClassName="text-brownColor-400"
            title="Google"
            onPress={() => { }}
            startIcon={<Icons.google />}
          />
          <AppButton
            className="w-12 h-12 bg-brownColor-50 items-center justify-center"
            onPress={() => { }}
            startIcon={<Icons.facebook />}
          />
          <AppButton
            className="w-12 h-12 bg-brownColor-50 items-center justify-center"
            onPress={() => { }}
            startIcon={<Icons.apple />}
          />
        </View>
      </>}
      <AppButton
        title="Continue as Guest"
        variant="outline"
        onPress={() => setActiveApp("Client")}
      />
    </AuthWrapper>
  );
};

export default LoginScreen;
