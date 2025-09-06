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
import { View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useApiMutation } from '@/hooks';
import { apiKeys } from '@/hooks/apiKeys';
import { navigationEnums } from '@/provider/navigationEnums';
import { showGlobalToast } from '@/hooks/useGlobalToast';
 

const ForgetScreen = () => {
  const {t} = useTranslation()
  const loginSchema = z.object({
    email: z.string().email(t("Login.email_error")),
  });
  
  type LoginSchema = z.infer<typeof loginSchema>;
  
  const { navigate } = useGlobalNavigation();
  const { setActiveApp } = useAuthStore()
  const { mutate: sendCode, isPending } = useApiMutation({
    url: apiKeys.auth.sendCode,
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = (data: LoginSchema) => {
 
    sendCode({email:data.email}, {
      onSuccess: (d) => {showGlobalToast({type:"success",title:d?.message}); navigate(navigationEnums.OTP_SCREEN, {email:data.email})},
      onError: (error) => {showGlobalToast({type:"error",title:error?.response?.data?.message})},
    })
  };

  return (
    <AuthWrapper>
      <View className='mt-12 flex-1 w-full'>
        <Col gap={4}>
          <AppText className="text-brownColor-400 text-3xl font-bold mb-2">{t("auth.title")}</AppText>
          <AppText className="text-brownColor-400 mb-4">{t("auth.subtitle")}</AppText>
          <AppText className="text-brownColor-100 mb-4">{t("auth.instruction")}</AppText>
        </Col>
        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, value } }) => (
            <Input
              name='email'
              control={control}
              label={t("Login.email_label")}
              placeholder={t("Login.email_placeholder")}
              keyboardType="email-address"
              onChangeText={onChange}
              value={value}
             />
          )}
        />





        <AppButton loading={isPending} title={t("auth.next")} onPress={handleSubmit(onSubmit)} />


        <Or text={t("auth.or")} />


        <AppButton
          title={t("auth.guest")}
          variant="outline"
          onPress={() => setActiveApp("Client")}
        />
      </View>
    </AuthWrapper>
  );
};

export default ForgetScreen;
