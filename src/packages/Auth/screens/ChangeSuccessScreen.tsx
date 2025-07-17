import React from 'react';

import { images } from '@/assets/images';
import AppButton from '@/components/UI/AppButton';
import AppText from '@/components/UI/AppText';
import AuthWrapper from '@/components/UI/AuthWrapper';
import Col from '@/components/UI/Col';
import Image from '@/components/UI/Image';
import Row from '@/components/UI/Row';
import useGlobalNavigation from '@/provider/useGlobalNavigation';
import { navigationEnums } from '@/provider/navigationEnums';
const ChangeSuccessScreen = () => {
  const { navigate } = useGlobalNavigation();

  const onSubmit = () => {
    navigate(navigationEnums.LOGIN_SCREEN)
  };

  return (
    <AuthWrapper>
      <Col className='mt-12' gap={8}>
        <Col gap={4}>
          <AppText className="text-brownColor-400 text-3xl font-bold mb-2">Password Changed!</AppText>
          <AppText className="text-brownColor-100 mb-4">Your password has been changed successfully.</AppText>
        </Col>

        <Row className='justify-center'  >
          <Image source={images.success} style={{
            width: 240,
            height: 240,
          }} />
        </Row>

        <AppButton className='mt-20' title="Back to Login" onPress={onSubmit} />
      </Col>
    </AuthWrapper>
  );
};

export default ChangeSuccessScreen;
