import AppButton from '@/components/UI/AppButton';
import AppLayout from '@/components/UI/AppLayout';
import LoaderBoundary from '@/components/UI/LoaderBoundary';
import { Icons } from '@/constants';
import { useApiQuery } from '@/hooks';
import { apiKeys } from '@/hooks/apiKeys';
import { navigationEnums } from '@/provider/navigationEnums';
import useAppRouteParams from '@/provider/useAppRouteParams';
import useGlobalNavigation from '@/provider/useGlobalNavigation';
import { useAuthStore } from '@/store/useAuthStore';
import { useHorseStore } from '@/store/useHorseStore';
import { useFocusEffect } from '@react-navigation/native';
import { t } from 'i18next';
import React, { useMemo } from 'react';
import { Alert, Dimensions, ScrollView, Share, View } from 'react-native';
import { GetHorseDetailResponse } from '../@types/horse.types';
import HorseDescription from '../components/HorseDescription';
import HorseDetailsHeader from '../components/HorseDetailsHeader';

const HorseDetails = () => {
  const {id} = useAppRouteParams('HORSE_DETAILS');
  const {navigate} = useGlobalNavigation();
  const {authData,logout} = useAuthStore();

  const {setSelectedHorse, addToCart, isHorseInCart} = useHorseStore();

  const {data, isLoading, refetch, isFetching} =
    useApiQuery<GetHorseDetailResponse>({
      key: ['getHorseDetails', id],
      url: apiKeys.horse.horseDetails + id + '?nationality=' + authData?.nationality,
    });

  useFocusEffect(
    React.useCallback(() => {
      refetch();
    }, [refetch]),
  );

  const title = data?.horse?.name;
  const horse = data?.horse;

  const handleSelectHorse = () => {
    // Check if user is authenticated
    const isAuthenticated = 
      authData?.role === 'auth' && 
      authData?.token !== 'undefined' && 
      authData?.token !== '';

    if (!isAuthenticated) {
      Alert.alert(
        t('Global.login_required'),
        t('Global.please_login'),
        
        [
          {
            text: t('Global.cancel'),
            style: 'cancel',
          },
          {
            text: t('Global.login'),
            onPress: () => {
              logout();
              setTimeout(() => {
                navigate(navigationEnums.LOGIN_SCREEN, {
                  role: 'auth',
                });
              }, 500);
            },
          },
        ],
      );
      return;
    }

    if (horse) {
      setSelectedHorse(horse);
      navigate(navigationEnums.EVENT_BOOKING, {id, type: 'Photo session'});
    }
  };
  console.log(authData?.role);

  const handleStoreHorse = () => {
    if (!horse) return;

    addToCart(horse, 'Ride');
    setSelectedHorse(horse);
  };

  const handleShareHorse = async () => {
    try {
      const url = `jawad://horse/details/${id}`;
      await Share.share({
        message: `🐴  ${horse?.name}\n\n${url}\n\n📱 Jawad App`,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const isStored = horse ? isHorseInCart(horse._id, 'Ride') : false;

  const footer = useMemo(() => {
    return (
      authData?.role === 'auth' && authData?.token !== 'undefined' && (
        <View className="px-4 py-3 flex-row items-center justify-between w-full bg-white">
          <AppButton
            title={t('Global.select')}
            onPress={handleSelectHorse}
            className="w-[25%]"
            variant="solid"
          />
          <AppButton
            title={
              isStored ? t('Global.stored') : t('Global.add_to_cart')
            }
            variant={isStored ? 'solid' : 'outline'}
            onPress={handleStoreHorse}
            className="w-[40%]"
            style={{
              margin: 0,
            }}
            endIcon={<Icons.cardTick />}
            disabled={isStored}
          />
          <AppButton
            variant={'outline'}
            onPress={handleShareHorse}
            className="w-[20%] "

            endIcon={<Icons.share />}
          />
        </View>
      ) 
    )
  }, [handleSelectHorse, handleStoreHorse, isStored, authData?.role, authData?.token]);
  
  return (
    <AppLayout title={title} isScrollable={true} showBackButton footer={footer}>
      <View className="bg-white flex-1 h-full">
        <LoaderBoundary isLoading={isLoading || isFetching}>
          <View className="flex-1">
              {!isLoading && data && (
                <>
                  <HorseDetailsHeader horse={data?.horse!} />
                  <HorseDescription horse={data?.horse!} />
                </>
              )}
          </View>
        </LoaderBoundary>
      </View>
    </AppLayout>
  );
};

export default HorseDetails;
