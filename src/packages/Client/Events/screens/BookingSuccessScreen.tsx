import React from 'react';

import { images } from '@/assets/images';
import AppButton from '@/components/UI/AppButton';
import AppText from '@/components/UI/AppText';
import AuthWrapper from '@/components/UI/AuthWrapper';
import Col from '@/components/UI/Col';
import Image from '@/components/UI/Image';
import Row from '@/components/UI/Row';
import useGlobalNavigation from '@/provider/useGlobalNavigation';
import { useAuthStore } from '@/store/useAuthStore';
import { View } from 'react-native';
import { navigationEnums } from '@/provider/navigationEnums';
import AppWrapper from '@/components/UI/AppWrapper';

const BookingSuccessScreen = () => {
  const { navigate } = useGlobalNavigation();
  const { setActiveApp } = useAuthStore()

  const onSubmit = () => {
    navigate(navigationEnums.HOME)
  };

  return (
    <AppWrapper>
      <View className='mt-12 flex-1 flex-col items-center bg-white justify-center'>
        <AppText className="text-brownColor-400 text-center text-3xl font-bold mb-2">Congratulations!</AppText>
        <AppText className="text-brownColor-300 text-center mb-4 text-lg">You have successfully booked  </AppText>

        <Row className='justify-center'  >
          <Image source={images.success} style={{
            width: 240,
            height: 240,
          }} />
        </Row>

        <AppButton className='mt-20' title="Back to Home" onPress={onSubmit} />
      </View>
    </AppWrapper>
  );
};

export default BookingSuccessScreen;
