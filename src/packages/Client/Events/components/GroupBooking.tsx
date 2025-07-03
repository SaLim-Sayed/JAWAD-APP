import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
 import AppText from '@/components/UI/AppText';
import AppSelect from '@/components/UI/AppSelect';
import AppButton from '@/components/UI/AppButton';
 import RadioGroup from '@/components/UI/RadioGroup';
import Row from '@/components/UI/Row';
import Col from '@/components/UI/Col';
import { images } from '@/assets/images';
import { View } from 'react-native';
import { GroupBookingForm, groupBookingSchema } from './userSchema';
import { Input } from '@/components';

const nationalityOptions = [
  { value: 'American', label: 'American', icon: images.en },
  { value: 'Arabian', label: 'Arabian', icon: images.ar },
];

const genderOptions = [
  { label: 'Male', value: 'male' },
  { label: 'Female', value: 'female' },
  { label: 'Mixed', value: 'mixed' },
];

const typeOptions = [
  { label: 'My', value: 'my' },
  { label: 'Group', value: 'group' },
];

export const GroupBooking = ({onNext}: {onNext: () => void}) => {
  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<GroupBookingForm>({
    resolver: zodResolver(groupBookingSchema),
    defaultValues: {
      type: 'group',
      riders: '5',
      gender: 'mixed',
      nationality: 'American',
      promo: '',
    },
  });

  const type = watch('type');
  const gender = watch('gender');

  const onSubmit = (data: GroupBookingForm) => {
    console.log('✅ Booking Form:', data);
    onNext()
  };

  return (
    <View className="px-4 pt-6 flex-1 w-full bg-white rounded-xl gap-4">

      {/* Radio: My / Group */}
      <RadioGroup
        options={typeOptions}
        value={type}
        onChange={(val:any) => setValue('type', val)}
       />

      {/* Riders & Gender */}
      <Row justify='between' className="gap-4">
        <Controller
          control={control}
          name="riders"
          render={({ field: { onChange, value } }) => (
            <Input
              label="Number of riders"
              name="riders"
              control={control}
              value={value}
              onChangeText={onChange}
              placeholder="0"
              keyboardType="number-pad"
              className="flex-1 w-[100%] bg-white border p-3 rounded-xl"
            />
          )}
        />

        <Controller
          control={control}
          name="gender"
          render={() => (
            <AppSelect
              label="Group Gender"
              options={genderOptions}
              value={gender}
              buttonClassName='w-40'

              onChange={(val:any) => setValue('gender', val)}
              dropdownWidth={'40%'}
             />
          )}
        />
      </Row>

      {/* Nationality */}
      <Controller
        control={control}
        name="nationality"
        render={() => (
          <AppSelect
            label="Nationality"
            options={nationalityOptions}
            value={watch('nationality')}
            onChange={(val) => setValue('nationality', val)}
            dropdownWidth={'85%'}
          />
        )}
      />

      {/* Promo Code */}
      <Controller
        control={control}
        name="promo"
        render={({ field: { value, onChange } }) => (
          <Input
            label="Add promocode"
            name="promo"
            control={control}
            value={value}
            onChangeText={onChange}
            placeholder="Enter promo code"
            className="bg-white border p-3 rounded-xl"
          />
        )}
      />

      {/* Submit */}
      <AppButton
        title="Next"
        onPress={handleSubmit(onSubmit)}
        className="bg-brownColor-400 mt-4"
      />
    </View>
  );
};
