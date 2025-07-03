import { Input } from '@/components';
import AppButton from '@/components/UI/AppButton';
import { navigationEnums } from '@/provider/navigationEnums';
import useGlobalNavigation from '@/provider/useGlobalNavigation';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { ScrollView, View } from 'react-native';
import { z } from 'zod';
const signUpSchema = z.object({
    username: z.string().min(3, 'Username required'),
    email: z.string().email('Email required'),
    mobile: z.string().min(6, 'Mobile number required'),
});

type SignUpForm = z.infer<typeof signUpSchema>;

export const ContactUs = () => {
    const { navigate } = useGlobalNavigation();


    const { control, handleSubmit, setValue, watch } = useForm<SignUpForm>({
        resolver: zodResolver(signUpSchema),
        defaultValues: {
            username: '',
            email: '',
            mobile: '',

        },
    });


    const onSubmit = (data: SignUpForm) => {
        console.log('✅ Form Data:', data);
        navigate(navigationEnums.OTP_SCREEN)
    };

    return (
        <View className="flex-1 h-[400px] mt-10 bg-transparent">
            <ScrollView
                className="flex-1 h-full w-full"
                contentContainerStyle={{
                    flexGrow: 1,
                    justifyContent: 'flex-start',
                    alignItems: 'flex-start',
                    paddingHorizontal: 16,
                    gap: 16,
                }}
                keyboardShouldPersistTaps="handled"
            >

                <Controller
                    control={control}
                    name="username"
                    render={({ field: { onChange, value } }) => (
                        <Input
                            label="User Name"
                            name="username"
                            control={control}
                            className="flex-1 w-[100%] bg-white border p-3 rounded-xl"
                            placeholder="Enter Your User Name"
                            onChangeText={onChange}
                            value={value}
                        />
                    )}
                />


                <Controller
                    control={control}
                    name="mobile"
                    render={({ field: { onChange, value } }) => (
                        <Input
                            label="Mobile Number"
                            name="mobile"
                            control={control}
                            className="flex-1 w-[100%] bg-white border p-3 rounded-xl"
                            placeholder="Enter Your Mobile Number"
                            keyboardType="phone-pad"
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
                            label="Your message here"
                            name="email"
                            control={control}
                            className="flex-1 w-[100%] h-20 bg-white border p-3 rounded-xl"
                            placeholder="Enter Your Email"
                            keyboardType="email-address"
                            numberOfLines={10}
                            onChangeText={onChange}
                            value={value}
                        />
                    )}
                />

                <AppButton
                    title="Submit"
                    onPress={handleSubmit(onSubmit)}
                />




            </ScrollView>
        </View>

    );
};