import { useLanguage } from "@/store";
import i18next from "i18next";
import React, { useEffect, useRef } from "react";
import { I18nextProvider } from "react-i18next";
import { DevSettings, I18nManager, Platform, View } from "react-native";
import RNRestart from "react-native-restart";
import { isRTL } from "../constant";
 
const I18nContext = ({ children }: { children: React.ReactNode }) => {
  const { language, dir } = useLanguage();  
   const hasRestarted = useRef(false);

  useEffect(() => {
     if (I18nManager.isRTL !== isRTL && !hasRestarted.current) {
      hasRestarted.current = true;
      I18nManager.allowRTL(isRTL);
      I18nManager.forceRTL(isRTL);

      setTimeout(() => {
        if (__DEV__ && Platform.OS === "android") {
          DevSettings.reload();
        } else {
          RNRestart.restart();
        }
      }, 100);
    }
  }, [isRTL]);

  return (
    <I18nextProvider i18n={i18next}>
      <View style={{ flex: 1, direction: isRTL ? "rtl" : "ltr" }}>
        {children}
      </View>
    </I18nextProvider>
  );
};

export { I18nContext };
