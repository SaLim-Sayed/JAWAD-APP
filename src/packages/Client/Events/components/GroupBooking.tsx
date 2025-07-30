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
import { View, Modal, StyleSheet, SafeAreaView, TouchableOpacity, Text } from 'react-native';
import { WebView } from 'react-native-webview';
import { GetHorseDetailResponse } from '../../Services/@types/horse.types';
import { GetEventDetailsResponse } from '../../home/@types/event.type';
import { GroupBookingForm, groupBookingSchema } from './userSchema';
import AppHeader from '@/components/UI/AppHeader';
import { Input } from '@/components';

const serviceOptions = [
  { label: 'Photo session', value: 'Photo session' },
  { label: 'Event', value: 'event' },
];

export const GroupBooking = ({ onNext }: { onNext: () => void }) => {
  const { id, type } = useAppRouteParams('EVENT_BOOKING');
  const { data: horseDetails } = useApiQuery<GetHorseDetailResponse>({
    key: ["getHorseDetails", id],
    url: apiKeys.horse.horseDetails + id,
  });

  const { navigate } = useGlobalNavigation();
  const { data: eventDetails, isLoading } = useApiQuery<GetEventDetailsResponse>({
    key: ["getEventDetails", id],
    url: apiKeys.event.eventDetails + id,
  });

  // State for payment WebView
  const [showPaymentWebView, setShowPaymentWebView] = useState(false);
  const [paymentUrl, setPaymentUrl] = useState('');

  const { mutate, isPending } = useApiMutation({
    url: apiKeys.booking.payment,
  });

  const {
    handleSubmit,
    watch,
    setValue,
    register,
    control,
    formState: { errors },
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
  const { stableId } = useStableStore();

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

    const paymentData = {
      customerProfileId: "1212",
      customerMobile: data.customerMobile,
      totalPrice: 500,
      chargeItems: [
        {
          itemId: '6b5fdea340e31b3b0339d4d4ae5',
          description: data.description,
          price: 500,
          quantity: 1,
          imageUrl: 'https://developer.fawrystaging.com/photos/45566.jpg',
        }
      ],
    };

    mutate(paymentData, {
      onSuccess: (response: any) => {
        // Assuming the response contains a payment URL
        if (response?.url) {
          const url = response.url;
          setPaymentUrl(response.url); // or the full constructed one if needed
          setShowPaymentWebView(true); // move to the payment step

        } else {
          // If no URL is returned, navigate to success page directly
          showGlobalToast({ type: 'success', title: 'Booking created successfully' });
          navigate(navigationEnums.EVENT_BOOKING_SUCCESS);
        }
      },
      onError: (error: any) => {
        if (error.response?.data) {
          const serverMessage = error.response.data.message;
          showGlobalToast({ type: 'error', title: `Error: ${serverMessage}` });
        } else {
          showGlobalToast({ type: 'error', title: error.message || 'Unknown error' });
        }
      }
    });
  };

  const handleWebViewNavigationStateChange = (navState: any) => {
    // Monitor for payment completion or success URLs
    const { url } = navState;

    // Check if the URL indicates payment success
    if (url.includes('success') || url.includes('completed') || url.includes('approved')) {
      setShowPaymentWebView(false);
      showGlobalToast({ type: 'success', title: 'Payment completed successfully' });
      navigate(navigationEnums.EVENT_BOOKING_SUCCESS);
    } else if (url.includes('cancel') || url.includes('failed') || url.includes('error')) {
      setShowPaymentWebView(false);
      showGlobalToast({ type: 'error', title: 'Payment was cancelled or failed' });
    }
  };

  const handleCloseWebView = () => {
    setShowPaymentWebView(false);
    showGlobalToast({ type: 'info', title: 'Payment process cancelled' });
  };

  return (
    <>
      <View className="px-4 pt-6 flex-1 w-full bg-white rounded-xl gap-4">
        <RadioGroup
          options={serviceOptions}
          value={watch('service')}
          onChange={(value) => setValue('service', value)}
        />

        <Input
          control={control}
          label="Customer Mobile"
          placeholder="Enter customer mobile"
          {...register('customerMobile')}
          error={errors.customerMobile?.message}
        />

        <Input
          control={control}
          label="Description"
          placeholder="Enter description"
          {...register('description')}
          error={errors.description?.message}
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

      {/* Payment WebView Modal */}
      <Modal
        visible={showPaymentWebView}
        animationType="slide"
        statusBarTranslucent
        style={styles.modal}
      >
        <SafeAreaView style={styles.modalContainer}>
          <AppHeader title="Payment" showBackButton onBack={handleCloseWebView} customCloseButton={handleCloseWebView} />

          {paymentUrl ? (
            <WebView
              source={{ uri: paymentUrl }}
              style={styles.webview}
              onNavigationStateChange={handleWebViewNavigationStateChange}
              javaScriptEnabled={true}
              domStorageEnabled={true}
              startInLoadingState={true}
              scalesPageToFit={true}
              allowsInlineMediaPlayback={true}
              mediaPlaybackRequiresUserAction={false}
              mixedContentMode="compatibility"
              thirdPartyCookiesEnabled={true}
              sharedCookiesEnabled={true}
              setDisplayZoomControls
              onError={(syntheticEvent) => {
                const { nativeEvent } = syntheticEvent;
                console.error('WebView error:', nativeEvent);
                showGlobalToast({ type: 'error', title: 'Failed to load payment page' });
              }}
            />
          ) : null}
        </SafeAreaView>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  closeButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
  },
  closeButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#666',
  },
  modal: {
    backgroundColor: '#fff',
  },
  webview: {
    flex: 1,
  },
});