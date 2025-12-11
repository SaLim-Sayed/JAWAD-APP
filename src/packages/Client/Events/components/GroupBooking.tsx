import {Input} from '@/components';
import AppButton from '@/components/UI/AppButton';
import AppHeader from '@/components/UI/AppHeader';
import AppText from '@/components/UI/AppText';
import {useApiMutation, useApiQuery} from '@/hooks';
import {apiKeys} from '@/hooks/apiKeys';
import {showGlobalToast} from '@/hooks/useGlobalToast';
import {t} from '@/lib';
import {navigationEnums} from '@/provider/navigationEnums';
import useAppRouteParams from '@/provider/useAppRouteParams';
import useGlobalNavigation from '@/provider/useGlobalNavigation';
import {useHorseStore} from '@/store/useHorseStore';
import {useStableStore} from '@/store/useStableStore';
import {zodResolver} from '@hookform/resolvers/zod';
import DateTimePicker from '@react-native-community/datetimepicker';
import React, {useEffect, useRef, useState} from 'react';
import {useForm} from 'react-hook-form';
import {
  Modal,
  Platform,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
  ScrollView,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {HelperText} from 'react-native-paper';
import {WebView} from 'react-native-webview';
import {GetHorseDetailResponse} from '../../Services/@types/horse.types';
import {GetEventDetailsResponse} from '../../home/@types/event.type';
import {GroupBookingForm, groupBookingSchema} from './userSchema';
import {Icons} from '@/constants';

export const GroupBooking = () => {
  const [payId, setPayId] = useState('');
  const {id, type, price} = useAppRouteParams('EVENT_BOOKING');

  const {data: horseDetails} = useApiQuery<GetHorseDetailResponse>({
    key: ['getHorseDetails', id],
    url: apiKeys.horse.horseDetails + id,
  });

  const {cartItems, getCartTotal} = useHorseStore();
  const totalAmount = getCartTotal();
  const horsesId = cartItems.map(item => item.horse._id);

  const {navigate} = useGlobalNavigation();
  const {stableId} = useStableStore();

  const {data: eventDetails} = useApiQuery<GetEventDetailsResponse>({
    key: ['getEventDetails', id],
    url: apiKeys.event.eventDetails + id,
  });

  // Coupon state
  const [coupon, setCoupon] = useState('');
  const {mutate: applyCoupon, isPending: applyingCoupon} = useApiMutation({
    url: apiKeys.booking.applycoupon(type),
    method: 'post',
  });

  // Date/Time picker states
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showStartTimePicker, setShowStartTimePicker] = useState(false);
  const [showEndTimePicker, setShowEndTimePicker] = useState(false);

  // Payment states
  const [showPaymentWebView, setShowPaymentWebView] = useState(false);
  const [paymentUrl, setPaymentUrl] = useState('');
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const processedPayments = useRef(new Set<string>());

  // Form setup
  const {
    handleSubmit,
    watch,
    setValue,
    control,
    formState: {errors},
  } = useForm<GroupBookingForm>({
    //@ts-ignore
    resolver: zodResolver(groupBookingSchema),
    defaultValues: {
      service: type,
      date: new Date(),
      startTime: new Date(),
      endTime: new Date(new Date().getTime() + 60 * 60 * 1000),
    },
  });

  // API mutations
  const {mutate, isPending} = useApiMutation({
    url: apiKeys.booking.payment,
  });

  const {mutate: createBooking, isPending: createBookingPending} =
    useApiMutation({
      url:
        type === 'event'
          ? apiKeys.booking.event
          : apiKeys.booking.Photo_session,
    });

  // Generate hours array (12-hour format with AM/PM)
  const generateHours = () => {
    const hours = [];
    for (let i = 0; i < 24; i++) {
      const date = new Date();
      date.setHours(i, 0, 0, 0);
      hours.push({
        value: i,
        label: date.toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
          hour12: true,
        }),
        date: date,
      });
    }
    return hours;
  };

  const hours = generateHours();

  // Handlers
  const handleApplyCoupon = (couponCode: string) => {
    if (!couponCode) {
      showGlobalToast({type: 'error', title: t('booking.enter_coupon')});
      return;
    }

    applyCoupon(
      {coupon: couponCode, id: stableId || id},
      {
        onSuccess: (res: any) => {
          showGlobalToast({
            type: 'success',
            title: t('booking.coupon_applied'),
          });
        },
        onError: (error: any) => {
          showGlobalToast({
            type: 'error',
            title: error?.response?.data?.message || 'Invalid coupon',
          });
        },
      },
    );
  };

  const parseUrlParams = (url: string) => {
    const params: {[key: string]: string} = {};
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

  const onSubmit = (data: GroupBookingForm) => {
    const paymentData = {
      customerProfileId: '1212',
      customerMobile: data.customerMobile,
      totalPrice:
        type === 'Photo session'
          ? horseDetails?.horse?.price
          : type === 'event'
          ? eventDetails?.event?.price
          : type === 'Training'
          ? price
          : totalAmount,
      chargeItems: [
        {
          itemId: '6b5fdea340e31b3b0339d4d4ae5',
          description: 'Booking',
          price:
            type === 'Photo session'
              ? horseDetails?.horse?.price
              : type === 'event'
              ? eventDetails?.event?.price
              : type === 'Training'
              ? price
              : totalAmount,
          quantity: 1,
          imageUrl: 'https://developer.fawrystaging.com/photos/45566.jpg',
        },
      ],
    };

    mutate(paymentData, {
      onSuccess: (response: any) => {
        if (response?.url) {
          setPaymentUrl(response.url);
          setShowPaymentWebView(true);
          processedPayments.current.clear();
          setIsProcessingPayment(false);
        } else {
          showGlobalToast({
            type: 'success',
            title: 'Booking created successfully',
          });
          navigate(navigationEnums.EVENT_BOOKING_SUCCESS);
        }
      },
      onError: (error: any) => {
        const serverMessage = error.response?.data?.message;
        showGlobalToast({
          type: 'error',
          title: serverMessage
            ? `Error: ${serverMessage}`
            : error.message || 'Unknown error',
        });
      },
    });
  };

  const handleWebViewNavigationStateChange = (navState: any) => {
    const {url} = navState;

    if (url.includes('/payment/callback')) {
      if (isProcessingPayment) {
        console.log('Payment already being processed, skipping...');
        return;
      }

      try {
        const params = parseUrlParams(url);
        const merchantRefNumber = params.merchantRefNumber;

        if (
          !merchantRefNumber ||
          processedPayments.current.has(merchantRefNumber)
        ) {
          console.log(
            'Payment already processed for reference:',
            merchantRefNumber,
          );
          return;
        }

        setIsProcessingPayment(true);
        processedPayments.current.add(merchantRefNumber);
        setPayId(merchantRefNumber);

        const paymentData = {
          type: params.type,
          referenceNumber: params.referenceNumber,
          merchantRefNumber: merchantRefNumber,
          orderAmount: params.orderAmount,
          paymentAmount: params.paymentAmount,
          orderStatus: params.orderStatus,
          paymentMethod: params.paymentMethod,
          statusCode: params.statusCode,
          statusDescription: params.statusDescription,
        };

        if (
          paymentData.orderStatus === 'PAID' &&
          paymentData.statusCode === '200'
        ) {
          const horsePayload = {
            horses: type === 'Photo session' ? [id] : horsesId,
            date: watch('date').toISOString().split('T')[0],
            startTime: watch('startTime').toTimeString().slice(0, 5),
            endTime: watch('endTime').toTimeString().slice(0, 5),
            totalPrice:
              type === 'Photo session'
                ? Number(horseDetails?.horse?.price)
                : totalAmount,
            service: type,
            stable:
              type === 'Photo session' ? stableId : cartItems[0].horse.stable,
            payId: merchantRefNumber,
          };

          const eventPayload = {
            event: id,
            totalPrice: Number(eventDetails?.event?.price),
            service: 'event',
            payId: merchantRefNumber,
          };

          const trainingPayload = {
            school: id,
            totalPrice: Number(price),
            service: 'Training',
            payId: merchantRefNumber,
          };

          createBooking(
            type === 'event'
              ? eventPayload
              : type === 'Training'
              ? trainingPayload
              : horsePayload,
            {
              onSuccess: () => {
                setShowPaymentWebView(false);
                setIsProcessingPayment(false);
                showGlobalToast({
                  type: 'success',
                  title: 'Booking Confirmed',
                });
                navigate(navigationEnums.EVENT_BOOKING_SUCCESS);
              },
              onError: () => {
                setShowPaymentWebView(false);
                setIsProcessingPayment(false);
                processedPayments.current.delete(merchantRefNumber);
                showGlobalToast({
                  type: 'error',
                  title: 'Failed to create booking',
                });
              },
            },
          );
        } else if (
          paymentData.orderStatus === 'FAILED' ||
          paymentData.orderStatus === 'CANCELLED'
        ) {
          setShowPaymentWebView(false);
          setIsProcessingPayment(false);
          showGlobalToast({
            type: 'error',
            title: 'Payment Failed',
            body: decodeURIComponent(
              paymentData.statusDescription || 'Unknown error',
            ),
          });
        }
      } catch (error) {
        console.error('Error parsing payment callback URL:', error);
        setIsProcessingPayment(false);
      }
    }
  };

  const handleCloseWebView = () => {
    setShowPaymentWebView(false);
    setIsProcessingPayment(false);
    showGlobalToast({type: 'info', title: 'Payment process cancelled'});
  };

  // Custom Hour Picker Component
  const HourPicker = ({
    visible,
    value,
    onChange,
    onClose,
    title,
  }: {
    visible: boolean;
    value: Date;
    onChange: (date: Date) => void;
    onClose: () => void;
    title: string;
  }) => {
    const currentHour = value.getHours();

    if (!visible) return null;
  
    
    return (
      <Modal
        transparent={true}
        animationType="slide"
        visible={visible}
        onRequestClose={onClose}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={onClose}
          className="flex-1 justify-end bg-black/50">
          <TouchableOpacity
            activeOpacity={1}
            onPress={e => e.stopPropagation()}>
            <View className="bg-white rounded-t-3xl">
              <View className="flex flex-row justify-between items-center p-4 border-b border-gray-200">
                <TouchableOpacity onPress={onClose}>
                  <AppText className="text-brownColor-400 text-base">
                    Cancel
                  </AppText>
                </TouchableOpacity>
                <AppText className="text-base font-semibold">{title}</AppText>
                <TouchableOpacity onPress={onClose}>
                  <AppText className="text-brownColor-400 text-base font-semibold">
                    Done
                  </AppText>
                </TouchableOpacity>
              </View>
              <ScrollView className="max-h-64">
                {hours.map(hour => (
                  <TouchableOpacity
                    key={hour.value}
                    onPress={() => {
                      const newDate = new Date(value);
                      newDate.setHours(hour.value, 0, 0, 0);
                      onChange(newDate);
                      onClose();
                    }}
                    className={`p-4 border-b border-gray-100 ${
                      hour.value === currentHour ? 'bg-brownColor-50' : ''
                    }`}>
                    <AppText
                      className={`text-center text-base ${
                        hour.value === currentHour
                          ? 'text-brownColor-400 font-semibold'
                          : 'text-gray-700'
                      }`}>
                      {hour.label}
                    </AppText>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
    );
  };

  return (
    <>
      <KeyboardAwareScrollView
        className="px-4 pt-6 flex-1 w-full flex flex-col bg-white rounded-xl gap-4"
        enableOnAndroid
        keyboardShouldPersistTaps="handled"
        extraScrollHeight={100}
        showsVerticalScrollIndicator={false}
        enableAutomaticScroll={true}>
        {/* Coupon Section */}
        <View className="flex flex-row w-[300px] items-center">
          <Input
            name="coupon"
            control={control}
            value={coupon}
            onChangeText={setCoupon}
            label={t('booking.coupon')}
            placeholder={t('booking.coupon_placeholder')}
            className="w-[250px] h-24"
          />
          <TouchableOpacity
            className="w-28 ltr:rounded-r-xl rtl:rounded-L-xl -mx-2 h-12 bg-brownColor-400 mt-4 flex items-center justify-center"
            onPress={() => handleApplyCoupon(coupon)}
            disabled={applyingCoupon}>
            <AppText className="text-xs text-white">
              {applyingCoupon ? t('common.loading') : t('booking.apply_coupon')}
            </AppText>
          </TouchableOpacity>
        </View>

        {/* Customer Mobile Input */}
        <Input
          maxLength={11}
          control={control}
          name="customerMobile"
          label={t('booking.customer_mobile')}
          placeholder={t('booking.customer_mobile_placeholder')}
        />

        {/* Date Picker */}
        <View className="flex flex-col my-4 gap-2">
          <TouchableOpacity
            onPress={() => setShowDatePicker(true)}
            className="flex flex-row items-center justify-between border border-brownColor-400 rounded-lg p-3 gap-2">
            <AppText className="text-brownColor-400">
              {t('booking.select_date')}
            </AppText>
            <View className="flex flex-row items-center justify-end gap-2">
              <AppText className="text-brownColor-400 font-semibold">
                {watch('date')?.toLocaleDateString() ??
                  new Date().toLocaleDateString()}
              </AppText>
              <Icons.calendar />
            </View>
          </TouchableOpacity>

          {Platform.OS === 'android' && showDatePicker && (
            <DateTimePicker
              value={watch('date') ?? new Date()}
              mode="date"
              display="default"
              minimumDate={new Date()}
              onChange={(event, selectedDate) => {
                setShowDatePicker(false);
                if (event.type === 'set' && selectedDate) {
                  setValue('date', selectedDate);
                }
              }}
            />
          )}

          {Platform.OS === 'ios' && showDatePicker && (
            <Modal
              transparent={true}
              animationType="slide"
              visible={showDatePicker}
              onRequestClose={() => setShowDatePicker(false)}>
              <TouchableOpacity
                activeOpacity={1}
                onPress={() => setShowDatePicker(false)}
                className="flex-1 justify-end bg-black/50">
                <TouchableOpacity
                  activeOpacity={1}
                  onPress={e => e.stopPropagation()}>
                  <View className="bg-white rounded-t-3xl">
                    <View className="flex flex-row justify-between items-center p-4 border-b border-gray-200">
                      <TouchableOpacity
                        onPress={() => setShowDatePicker(false)}>
                        <AppText className="text-brownColor-400 text-base">
                          Cancel
                        </AppText>
                      </TouchableOpacity>
                      <AppText className="text-base font-semibold">
                        {t('booking.select_date')}
                      </AppText>
                      <TouchableOpacity
                        onPress={() => setShowDatePicker(false)}>
                        <AppText className="text-brownColor-400 text-base font-semibold">
                          Done
                        </AppText>
                      </TouchableOpacity>
                    </View>
                    <DateTimePicker
                      value={watch('date') ?? new Date()}
                      mode="date"
                      display="spinner"
                      minimumDate={new Date()}
                      onChange={(event, selectedDate) => {
                        if (selectedDate) {
                          setValue('date', selectedDate);
                        }
                      }}
                    />
                  </View>
                </TouchableOpacity>
              </TouchableOpacity>
            </Modal>
          )}

          {errors.date && (
            <HelperText type="error">{errors.date?.message}</HelperText>
          )}
        </View>

        {/* Start Time Picker */}
        <View className="flex flex-col my-4 gap-2">
          <TouchableOpacity
            onPress={() => setShowStartTimePicker(true)}
            className="flex flex-row items-center justify-between border border-brownColor-400 rounded-lg p-3 gap-2">
            <AppText className="text-brownColor-400">
              {t('booking.start_time')}
            </AppText>
            <View className="flex flex-row items-center justify-end gap-2">
              <AppText className="text-brownColor-400 font-semibold">
                {watch('startTime')?.toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                }) ??
                  new Date().toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
              </AppText>
              <Icons.calendar />
            </View>
          </TouchableOpacity>

          {showStartTimePicker && (
            <HourPicker
              visible={showStartTimePicker}
              value={watch('startTime') ?? new Date()}
              onChange={date => setValue('startTime', date)}
              onClose={() => setShowStartTimePicker(false)}
              title={t('booking.start_time')}
            />
          )}

          {errors.startTime && (
            <HelperText type="error">{errors.startTime?.message}</HelperText>
          )}
        </View>

        {/* End Time Picker */}
        <View className="flex flex-col gap-2">
          <TouchableOpacity
            onPress={() => setShowEndTimePicker(true)}
            className="flex flex-row items-center justify-between border border-brownColor-400 rounded-lg p-3 gap-2">
            <AppText className="text-brownColor-400">
              {t('booking.end_time')}
            </AppText>
            <View className="flex flex-row items-center justify-end gap-2">
              <AppText className="text-brownColor-400 font-semibold">
                {watch('endTime')?.toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                }) ??
                  new Date(
                    new Date().getTime() + 60 * 60 * 1000,
                  ).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
              </AppText>
              <Icons.calendar />
            </View>
          </TouchableOpacity>

          {showEndTimePicker && (
            <HourPicker
              visible={showEndTimePicker}
              value={watch('endTime') ?? new Date()}
              onChange={date => setValue('endTime', date)}
              onClose={() => setShowEndTimePicker(false)}
              title={t('booking.end_time')}
            />
          )}

          {errors.endTime && (
            <HelperText type="error">{errors.endTime?.message}</HelperText>
          )}
        </View>

        {/* Submit Button */}
        <AppButton
          disabled={isPending || createBookingPending || isProcessingPayment}
          loading={isPending || createBookingPending || isProcessingPayment}
          title={t('booking.next')}
          //@ts-ignore
          onPress={handleSubmit(onSubmit)}
        />
      </KeyboardAwareScrollView>

      {/* Payment WebView Modal */}
      <Modal
        visible={showPaymentWebView}
        animationType="slide"
        statusBarTranslucent
        style={styles.modal}>
        <SafeAreaView style={styles.modalContainer}>
          <AppHeader
            title={t('booking.payment')}
            showBackButton
            onBack={handleCloseWebView}
            customCloseButton={handleCloseWebView}
          />

          {paymentUrl ? (
            <WebView
              source={{uri: paymentUrl}}
              style={styles.webview}
              onNavigationStateChange={handleWebViewNavigationStateChange}
              javaScriptEnabled={true}
              domStorageEnabled={true}
              startInLoadingState={true}
              scalesPageToFit={true}
              allowsInlineMediaPlaybook={true}
              mediaPlaybackRequiresUserAction={false}
              mixedContentMode="compatibility"
              thirdPartyCookiesEnabled={true}
              sharedCookiesEnabled={true}
              onError={syntheticEvent => {
                const {nativeEvent} = syntheticEvent;
                console.error('WebView error:', nativeEvent);
                showGlobalToast({
                  type: 'error',
                  title: 'Failed to load payment page',
                });
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
  modal: {
    backgroundColor: '#fff',
  },
  webview: {
    flex: 1,
  },
});
