import { View, TouchableOpacity } from 'react-native'
import React from 'react'
import AppWrapper from '@/components/UI/AppWrapper'
import AppHeader from '@/components/UI/AppHeader'
import AppText from '@/components/UI/AppText'
import { useLanguage } from '@/store'
import Image from '@/components/UI/Image'
import { Icons } from '@/assets/icons/icons'

export default function Language() {
  const { language, setLanguage } = useLanguage();

  const changeLng = (lng: 'en' | 'ar') => {
    setLanguage(lng);
  };

  return (
    <AppWrapper>
      <AppHeader title="Profile" showBackButton />
      <View className="flex-col gap-4 m-4">
        {/* English Option */}
        <TouchableOpacity
          className={`p-2 w-full flex-row items-center justify-between rounded-xl ${
            language === 'en' ? 'bg-[#FBF8F6] ' : ''
          }`}
          onPress={() => changeLng('en')}
          activeOpacity={0.8}
        >
          <AppText
            className={`font-bold ${
              language === 'en' ? 'text-brownColor-400' : 'text-gray-500'
            }`}
          >
            English
          </AppText>
          {language === 'en' && (
            <Image source={Icons.arrowCircleDown} className="w-6 h-6" />
          )}
        </TouchableOpacity>

        {/* Arabic Option */}
        <TouchableOpacity
          className={`p-2 w-full flex-row items-center justify-between rounded-xl ${
            language === 'ar' ? 'bg-[#FBF8F6]' : ''
          }`}
          onPress={() => changeLng('ar')}
          activeOpacity={0.8}
        >
          <AppText
            className={`font-bold ${
              language === 'ar' ? 'text-brownColor-400' : 'text-gray-500'
            }`}
          >
            العربية
          </AppText>
          {language === 'ar' && (
            <Image source={Icons.arrowCircleDown} className="w-6 h-6" />
          )}
        </TouchableOpacity>
      </View>
    </AppWrapper>
  );
}