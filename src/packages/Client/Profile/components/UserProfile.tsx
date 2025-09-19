import { images } from '@/assets/images';
import { Input } from '@/components';
import AppButton from '@/components/UI/AppButton';
import UserCard from '@/components/UI/UserCard';
import { navigationEnums } from '@/provider/navigationEnums';
import useGlobalNavigation from '@/provider/useGlobalNavigation';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { ScrollView, View } from 'react-native';
import { z } from 'zod';
import { useApiQuery } from '@/hooks/useApiQuery';
import { apiKeys } from '@/hooks/apiKeys';
import { useApiMutation } from '@/hooks';
import { showGlobalToast } from '@/hooks/useGlobalToast';
import { t } from '@/lib';
import AppSelect from '@/components/UI/AppSelect';

export const UserProfile = () => {
    const schema = z.object({
        username: z.string().optional(),
        nationality: z.string().nonempty(t("signup.nationality_error")),
    });
    type ProfileForm = z.infer<typeof schema>;

    const { navigate } = useGlobalNavigation();

    const { data: userDetails, isLoading } = useApiQuery({
        url: apiKeys.auth.getUserDetails,
        key: ["getUserDetails"],
    });
    const nationalityOptions = [
        { value: 'others', label: t("Global.others") },
        { value: 'Egyptian', label: t("Global.egyptian") },
    ];
    const { mutate, isPending } = useApiMutation({
        url: "/api/v1/user/update",
        method: "put",
    });

    const { control, handleSubmit, reset, setValue, watch } = useForm<ProfileForm>({
        resolver: zodResolver(schema),
        defaultValues: {
            username: '',
            nationality: '',
        },
    });

    // لما يوصلك userDetails اعمل reset للقيم
    useEffect(() => {
        if (userDetails?.details) {
            reset({
                username: userDetails.details.name,
                nationality: userDetails.details.nationality ?? '',
            });
        }
    }, [userDetails, reset]);

    const onSubmit = (formData: ProfileForm) => {
        mutate(formData, {
            onSuccess: (data) => {
                console.log("✅ update response:", data);
                showGlobalToast({
                  type: "success",
                  title: "",
                  body: data?.message || JSON.stringify(data),
                });
                navigate(navigationEnums.PROFILE);
              },
              
            onError: (error) => {
                showGlobalToast({
                    type: "error",
                    title: t("profile.update_failed_title"),
                    body: error.response?.data?.message,
                });
            },
        });
    };

    return (
        <View className="flex-1 mt-10 bg-transparent">
            <ScrollView
                className="flex-1 w-full"
                contentContainerStyle={{ paddingHorizontal: 16, gap: 16 }}
                keyboardShouldPersistTaps="handled"
            >
                <UserCard
                    role="User"
                    name={userDetails?.details?.name}
                    phone={userDetails?.details?.email}
                    avatar={images.family}
                />

                <Controller
                    control={control}
                    name="username"
                    render={({ field: { onChange, value } }) => (
                        <Input
                            control={control}
                            name="username"
                            label={t("profile.username")}
                            placeholder={t("profile.username_placeholder")}
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

                <AppButton
                    loading={isPending}
                    title={t("profile.submit")}
                    onPress={handleSubmit(onSubmit)}
                />
            </ScrollView>
        </View>
    );
};
