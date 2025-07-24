import { images } from '@/assets/images';
import { Input } from '@/components';
import AppButton from '@/components/UI/AppButton';
import AppSelect from '@/components/UI/AppSelect';
import AuthWrapper from '@/components/UI/AuthWrapper';
import Or from '@/components/UI/Or';
import RadioGroup from '@/components/UI/RadioGroup';
import { Icons } from '@/constants';
import useGlobalNavigation from '@/provider/useGlobalNavigation';
import { useAuthStore } from '@/store/useAuthStore';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import AppText from '@/components/UI/AppText';
import { z } from 'zod';
import { Text, View } from 'react-native';
import Row from '@/components/UI/Row';
import { navigationEnums } from '@/provider/navigationEnums';
import { useApiMutation } from '@/hooks';
import { showGlobalToast } from '@/hooks/useGlobalToast';
import { useTranslation } from 'react-i18next';
import Image from '@/components/UI/Image';
import { isRTL } from '@/provider/constant';

export const SignUpScreen = () => {
    const {t} = useTranslation()
    const signUpSchema = z.object({
        name: z.string().min(3, t("signup.name_error")),
        // phone: z.string().min(6, 'Phone number required'),
        email: z.string().email(t("signup.email_error")),
        nationality: z.string().nonempty(t("signup.nationality_error")),
        password: z.string().min(6, t("signup.password_error")),
        gender: z.enum(['male', 'female']),
    });
    
    type SignUpForm = z.infer<typeof signUpSchema>;
    
    const { navigate } = useGlobalNavigation();
    const { setActiveApp ,authData} = useAuthStore()

    const { mutate, isPending, error, data } = useApiMutation(
        {
            url: "/api/v1/auth/register",
            method: "post",
        }
    )
    const [showPassword, setShowPassword] = useState(false);
    const nationalityOptions = [
        { value: 'American', label: 'American', icon: images.en },
        { value: 'Egyptian', label: 'مصري', icon: images.ar },
    ];

    const { control, handleSubmit, setValue, watch } = useForm<SignUpForm>({
        resolver: zodResolver(signUpSchema),
        defaultValues: {
            name: '',
            // phone: '',
            email: '',
            nationality: 'American',
            password: '',
            gender: 'male',
        },
    });
    const gender = watch("gender");


    const onSubmit = (formData: SignUpForm) => {
         mutate(formData, {
            onSuccess: (data) => {
                showGlobalToast({
                    type: "success",
                    title: "Sign Up Success",
                    body: data.message
                })
                navigate(navigationEnums.LOGIN_SCREEN,{role:authData.role})
            },
            onError: (error) => {
                showGlobalToast({
                    type: "error",
                    title: "Sign Up Failed",
                    body: error.message
                })
            }
        })
    };

    return (
        <AuthWrapper>

            <AppText className="text-brownColor-400 text-3xl font-bold mb-2">{t("signup.title")}</AppText>
            <AppText className="text-brownColor-300 mb-4">{t("signup.welcome")}</AppText>
            <AppText className="text-brownColor-40 mb-4">{t("signup.description")}</AppText>

            <Controller
                control={control}
                name="name"
                render={({ field: { onChange, value } }) => (
                    <Input
                        label={t("signup.name_label")}
                        name="name"
                        control={control}
                        className="bg-white p-3 rounded-xl border mt-1 mb-3"
                        placeholder={t("signup.name_placeholder")}
                        onChangeText={onChange}
                        value={value}
                    />
                )}
            />

            <Controller
                control={control}
                name="email"
                render={({ field: { onChange, value } }) => (
                    <Input
                        label={t("signup.email_label")}
                        name="email"
                        control={control}
                        className="bg-white p-3 rounded-xl border mt-1 mb-3"
                        placeholder={t("signup.email_placeholder")}
                        onChangeText={onChange}
                        value={value}
                    />
                )}
            />

            {/* <Controller
                control={control}
                name="phone"
                render={({ field: { onChange, value } }) => (
                    <Input
                        label="Mobile Number"
                        name="phone"
                        control={control}
                        className="bg-white p-3 rounded-xl border mt-1 mb-3"
                        placeholder="Enter Your Mobile Number"
                        keyboardType="phone-pad"
                        onChangeText={onChange}
                        value={value}
                    />
                )}
            /> */}

            <Controller
                control={control}
                name="nationality"
                render={({ field: { onChange, value } }) => (
                    <AppSelect
                        label={t("signup.nationality_label")}
                        options={nationalityOptions}
                        value={watch('nationality')}
                        dropdownWidth={"75%"}
                        onChange={(val) => setValue('nationality', val)}
                    />
                )}
            />

            <Controller
                control={control}
                name="password"
                render={({ field: { onChange, value } }) => (
                    <Input
                        className="bg-white p-3 rounded-xl border mt-1 mb-3"
                        placeholder={t("signup.password_placeholder")}
                        secureTextEntry={!showPassword}
                        onChangeText={onChange}
                        value={value}
                        name="password"
                        control={control}
                        dir={isRTL ? "rtl" : "ltr"}
                        label={t("signup.password_label")}
                        endIcon={<Image source={showPassword ? Icons.eye : Icons.eyeOff} style={{ width: 12, height: 12 }} tint={"#684735"} />}
                        onEndIconPress={() => setShowPassword((prev) => !prev)}                      />
                )}
            />


            {/* <RadioGroup
                options={[
                    { label: "Male", value: "male" },
                    { label: "Female", value: "female" },
                ]}
                value={gender}
                onChange={(val: any) => setValue("gender", val)}
            /> */}

            <AppButton
            loading={isPending}
                title={t("signup.submit")}
                onPress={handleSubmit(onSubmit)}
            />
            <Row>
                <AppText className="text-center text-brownColor-400 mt-4">
                    {t("signup.already_have_account")}

                </AppText>
                <AppText className="text-brownColor-400" onPress={() => navigate(navigationEnums.LOGIN_SCREEN,{role:authData.role})}>
                    {t("signup.login")}
                </AppText>
            </Row>

            <Or />

            <View className='flex-row w-full mb-3 justify-between items-center gap-4'>
                <AppButton
                    className='w-[50%] bg-brownColor-50'
                    textClassName='text-brownColor-400'
                    title={t("signup.google")}
                    onPress={() => navigate(navigationEnums.LOGIN_SCREEN,{role:authData.role})}
                    startIcon={<Icons.google />}
                />
                <AppButton
                    className='w-[10%]  bg-brownColor-50'
                    textClassName='text-brownColor-400'

                    onPress={() => navigate(navigationEnums.LOGIN_SCREEN,{role:authData.role})}
                    startIcon={<Icons.facebook />}
                />
                <AppButton
                    className='w-[10%] bg-brownColor-50 text-brownColor-400'
                    textClassName='text-brownColor-400'
                    onPress={() => navigate(navigationEnums.LOGIN_SCREEN,{role:authData.role})}
                    startIcon={<Icons.apple />}
                />
            </View>
            <AppButton
                title={t("signup.continue_guest")}
                variant="outline"
                onPress={() => setActiveApp("Client")}
            />
        </AuthWrapper>
    );
};