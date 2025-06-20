// components/RTLWrapper.tsx
import { useLanguage } from '@/store';
import React, { useEffect } from 'react';
import { I18nManager, View, ViewProps } from 'react-native';
import RNRestart from 'react-native-restart';

interface RTLWrapperProps extends ViewProps {
  children: React.ReactNode;
}

export const RTLWrapper = ({ children, style, ...props }: RTLWrapperProps) => {
  const { language } = useLanguage();

  useEffect(() => {
    const isRTL = language === 'ar';

    // Only trigger if the current direction doesn't match
    if (I18nManager.isRTL !== isRTL) {
      I18nManager.forceRTL(isRTL);
      I18nManager.allowRTL(isRTL);

      // Restart the app to apply the direction changes
      setTimeout(() => {
        RNRestart.Restart();
      }, 200);
    }
  }, [language]);

  return (
    <View style={[{ flex: 1 }, style]} {...props}>
      {children}
    </View>
  );
};
