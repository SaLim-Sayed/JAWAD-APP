import {create, StateCreator} from 'zustand';
 import AsyncStorage from '@react-native-async-storage/async-storage';
import i18n from '../lib/i18n';
 
type Language = 'en' | 'ar' | 'fr' | 'de';

interface LanguageStore {
  language: Language;
  setLanguage: (lang: Language) => void;
}

const getStoredLanguage = async (): Promise<Language> => {
  const storedLanguage = await AsyncStorage.getItem('language');
  return (storedLanguage as Language) || 'en';
};

export const useLanguage = create<LanguageStore>(
  (set: Parameters<StateCreator<LanguageStore>>[0]) => ({
    language: 'en',
    setLanguage: async (lang: Language) => {
      i18n.changeLanguage(lang);
      await AsyncStorage.setItem('language', lang);
      set({language: lang});
    },
  }),
);

(async () => {
  const storedLang = await getStoredLanguage();
  useLanguage.getState().setLanguage(storedLang);
})();
