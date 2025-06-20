import { useLanguage } from '@/store';
import React, { useEffect } from 'react';
import { I18nManager, View, ViewProps } from 'react-native';
import RNRestart from 'react-native-restart';

interface LTRWrapperProps extends ViewProps {
  children: React.ReactNode;
}

export const LTRWrapper = ({ children, style, ...props }: LTRWrapperProps) => {
  const { language } = useLanguage();

  useEffect(() => {
    const isLTR = language !== 'ar';

    // Force app layout to LTR if needed
    if (I18nManager.isRTL !== !isLTR) {
      I18nManager.forceRTL(!isLTR);
      I18nManager.allowRTL(!isLTR);
      setTimeout(() => {
        RNRestart.Restart();
      }, 200);
    }
  }, [language]);

  return (
    <View
      style={[
        { flex: 1 },
        // Flip it back if the parent applied scaleX: -1 (RTL)
        { transform: [{ scaleX: 1 }] },
        style,
      ]}
      {...props}
    >
      {children}
    </View>
  );
};
