import { Input } from '@/components';
import AppButton from '@/components/UI/AppButton';
import AppHeader from '@/components/UI/AppHeader';
import { Icons } from '@/constants';
import { useApiMutation, useApiQuery } from '@/hooks';
import { apiKeys } from '@/hooks/apiKeys';
import { showGlobalToast } from '@/hooks/useGlobalToast';
import { navigationEnums } from '@/provider/navigationEnums';
import useAppRouteParams from '@/provider/useAppRouteParams';
import useGlobalNavigation from '@/provider/useGlobalNavigation';
import { useHorseStore } from '@/store/useHorseStore';
import { useStableStore } from '@/store/useStableStore';
import { zodResolver } from '@hookform/resolvers/zod';
import DateTimePicker from '@react-native-community/datetimepicker';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Modal, SafeAreaView, StyleSheet, View } from 'react-native';
import { WebView } from 'react-native-webview';
import { GetHorseDetailResponse } from '../../Services/@types/horse.types';
import { GetEventDetailsResponse } from '../../home/@types/event.type';
import { GroupBookingForm, groupBookingSchema } from './userSchema';
import { t } from '@/lib';

const serviceOptions = [
  { label: 'Photo session', value: 'Photo session' },
  { label: 'Event', value: 'event' },
];

export const GroupBooking = ({ onNext }: { onNext: () => void }) => {
  const [payId, setPayId] = useState("")
  const { id, type } = useAppRouteParams('EVENT_BOOKING');
  const { data: horseDetails } = useApiQuery<GetHorseDetailResponse>({
    key: ["getHorseDetails", id],
    url: apiKeys.horse.horseDetails + id,
  });

  const {
    cartItems,
    updateCartItemQuantity,
    removeFromCart,
    clearCart,
    getCartTotal,
    getCartItemsCount
  } = useHorseStore();
  const totalAmount = getCartTotal();

  const horsesId = cartItems.map((item) => item.horse._id)
  const { navigate } = useGlobalNavigation();
  const { data: eventDetails, isLoading } = useApiQuery<GetEventDetailsResponse>({
    key: ["getEventDetails", id],
    url: apiKeys.event.eventDetails + id,
  });

  const parseUrlParams = (url: string) => {
    const params: { [key: string]: string } = {};
    const queryString = url.split('?')[1];

    if (!queryString) return params;

    queryString.split('&').forEach(pair => {
      const [key, value] = pair.split('=');
      if (key && value) {
        params[key] = decodeURIComponent(value);
      }
    });

    return params;
  };

  // State for payment WebView
  const [showPaymentWebView, setShowPaymentWebView] = useState(false);
  const [paymentUrl, setPaymentUrl] = useState('');

  const { mutate, isPending } = useApiMutation({
    url: apiKeys.booking.payment,
  });
  const { mutate: createBooking, isPending: createBookingPending } = useApiMutation({
    url: type === "event" ? apiKeys.booking.event : apiKeys.booking.Photo_session,
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
      service: type,
    },
  });

  // Helpers for date/time picker visibility states
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showStartTimePicker, setShowStartTimePicker] = useState(false);
  const [showEndTimePicker, setShowEndTimePicker] = useState(false);
  const { stableId } = useStableStore();
  console.log("payId", payId)

  const onSubmit = (data: GroupBookingForm) => {
    const paymentData = {
      customerProfileId: "1212",
      customerMobile: data.customerMobile,
      totalPrice: type === "Photo session" ? horseDetails?.horse?.price : type === "event" ? eventDetails?.event?.price : totalAmount,
      chargeItems: [
        {
          itemId: '6b5fdea340e31b3b0339d4d4ae5',
          description: "Booking",
          price: type === "Photo session" ? horseDetails?.horse?.price : type === "event" ? eventDetails?.event?.price : totalAmount,
          quantity: 1,
          imageUrl: 'https://developer.fawrystaging.com/photos/45566.jpg',
        }
      ],
    };

    mutate(paymentData, {
      onSuccess: (response: any) => {
        if (response?.url) {
          const url = response.url;
          setPaymentUrl(response.url);
          setShowPaymentWebView(true);

        } else {
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
    const { url } = navState;

    // Check if this is a payment callback URL
    if (url.includes('/payment/callback')) {

      try {
        const params = parseUrlParams(url);
        setPayId(params.merchantRefNumber)
        console.log("salim", params.merchantRefNumber)
        const paymentData = {
          type: params.type,
          referenceNumber: params.referenceNumber,
          merchantRefNumber: params.merchantRefNumber,
          orderAmount: params.orderAmount,
          paymentAmount: params.paymentAmount,
          orderStatus: params.orderStatus,
          paymentMethod: params.paymentMethod,
          statusCode: params.statusCode,
          statusDescription: params.statusDescription,
        };


        if (paymentData.orderStatus === 'PAID' && paymentData.statusCode === '200') {
          const merchantRef = paymentData.merchantRefNumber;

          if (merchantRef) {
            const horsePayload = {
              horses: type === "Photo session" ? [id] : horsesId,
              date: watch('date').toISOString().split('T')[0],
              startTime: watch('startTime').toTimeString().slice(0, 5),
              endTime: watch('endTime').toTimeString().slice(0, 5),
              totalPrice: type === "Photo session" ? Number(horseDetails?.horse?.price) : totalAmount,
              service: type,
              stable: type === "Photo session" ? stableId : cartItems[0].horse.stable,
              payId: merchantRef
            };
            const eventPayload = {
              event: id,
              totalPrice: Number(eventDetails?.event?.price),
              service: "event",
              payId: merchantRef
            }

            createBooking(type === "event" ? eventPayload : horsePayload, {
              onSuccess: () => {
                setShowPaymentWebView(false);
                showGlobalToast({
                  type: 'success',
                  title: 'Booking Confirmed',
                });
                navigate(navigationEnums.EVENT_BOOKING_SUCCESS);
              },
              onError: () => {
                setShowPaymentWebView(false);
                showGlobalToast({
                  type: 'error',
                  title: 'Failed to create booking',
                });
              }
            });
          } else {
            console.error('No merchant reference number found');
            setShowPaymentWebView(false);
            showGlobalToast({
              type: 'error',
              title: 'Payment succeeded but no reference',
            });
          }
        }
        else if (paymentData.orderStatus === 'FAILED' || paymentData.orderStatus === 'CANCELLED') {
          setShowPaymentWebView(false);
          showGlobalToast({
            type: 'error',
            title: 'Payment Failed',
            body: decodeURIComponent(paymentData.statusDescription || 'Unknown error')
          });
        }
      } catch (error) {
        console.error('Error parsing payment callback URL:', error);
      }
    }
  };
  const handleCloseWebView = () => {
    setShowPaymentWebView(false);
    showGlobalToast({ type: 'info', title: 'Payment process cancelled' });
  };

  return (
    <>
      <View className="px-4 pt-6 flex-1 w-full bg-white rounded-xl gap-4">


        <Input
          control={control}
          label={t('booking.customer_mobile')}
          placeholder={t('booking.customer_mobile_placeholder')}
          {...register('customerMobile')}
          error={errors.customerMobile?.message}
        />


        <AppButton
          title={`${t('booking.date')}: ${watch('date') ? watch('date').toISOString().split('T')[0] : t('booking.select_date')}`}
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
          title={`${t('booking.start_time')}: ${watch('startTime') ? watch('startTime').toTimeString().slice(0, 5) : t('booking.select_time')}`}
          onPress={() => setShowStartTimePicker(true)}
          variant='outline'
          endIcon={<Icons.calendar />}
        />
        {showStartTimePicker && (
          // @ts-ignore 
          <DateTimePicker
            value={watch('startTime') ?? new Date()}
            mode="time"
            display="spinner"
            minuteInterval={60}
            onChange={(_, selectedTime) => {
              setShowStartTimePicker(false);
              if (selectedTime) {
                const hourOnly = new Date(selectedTime);
                hourOnly.setMinutes(0);
                hourOnly.setSeconds(0);
                hourOnly.setMilliseconds(0);
                setValue('startTime', hourOnly);
              }
            }}
          />


        )}

        <AppButton
          title={`${t('booking.end_time')}: ${watch('endTime') ? watch('endTime').toTimeString().slice(0, 5) : t('booking.select_time')}`}
          onPress={() => setShowEndTimePicker(true)}
          variant='outline'
          endIcon={<Icons.calendar />}
        />
        {showEndTimePicker && (
          // @ts-ignore 
          <DateTimePicker
            value={watch('endTime') ?? new Date()}
            mode="time"
            display="spinner"
            minuteInterval={60}
            onChange={(_, selectedTime) => {
              setShowEndTimePicker(false);
              if (selectedTime) {
                const hourOnly = new Date(selectedTime);
                hourOnly.setMinutes(0);
                hourOnly.setSeconds(0);
                hourOnly.setMilliseconds(0);
                setValue('endTime', hourOnly);
              }
            }}
          />

        )}

        <AppButton
          disabled={isPending}
          loading={isPending}
          title={t('booking.next')}
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
          <AppHeader title={t('booking.payment')} showBackButton onBack={handleCloseWebView} customCloseButton={handleCloseWebView} />

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