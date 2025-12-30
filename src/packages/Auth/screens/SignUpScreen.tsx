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
    const { t } = useTranslation()
    const signUpSchema = z.object({
        name: z.string().min(3, t("signup.name_error")),
        // phone: z.string().min(6, 'Phone number required'),
        email: z.string().email(t("signup.email_error")),
        nationality: z.string().nonempty(t("signup.nationality_error")),
        password: z.string().min(8, t("signup.password_error")),
    });

    type SignUpForm = z.infer<typeof signUpSchema>;

    const { navigate } = useGlobalNavigation();
    const { setActiveApp, authData } = useAuthStore()

    const { mutate, isPending, error, data } = useApiMutation(
        {
            url: "/api/v1/auth/register",
            method: "post",
        }
    )
    const [showPassword, setShowPassword] = useState(false);
    const nationalityOptions = [
        { value: 'Foreign', label: t('Global.foreigner') },
        { value: 'Egyptian', label: t('Global.egyptian') },
    ];

    const { control, handleSubmit, setValue, watch } = useForm<SignUpForm>({
        resolver: zodResolver(signUpSchema),
        defaultValues: {
            name: '',
            // phone: '',
            email: '',
            nationality: 'Egyptian',
            password: '',
        },
    });


    const onSubmit = (formData: SignUpForm) => {
        mutate(formData, {
            onSuccess: (data) => {
                showGlobalToast({
                    type: "success",
                    title: "Sign Up Success",
                    body: data.message
                })
                navigate(navigationEnums.OTP_VERIFY_SCREEN, { email: formData.email })
            },
            onError: (error) => {
                showGlobalToast({
                    type: "error",
                    title: "Sign Up Failed",
                    body: error.response?.data?.message
                })
            }
        })
    };

    return (
        <AuthWrapper>

            <AppText className="text-brownColor-400 text-3xl font-bold mb-2">{t("signup.title")}</AppText>
            <AppText className="text-brownColor-300 mb-2">{t("signup.welcome")}</AppText>
            <AppText className="text-gray-500 mb-6">{t("signup.description")}</AppText>

            <Controller
                control={control}
                name="name"
                render={({ field: { onChange, value } }) => (
                    <Input
                        label={t("signup.name_label")}
                        name="name"
                        control={control}
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
                        placeholder={t("signup.email_placeholder")}
                        onChangeText={onChange}
                        value={value}
                    />
                )}
            />

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
                        placeholder={t("signup.password_placeholder")}
                        secureTextEntry={!showPassword}
                        onChangeText={onChange}
                        value={value}
                        name="password"
                        control={control}
                        label={t("signup.password_label")}
                        endIcon={<Image source={showPassword ? Icons.eye : Icons.eyeOff} style={{ width: 20, height: 20 }} tint={"#684735"} />}
                        onEndIconPress={() => setShowPassword((prev) => !prev)} />
                )}
            />

            <AppButton
                loading={isPending}
                title={t("signup.submit")}
                onPress={handleSubmit(onSubmit)}
                className="mt-2"
            />
            <Row className="justify-center gap-1 items-center mt-4">
                <AppText className="text-center text-gray-500">
                    {t("signup.already_have_account")}
                </AppText>
                <AppText className="text-brownColor-400 font-bold underline" onPress={() => navigate(navigationEnums.LOGIN_SCREEN, { role: authData.role })}>
                    {t("signup.login")}
                </AppText>
            </Row>

            <Or />

            <View className='flex-row w-full mb-4 justify-between items-center gap-4'>
                <AppButton
                    className='flex-1 bg-white border border-gray-200'
                    textClassName='text-gray-700'
                    title={t("signup.google")}
                    onPress={() => navigate(navigationEnums.LOGIN_SCREEN, { role: authData.role })}
                    startIcon={<Icons.google />}
                    variant="outline"
                />

                <AppButton
                    className='flex-1 bg-white border border-gray-200'
                    textClassName='text-gray-700'
                    title={t("apple")}
                    onPress={() => navigate(navigationEnums.LOGIN_SCREEN, { role: authData.role })}
                    startIcon={<Icons.apple />}
                    variant="outline"
                />
            </View>
            <AppButton
                title={t("signup.continue_guest")}
                variant="outline"
                onPress={() => setActiveApp("Client")}
                textClassName="text-brownColor-400"
            />
        </AuthWrapper>
    );
};