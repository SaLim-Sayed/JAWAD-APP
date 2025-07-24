import AppButton from '@/components/UI/AppButton';
import RadioGroup from '@/components/UI/RadioGroup';
import { Icons } from '@/constants';
import { useApiMutation, useApiQuery } from '@/hooks';
import { apiKeys } from '@/hooks/apiKeys';
import { showGlobalToast } from '@/hooks/useGlobalToast';
import { navigationEnums } from '@/provider/navigationEnums';
import useAppRouteParams from '@/provider/useAppRouteParams';
import useGlobalNavigation from '@/provider/useGlobalNavigation';
import { useStableStore } from '@/store/useStableStore';
import { zodResolver } from '@hookform/resolvers/zod';
import DateTimePicker from '@react-native-community/datetimepicker';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { View } from 'react-native';
import { GetHorseDetailResponse } from '../../Services/@types/horse.types';
import { GetEventDetailsResponse } from '../../home/@types/event.type';
import { GroupBookingForm, groupBookingSchema } from './userSchema';

const serviceOptions = [
  { label: 'Photo session', value: 'Photo session' },
  { label: 'Event', value: 'event' },
];

export const GroupBooking = ({ onNext }: { onNext: () => void }) => {
  const { id, type } = useAppRouteParams('EVENT_BOOKING');
  const { data: horseDetails, } = useApiQuery<GetHorseDetailResponse>({
    key: ["getHorseDetails", id],
    url: apiKeys.horse.horseDetails + id,
  });

  const { navigate } = useGlobalNavigation()
  const { data: eventDetails, isLoading } = useApiQuery<GetEventDetailsResponse>({
    key: ["getEventDetails", id],
    url: apiKeys.event.eventDetails + id,
  })
  const { mutate, isPending } = useApiMutation({
    url: apiKeys.booking[type as "event" | "Photo_session"],
  });


  const {
    handleSubmit,
    watch,
    setValue,
    register,
  } = useForm<GroupBookingForm>({
    //@ts-ignore
    resolver: zodResolver(groupBookingSchema),
    defaultValues: {
      date: new Date(),
      startTime: new Date(),
      endTime: new Date(),
      service: "Photo session",
    },
  });




  // Helpers for date/time picker visibility states
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showStartTimePicker, setShowStartTimePicker] = useState(false);
  const [showEndTimePicker, setShowEndTimePicker] = useState(false);
  const { stableId } = useStableStore()
  const onSubmit = (data: GroupBookingForm) => {

    const horsePayload = {
      horses: [id],
      date: data.date.toISOString().split('T')[0], // Format as "YYYY-MM-DD"
      startTime: data.startTime.toTimeString().slice(0, 5), // Format as "HH:mm"
      endTime: data.endTime.toTimeString().slice(0, 5),
      totalPrice: Number(horseDetails?.horse?.price),
      service: watch('service'),
      stable: stableId,
    };



    mutate(horsePayload, {
      onSuccess: () => {
        showGlobalToast({ type: 'success', title: 'Booking created successfully' });
        navigate(navigationEnums.EVENT_BOOKING_SUCCESS)
      },
      onError: (error: any) => {
        if (error.response?.data) {
          const serverMessage = error.response.data.message
          showGlobalToast({ type: 'error', title: `Error: ${serverMessage}` });
        } else {
          showGlobalToast({ type: 'error', title: error.message || 'Unknown error' });
        }
      }




    })
  }

  return (
    <View className="px-4 pt-6 flex-1 w-full bg-white rounded-xl gap-4">

      <RadioGroup
        options={serviceOptions}
        value={watch('service')}
        onChange={(value) => setValue('service', value)}
      />



      <AppButton
        title={`Date: ${watch('date') ? watch('date').toISOString().split('T')[0] : 'Select Date'}`}
        onPress={() => setShowDatePicker(true)}
        variant='outline'
        endIcon={<Icons.calendar />}
      />
      {showDatePicker && (
        <DateTimePicker
          {...register('date')}
          value={watch('date') ?? new Date()}
          mode="date"
          display="default"
          onChange={(_, selectedDate) => {
            setShowDatePicker(false);
            if (selectedDate) {
              setValue('date', selectedDate);
            }
          }}
        />
      )}

      <AppButton
        title={`Start Time: ${watch('startTime') ? watch('startTime').toTimeString().slice(0, 5) : 'Select Time'}`}
        onPress={() => setShowStartTimePicker(true)}
        variant='outline'
        endIcon={<Icons.calendar />}
      />
      {showStartTimePicker && (
        <DateTimePicker
          {...register('startTime')}
          value={watch('startTime') ?? new Date()}
          mode="time"
          display="default"
          onChange={(_, selectedTime) => {
            setShowStartTimePicker(false);
            if (selectedTime) {
              setValue('startTime', selectedTime);
            }
          }}
        />
      )}

      <AppButton
        title={`End Time: ${watch('endTime') ? watch('endTime').toTimeString().slice(0, 5) : 'Select Time'}`}
        onPress={() => setShowEndTimePicker(true)}
        variant='outline'
        endIcon={<Icons.calendar />}
      />
      {showEndTimePicker && (
        <DateTimePicker
          {...register('endTime')}
          value={watch('endTime') ?? new Date()}
          mode="time"
          display="default"
          onChange={(_, selectedTime) => {
            setShowEndTimePicker(false);
            if (selectedTime) {
              setValue('endTime', selectedTime);
            }
          }}
        />
      )}







      <AppButton
        disabled={isPending}
        loading={isPending}
        title="Next"
        //@ts-ignore
        onPress={handleSubmit(onSubmit)}
       />
    </View>
  );
};