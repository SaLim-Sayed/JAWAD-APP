
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
import { View, Modal, StyleSheet, SafeAreaView, TouchableOpacity, Text, ActivityIndicator } from 'react-native';
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
  const { navigate } = useGlobalNavigation();
  const { stableId } = useStableStore();

  // API queries
  const { data: horseDetails } = useApiQuery<GetHorseDetailResponse>({
    key: ["getHorseDetails", id],
    url: apiKeys.horse.horseDetails + id,
  });

  const { data: eventDetails, isLoading } = useApiQuery<GetEventDetailsResponse>({
    key: ["getEventDetails", id],
    url: apiKeys.event.eventDetails + id,
  });

  // State for payment WebView
  const [showPaymentWebView, setShowPaymentWebView] = useState(false);
  const [paymentUrl, setPaymentUrl] = useState('');
  const [currentWebViewUrl, setCurrentWebViewUrl] = useState('');
  const [merchantRefNumber, setMerchantRefNumber] = useState('');
  const [bookingFormData, setBookingFormData] = useState<GroupBookingForm | null>(null);
  const [isWebViewLoading, setIsWebViewLoading] = useState(true);

  // Date/time picker visibility states
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showStartTimePicker, setShowStartTimePicker] = useState(false);
  const [showEndTimePicker, setShowEndTimePicker] = useState(false);

  // API mutations
  const { mutate, isPending } = useApiMutation({
    url: apiKeys.booking.payment,
  });

  const { mutate: createBooking, isPending: isBookingPending } = useApiMutation({
    url: apiKeys.booking.Photo_session,
  });

  // Form setup
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

  // Create booking after successful payment
  const createBookingAfterPayment = (merchantRefNumber: string) => {
    if (!bookingFormData) {
      console.error('No booking form data available');
      showGlobalToast({
        type: 'error',
        title: 'Booking data not found'
      });
      return;
    }

    const bookingPayload = {
      horses: [id],
      date: bookingFormData.date.toISOString().split('T')[0],
      startTime: bookingFormData.startTime.toTimeString().slice(0, 5),
      endTime: bookingFormData.endTime.toTimeString().slice(0, 5),
      totalPrice: Number(horseDetails?.horse?.price || 500),
      service: bookingFormData.service,
      stable: stableId,
      paymentReference: merchantRefNumber,
      customerMobile: bookingFormData.customerMobile,
      description: bookingFormData.description,
    };

    console.log('Creating booking with payload:', bookingPayload);

    createBooking(bookingPayload, {
      onSuccess: (response: any) => {
        console.log('Booking created successfully:', response);
        showGlobalToast({
          type: 'success',
          title: 'Booking Confirmed!',
          body: `Booking ID: ${response.bookingId || merchantRefNumber}`
        });

       
      },
      onError: (error: any) => {
        console.error('Booking creation failed:', error);
        const errorMessage = error.response?.data?.message || error.message || 'Failed to create booking';
        showGlobalToast({
          type: 'error',
          title: 'Booking Failed',
          body: errorMessage
        });
      }
    });
  };
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
  // Handle WebView navigation state changes
  const handleWebViewNavigationStateChange = (navState: any) => {
    const { url } = navState;

    // Save the current URL in state and log it
    setCurrentWebViewUrl(url);
    console.log('WebView URL changed to:', url);

    // Check if this is a payment callback URL
    if (url.includes('/payment/callback')) {
      console.log('Payment callback detected:', url);

      try {
        // Parse the URL and extract parameters
        const urlObj = new URL(url);
        const params = parseUrlParams(url);
        console.log("salim",params)
        const merchantRefNumber = params.merchantRefNumber;

        console.log("salim",merchantRefNumber)
        // Extract all relevant parameters
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

        console.log('Payment Data:', paymentData);

        // Check if payment was successful
        if (paymentData.orderStatus === 'PAID' && paymentData.statusCode === '200') {
          const merchantRef = paymentData.merchantRefNumber;

          if (merchantRef) {
            console.log('Payment Success! Merchant Ref Number:', merchantRef);
            setMerchantRefNumber(merchantRef);

            // Close WebView
            setShowPaymentWebView(false);

            // Show success message
            showGlobalToast({
              type: 'success',
              title: 'Payment Successful',
              body: `Reference: ${merchantRef}`
            });

            // Create the booking with merchant reference
            createBookingAfterPayment(merchantRef);
          } else {
            console.error('No merchant reference number found');
            setShowPaymentWebView(false);
            showGlobalToast({
              type: 'error',
              title: 'Payment completed but reference missing'
            });
          }
        } else if (paymentData.orderStatus === 'FAILED' || paymentData.orderStatus === 'CANCELLED') {
          // Payment failed
          console.log('Payment failed:', paymentData.statusDescription);
          setShowPaymentWebView(false);
          showGlobalToast({
            type: 'error',
            title: 'Payment Failed',
            body: decodeURIComponent(paymentData.statusDescription || 'Unknown error')
          });
        }
      } catch (error) {
        console.error('Error parsing payment callback URL:', error);
        // Don't close WebView on parsing errors - might be a different URL
      }
    }
  };

  // Handle form submission
  const onSubmit = (data: GroupBookingForm) => {
    // Store form data for later use after payment
    setBookingFormData(data);

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

    console.log('Initiating payment with data:', paymentData);

    mutate(paymentData, {
      onSuccess: (response: any) => {
        console.log('Payment API response:', response);
        if (response?.url) {
          setPaymentUrl(response.url);
          setShowPaymentWebView(true);
          setIsWebViewLoading(true);
        } else {
          console.error('No payment URL in response');
          showGlobalToast({
            type: 'error',
            title: 'Failed to get payment URL'
          });
        }
      },
      onError: (error: any) => {
        console.error('Payment API error:', error);
        const errorMessage = error.response?.data?.message || error.message || 'Payment initiation failed';
        showGlobalToast({
          type: 'error',
          title: 'Payment Error',
          body: errorMessage
        });
      }
    });
  };

  // Handle WebView close
  const handleCloseWebView = () => {
    console.log('WebView closed. Last URL was:', currentWebViewUrl);
    setShowPaymentWebView(false);
    setCurrentWebViewUrl('');
    setIsWebViewLoading(true);
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

        {/* NEW: Display current WebView URL and merchantRefNumber for debugging */}
        {currentWebViewUrl && (
          <Text style={{ fontSize: 12, color: '#666', marginTop: 10 }}>
            Current WebView URL: {currentWebViewUrl}
          </Text>
        )}
        {merchantRefNumber && (
          <Text style={{ fontSize: 12, color: '#008000', marginTop: 5 }}>
            Merchant Ref Number: {merchantRefNumber}
          </Text>
        )}
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