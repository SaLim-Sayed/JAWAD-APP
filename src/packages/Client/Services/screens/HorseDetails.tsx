import AppButton from '@/components/UI/AppButton';
import AppLayout from '@/components/UI/AppLayout';
import LoaderBoundary from '@/components/UI/LoaderBoundary';
import Row from '@/components/UI/Row';
import {Icons} from '@/constants';
import {useApiQuery} from '@/hooks';
import {apiKeys} from '@/hooks/apiKeys';
import {showGlobalToast} from '@/hooks/useGlobalToast';
import {navigationEnums} from '@/provider/navigationEnums';
import useAppRouteParams from '@/provider/useAppRouteParams';
import useGlobalNavigation from '@/provider/useGlobalNavigation';
import {useHorseStore} from '@/store/useHorseStore';
import {useFocusEffect} from '@react-navigation/native';
import {t} from 'i18next';
import React from 'react';
import {ScrollView, View, Share, TouchableOpacity} from 'react-native';
import {GetHorseDetailResponse} from '../@types/horse.types';
import HorseDescription from '../components/HorseDescription';
import HorseDetailsHeader from '../components/HorseDetailsHeader';
import {useAuthStore} from '@/store/useAuthStore';
import YouTubeEmbed from '@/components/UI/YouTubePlayerComponent';

const HorseDetails = () => {
  const {id} = useAppRouteParams('HORSE_DETAILS');
  const {navigate} = useGlobalNavigation();
  const {authData} = useAuthStore();

  const {setSelectedHorse, addToCart, isHorseInCart} = useHorseStore();

  const {data, isLoading, refetch, isFetching} =
    useApiQuery<GetHorseDetailResponse>({
      key: ['getHorseDetails', id],
      url: apiKeys.horse.horseDetails + id,
    });

  useFocusEffect(
    React.useCallback(() => {
      refetch();
    }, [refetch]),
  );

  const title = data?.horse?.name;
  const horse = data?.horse;

  const handleSelectHorse = () => {
    if (horse) {
      setSelectedHorse(horse);
      navigate(navigationEnums.EVENT_BOOKING, {id, type: 'Photo session'});
    }
  };

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

  return (
    <AppLayout title={title} isScrollable={false} showBackButton>
      <View className="bg-white flex-1 h-full">
        <LoaderBoundary isLoading={isLoading || isFetching}>
          <ScrollView
            contentContainerStyle={{
              paddingBottom: 80,
              marginHorizontal: 10,
              flexGrow: 1,
            }}>
            {!isLoading && data && (
              <>
                <HorseDetailsHeader horse={data?.horse!} />
                <HorseDescription horse={data?.horse!} />
              </>
            )}
          </ScrollView>
        </LoaderBoundary>

        {authData?.role === 'auth' && (
          <View className="mt-4 flex-row items-center justify-between w-full mb-10">
            <AppButton
              title={t('Global.select')}
              onPress={handleSelectHorse}
              className="w-[25%]"
              variant="solid"
            />
            <AppButton
              title={isStored ? t('Global.stored') : t('Global.add_to_cart')}
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
               variant={  'outline' }
              onPress={handleShareHorse}
              className="w-[20%]"
              style={{
                margin: 0,
              }}
              endIcon={<Icons.share />}
             />
            {/* <TouchableOpacity
              className="w-[20%] items-center border bg-brownColor-50 border-brownColor-300 rounded-md p-3"
              onPress={handleShareHorse}>
              <Icons.share />
            </TouchableOpacity> */}
          </View>
        )}
      </View>
    </AppLayout>
  );
};

export default HorseDetails;
