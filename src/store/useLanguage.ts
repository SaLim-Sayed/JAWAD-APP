import AsyncStorage from '@react-native-async-storage/async-storage';
import { I18nManager } from 'react-native';
import RNRestart from 'react-native-restart';
import { create, StateCreator } from 'zustand';
import i18n from '../lib/i18n';
type Language = 'en' | 'ar' ;

interface LanguageStore {
  language: Language;
  dir: 'rtl' | 'ltr';
  setLanguage: (lang: Language) => Promise<void>;
}

const getStoredLanguage = async (): Promise<Language> => {
  const storedLanguage = await AsyncStorage.getItem('language');
  return (storedLanguage as Language) || 'ar';
};

export const isRTL = (lang: Language) => ['ar'].includes(lang);

export const useLanguage = create<LanguageStore>(
  (set: Parameters<StateCreator<LanguageStore>>[0]) => ({
    language: 'ar',
    dir: 'rtl',
    setLanguage: async (lang: Language) => {
      i18n.changeLanguage(lang);
      await AsyncStorage.setItem('language', lang);

      // Change direction if necessary
      const shouldBeRTL = isRTL(lang);
      if (I18nManager.isRTL !== shouldBeRTL) {
        I18nManager.forceRTL(shouldBeRTL);
        RNRestart.Restart() 
      }
      set({ language: lang, dir: shouldBeRTL ? 'rtl' : 'ltr' });
    },
  }),
);


// On app start, set the language and direction
(async () => {
  const storedLang = await getStoredLanguage();
  useLanguage.getState().setLanguage(storedLang);
})();
