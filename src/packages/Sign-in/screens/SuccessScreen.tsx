import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Text, TouchableOpacity, View } from 'react-native';
import { z } from 'zod';

import { Input } from '@/components';
import AppButton from '@/components/UI/AppButton';
import AuthWrapper from '@/components/UI/AuthWrapper';
import Or from '@/components/UI/Or';
import Radio from '@/components/UI/Radio';
import { Icons } from '@/constants';
import useGlobalNavigation from '@/provider/useGlobalNavigation';
import { useAuthStore } from '@/store/useAuthStore';
import AppText from '@/components/UI/AppText';
import Image from '@/components/UI/Image';
import Row from '@/components/UI/Row';
import Col from '@/components/UI/Col';
import { images } from '@/assets/images';

const SuccessScreen = () => {
  const { navigate } = useGlobalNavigation();
  const { setActiveApp } = useAuthStore()

  const onSubmit = () => {
    navigate("login")
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

export default SuccessScreen;
