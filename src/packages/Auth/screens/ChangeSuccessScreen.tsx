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
import { useAuthStore } from '@/store/useAuthStore';
import { View } from 'react-native';
import { useTranslation } from 'react-i18next';
const ChangeSuccessScreen = () => {
  const { navigate } = useGlobalNavigation();
  const { authData } = useAuthStore()
  const { t } = useTranslation();

  const onSubmit = () => {
    navigate(navigationEnums.LOGIN_SCREEN,{role:authData.role})
  };

  return (
    <AuthWrapper>
      <View  className='mt-12' >
        <Col gap={4}>
          <AppText className="text-brownColor-400 text-3xl font-bold mb-2">{t("auth.change_password")}</AppText>
          <AppText className="text-brownColor-100 mb-4">{t("auth.change_password_success")}</AppText>
        </Col>

        <Row className='justify-center'  >
          <Image source={images.success} style={{
            width: 240,
            height: 240,
          }} />
        </Row>

        <AppButton className='mt-20' title={t("auth.back_to_login")} onPress={onSubmit} />
      </View>
    </AuthWrapper>
  );
};

export default ChangeSuccessScreen;
