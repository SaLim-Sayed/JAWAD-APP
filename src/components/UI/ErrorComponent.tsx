import { View, Text, TouchableOpacity, SafeAreaView } from 'react-native'
import React from 'react'
import AppText from './AppText'
import useGlobalNavigation from '@/provider/useGlobalNavigation'
import { useTranslation } from 'react-i18next'
type Props = { onPress: () => void; type: 'series' | 'movies' | 'live' };


export default function ErrorComponent({ onPress, type }: Props) {
  const { t } = useTranslation();
  const { navigate } = useGlobalNavigation()
  return (
    <SafeAreaView className="flex-1 justify-center items-center">
      <View className='flex flex-col gap-4  w-[90%] items-center justify-center gap-4'>

        <AppText className="text-white text-[16px] text-xl text-center font-[600]">{t(`Error.failed_to_load_${type}`)} {t('Error.please_check_connection')}</AppText>
        <TouchableOpacity onPress={onPress} className="mt-4 w-[80%] bg-red-500 px-10 py-3 cursor-pointer rounded">
          <AppText className="text-white text-[16px] text-center font-[600]">{t('Error.retry')}</AppText>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigate('profile/playlist')} className=" flex  flex-row  justify-center items-center  gap-2 bg-mainColor-100 w-[80%] px-10 py-2 rounded">
          <AppText className="text-white text-[16px] text-center font-[600]">{t('Error.add_playlist')}</AppText>
          <AppText className="text-white text-[20px] text-center font-[900]">+</AppText>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}