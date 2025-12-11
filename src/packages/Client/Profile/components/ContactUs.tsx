import { Input } from '@/components';
import AppButton from '@/components/UI/AppButton';
import { useApiMutation } from '@/hooks';
import { apiKeys } from '@/hooks/apiKeys';
import { showGlobalToast } from '@/hooks/useGlobalToast';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { ScrollView, View } from 'react-native';
import { z } from 'zod';

const contactSchema = z.object({
    fullName: z.string().min(2, 'Full name is required'),
    email: z.string().email('Valid email is required'),
    phone: z.string().min(6, 'Phone number is required'),
    message: z.string().min(10, 'Message must be at least 10 characters'),
});

type ContactForm = z.infer<typeof contactSchema>;

export const ContactUs = () => {
    const { mutate, isPending } = useApiMutation({
        url: apiKeys.contact.send,
        method: 'post',
    });

    const { control, handleSubmit, reset } = useForm<ContactForm>({
        resolver: zodResolver(contactSchema),
        defaultValues: {
            fullName: '',
            email: '',
            phone: '',
            message: '',
        },
    });

    const onSubmit = (data: ContactForm) => {
        mutate(data, {
            onSuccess: (response) => {
                showGlobalToast({
                    type: 'success',
                    title: 'Message Sent',
                    body: response?.message || 'Your message has been sent successfully',
                });
                reset();
            },
            onError: (error: any) => {
                showGlobalToast({
                    type: 'error',
                    title: 'Failed to Send',
                    body: error?.response?.data?.message || 'Something went wrong. Please try again.',
                });
            },
        });
    };

    return (
        <View className="flex-1 h-[400px] mt-10 bg-transparent">
            <ScrollView
                className="flex-1 h-full w-full"
                contentContainerStyle={{
                   
                    paddingHorizontal: 16,
                    gap: 16,
                }}
                keyboardShouldPersistTaps="handled"
            >

                <Controller
                    control={control}
                    name="fullName"
                    render={({ field: { onChange, value } }) => (
                        <Input
                            label="Full Name"
                            name="fullName"
                            control={control}
                            className="flex-1 w-[100%] bg-white border p-3 rounded-xl"
                            placeholder="Enter Your Full Name"
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
                            label="Email"
                            name="email"
                            control={control}
                            className="flex-1 w-[100%] bg-white border p-3 rounded-xl"
                            placeholder="Enter Your Email"
                            keyboardType="email-address"
                            onChangeText={onChange}
                            value={value}
                        />
                    )}
                />

                <Controller
                    control={control}
                    name="phone"
                    render={({ field: { onChange, value } }) => (
                        <Input
                            label="Phone Number"
                            name="phone"
                            control={control}
                            className="flex-1 w-[100%] bg-white border p-3 rounded-xl"
                            placeholder="Enter Your Phone Number"
                            keyboardType="phone-pad"
                            onChangeText={onChange}
                            value={value}
                        />
                    )}
                />

                <Controller
                    control={control}
                    name="message"
                    render={({ field: { onChange, value } }) => (
                        <Input
                            label="Message"
                            name="message"
                            control={control}
                            className="flex-1 w-[100%] h-32 bg-white border p-3 rounded-xl"
                            placeholder="Enter Your Message"
                            multiline
                            style={{ height: 100 }}
                            numberOfLines={6}
                            textAlignVertical="top"
                            onChangeText={onChange}
                            value={value}
                        />
                    )}
                />

                <AppButton
                    title="Submit"
                    loading={isPending}
                    onPress={handleSubmit(onSubmit)}
                />




            </ScrollView>
        </View>

    );
};