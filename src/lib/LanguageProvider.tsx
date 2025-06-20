
import { TouchableOpacity, ScrollView, StyleSheet, View } from 'react-native';
import { useLanguage } from '../store';
import AppText from '@/components/UI/AppText';
import { useTranslation } from 'react-i18next';

const LanguageProvider = () => {
    const { t } = useTranslation()
  const { setLanguage } = useLanguage();

  const handleLanguageChange = (newLang: string) => {
    setLanguage(newLang as 'en' | 'ar' | 'fr' | 'de');
  };

  return (
    <ScrollView   >
    <View  className='flex flex-col w-full gap-10'  >
      <TouchableOpacity className="flex flex-row   border-b pb-3 border-slate-600 items-center gap-2" onPress={() => handleLanguageChange("en")}>
                    <AppText className="text-white text-[20px] font-[700]"  >{t('Global.English')}</AppText>
                </TouchableOpacity>
        <TouchableOpacity className="flex flex-row   border-b pb-3 border-slate-600 items-center gap-2" onPress={() => handleLanguageChange("ar")}>
                    <AppText className="text-white text-[20px] font-[700]"  >{t('Global.Arabic')}</AppText>
                </TouchableOpacity>
        <TouchableOpacity className="flex flex-row   border-b pb-3 border-slate-600 items-center gap-2" onPress={() => handleLanguageChange("fr")}>
                    <AppText className="text-white text-[20px] font-[700]"  >{t('Global.French')}</AppText>
                </TouchableOpacity>
        <TouchableOpacity className="flex flex-row border-b pb-3 border-slate-600 items-center gap-2" onPress={() => handleLanguageChange("de")}>
                    <AppText className="text-white text-[20px] font-[700]"  >{t('Global.German')}</AppText>
                </TouchableOpacity>
        
      </View>
      
    </ScrollView>
  );
};

 

export default LanguageProvider;
