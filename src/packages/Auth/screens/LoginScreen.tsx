import { zodResolver } from '@hookform/resolvers/zod';
import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Linking, Text, TouchableOpacity, View } from 'react-native';
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
import CompleteModal from '@/components/UI/CompleteModal';
import { navigationEnums } from '@/provider/navigationEnums';
import { useTranslation } from 'react-i18next';
import { isRTL } from '@/provider/constant';
import messaging from '@react-native-firebase/messaging';
import { Platform } from 'react-native';
import { PermissionsAndroid } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = () => {
  const requestUserPermission = async () => {
    if (Platform.OS === "android") {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    }
    return true;
  };
  const getFcmToken = async () => {
    try {
      const authStatus = await messaging().requestPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;
  
      if (enabled) {
        const token = await messaging().getToken();
        console.log("✅ FCM TOKEN:", token);
        return token;
      } else {
        console.log("❌ Permission not granted for FCM");
        return null;
      }
    } catch (error) {
      console.log("🔥 Error fetching FCM token", error);
      return null;
    }
  };
  

  const { t } = useTranslation()

  const loginSchema = z.object({
    email: z.string().min(6, t("Login.email_error")),
    password: z.string().min(3, t("Login.password_error")),
  });

  type LoginSchema = z.infer<typeof loginSchema>;

  const { role } = useAppRouteParams("LOGIN_SCREEN")
  const url = `/api/v1/${role}/login`
  const { mutate, isPending, error, data, isSuccess } = useApiMutation(
    {
      url: url,
      method: "post",
    }
  )
  console.log({ error })
  const { navigate } = useGlobalNavigation();
  const { setActiveApp, setAuthData, authData } = useAuthStore()
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
  const [visible, setVisible] = useState(false)
  const onSubmit = async (formData: LoginSchema) => {
    const fcmToken = await AsyncStorage.getItem('fcmToken');
    console.log({ fcmToken })

    mutate(
      { 
        ...formData, 
        fcmToken 
      },
      {
        onSuccess: async (data) => {
          showGlobalToast({
            type: "success",
            title: "Login Success",
            body: data.message
          });
  
          setAuthData({
            token: data.token,
            role: role,
            id: data.id,
            isCompleted: data.isCompleted,
          });
          if (fcmToken) {
          const res=  await fetch("https://fcm.googleapis.com/fcm/send", {
              method: "POST",
              headers: {
                "Authorization": "key=YOUR_SERVER_KEY_HERE", 
                "Content-Type": "application/json"
              },
              body: JSON.stringify({
                to: fcmToken,
                notification: {
                  title: "Welcome Back 👋",
                  body: "You’ve successfully logged in!",
                },
                data: {
                  screen: "Home",
                }
              })
            });
            console.log({res})
          }
        },
        onError: (error: any) => {
          console.log({ error });
          if (error?.response?.status === 400) {
            if (authData.role === "photographer") {
              navigate(navigationEnums.COMPLETE_PHOTOGRAPHER, { id: error.response.data.id });
            } else if (authData.role === "school") {
              navigate(navigationEnums.COMPLETE_SCHOOL, { id: error.response.data.id });
            } else {
              navigate(navigationEnums.COMPLETE_STABLE, { id: error.response.data.id });
            }
          }
  
          showGlobalToast({
            type: "error",
            title: "Login Failed",
            body: error.response?.data?.message || "Something went wrong"
          });
        }
      }
    );
  };
  

  return (
    <AuthWrapper>

      <Col gap={4}>
        <AppText className="text-brownColor-400 text-3xl font-bold mb-2">{t("Login.title")}</AppText>
        <AppText className="text-brownColor-400 mb-4">{t("Login.welcome")}</AppText>
        <AppText className="text-brownColor-100 mb-4">{t("Login.subtitle")}</AppText>
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

      <Controller
        control={control}
        name="password"
        render={({ field: { onChange, value } }) => (
          <Input
             placeholder={t("Login.password_placeholder")}
            secureTextEntry={!showPassword}
            onChangeText={onChange}
            value={value}
            name="password"
            control={control}
             label={t("Login.password_label")}
            endIcon={<Image source={showPassword ? Icons.eye : Icons.eyeOff} style={{ width: 12, height: 12 }} tint={"#684735"} />}
            onEndIconPress={() => setShowPassword((prev) => !prev)}
          />
        )}
      />
      <Row className="justify-between items-center">
        {/* <Radio
          label={t("Login.remember_me")}
          value="remember"
          selected={rememberMe}
          onPress={() => setRememberMe((prev) => !prev)}
        /> */}
        {role === "auth" && <TouchableOpacity onPress={() => navigate('forget-password')}>
          <AppText className="text-brownColor-300 text-end">{t("Login.forgot_password")}</AppText>

        </TouchableOpacity>}
      </Row>
      <AppButton loading={isPending} title={t("Login.login_button")} onPress={handleSubmit(onSubmit)} />
      {role === "auth" && <>
        <Text className="text-center text-brownColor-400 mt-4">
          {t("Login.no_account")}{' '}
          <Text className="text-blue-600" onPress={() => navigate('signUp')}>
            {t("Login.sign_up")}
          </Text>
        </Text>

        <Or text={t("Login.or")} />

        <View className="flex-row w-full mb-3 justify-between items-center gap-4">
          <AppButton
            className="flex-1 bg-brownColor-50"
            textClassName="text-brownColor-400"
            title={t("Login.login_google")}
            onPress={() => { }}
            startIcon={<Icons.google />}
          />

          <AppButton
            className="flex-1 bg-brownColor-50"
            textClassName="text-brownColor-400"
            title={t("apple")}
            onPress={() => { }}
            startIcon={<Icons.apple />}
          />
        </View>
      </>}
      <AppButton
        title={t("Login.continue_guest")}
        variant="outline"
        onPress={() => setActiveApp("Client")}
      />

      {role !== "auth" && <View className="flex-col bg-orange-900/10 rounded-lg items-center mt-4">
        <Text className="text-brownColor-400 tajawal-semibold-16">
          {t("Login.to_sign_up")}
        </Text>
        <TouchableOpacity onPress={() => { Linking.openURL("mailto:Jawadmobapp@gmail.com") }}>
          <Text className="text-blue-700 tajawal-semibold-18 underline">
            Jawadmobapp@gmail.com</Text>
        </TouchableOpacity>
      </View>}
      <CompleteModal visible={visible} onClose={() => { setVisible(false) }} />

    </AuthWrapper>
  );
};

export default LoginScreen;
