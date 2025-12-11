import React from 'react';
import { ScrollView, View } from 'react-native';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import AppText from '@/components/UI/AppText';
import AppButton from '@/components/UI/AppButton';
import Row from '@/components/UI/Row';
import { Input } from '@/components';
import { Icons } from '@/assets/icons/icons';
import Image from '@/components/UI/Image';
import { CardPaymentForm, cardPaymentSchema } from './cardSchema';
import useGlobalNavigation from '@/provider/useGlobalNavigation';
import { navigationEnums } from '@/provider/navigationEnums';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export const BookingPayment = ({ onNext, onBack }: { onNext: () => void; onBack: () => void }) => {
    const {
        control,
        handleSubmit,
        formState: { errors },
        watch,
    } = useForm<CardPaymentForm>({
        resolver: zodResolver(cardPaymentSchema),
        defaultValues: {
            cardHolder: '',
            cardNumber: '',
            expireDate: '',
            cvv: '',
        },
    });

    // Example watched values for card preview
    const cardHolder = watch('cardHolder');
    const cardNumber = watch('cardNumber');
    const expireDate = watch('expireDate');
    const {navigate} = useGlobalNavigation();
    // For preview purposes, mask all but last 4 digits
    const maskedNumber =
        cardNumber && cardNumber.length > 4
            ? '**** **** **** ' + cardNumber.slice(-4)
            : '**** **** **** 7788';
    const previewExpire = expireDate || '02/27';

    const onSubmit = (data: CardPaymentForm) => {
        console.log('✅ Card Payment Form:', data);
        navigate(navigationEnums.EVENT_BOOKING_SUCCESS);
    };

    return (
        <View className="px-4 pt-6 w-full bg-white rounded-xl gap-4">       
        <KeyboardAwareScrollView enableOnAndroid keyboardShouldPersistTaps="handled" extraScrollHeight={30} showsVerticalScrollIndicator={false} style={{ height: '75%' }}>
            {/* Card Preview */}
            <View className="bg-white rounded-xl border border-[#EDEDED] px-5 py-6 mb-4">
                <AppText className="text-black font-bold text-lg mb-2">Universal Bank</AppText>
                <Row className="items-center mb-3">
                    <Image source={Icons.mastercard} style={{ width: 36, height: 24 }} />
                </Row>
                <AppText className="text-black text-xl tracking-widest mb-2">{maskedNumber}</AppText>
                <AppText className="text-brownColor-200 text-sm">Expires</AppText>
                <AppText className="text-black text-xl">{previewExpire}</AppText>
            </View>

            {/* Card Holder Name */}
            <Controller
                control={control}
                name="cardHolder"
                render={({ field: { onChange, value } }) => (
                    <Input
                        label="Card Holder Name"
                        name="cardHolder"
                        control={control}
                        placeholder="Yomna Ashraf"
                        value={value}
                        onChangeText={onChange}
                        className="bg-white border p-3 rounded-xl mb-3"
                        error={errors.cardHolder?.message?true:false}
                    />
                )}
            />

            {/* Card Number */}
            <Controller
                control={control}
                name="cardNumber"
                render={({ field: { onChange, value } }) => (
                    <Input
                        label="Card Number"
                        name="cardNumber"
                        control={control}
                        placeholder="15513 21636 1235415"
                        value={value}
                        onChangeText={onChange}
                        keyboardType="number-pad"
                        className="bg-white border p-3 rounded-xl mb-3"
                        error={errors.cardNumber?.message?true:false}
                    />
                )}
            />

            {/* Expire Date and CVV */}
            
                 <Controller
                    control={control}
                    name="expireDate"
                    render={({ field: { onChange, value } }) => (
                        <Input
                            label="Expire Date"
                            placeholder="5/2027"
                            value={value}
                            onChangeText={onChange}
                            keyboardType="number-pad"
                            className=" w-[150px] bg-white border p-3 rounded-xl"
                            name="expireDate"
                            control={control}
                        />
                    )}
                />

                <Controller
                    control={control}
                    name="cvv"
                    render={({ field: { onChange, value } }) => (
                        <Input
                            label="CVV"
                            placeholder="***"
                            value={value}
                            onChangeText={onChange}
                            keyboardType="number-pad"
                             className=" w-[150px] bg-white border p-3 rounded-xl"
                            name="cvv"
                            control={control}
                        />
                    )}
                />
 
            {/* Buttons */}
            
        </KeyboardAwareScrollView>
        <Row justify="between" className="gap-6 mt-8 w-full">
                <AppButton
                    title="Back"
                    onPress={onBack}
                    variant='outline'
                    textClassName="text-lg font-semibold text-brownColor-400"
                    className="w-[90%]"
                />
                <AppButton
                    title="Next"
                    onPress={handleSubmit(onSubmit)}
                    className="w-[90%] bg-brownColor-400"
                />
            </Row>      
        </View>
    );
};

export default BookingPayment;