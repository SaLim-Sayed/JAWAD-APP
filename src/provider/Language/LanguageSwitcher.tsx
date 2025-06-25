import AppText from '@/components/UI/AppText';
import Image from '@/components/UI/Image';
import { Icons } from '@/constants';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { I18nManager, Modal, Pressable, View, useWindowDimensions } from 'react-native';
import { useLanguage } from '../../store/useLanguage';
import { images } from '@/assets/images';
 
const LanguageOption = ({ label, onPress, icon }: { label: string; onPress: () => void, icon: string }) => (
  <Pressable
    hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
    onPress={onPress}
    className="w-full py-2 px-3 flex-row gap-4 items-center justify-between rounded-lg"
  >
    <AppText  className="text-lg text-brownColor-400 text-left">{label}</AppText>
    <Image source={icon} style={{width: 16, height: 16}}/>

  </Pressable>
);

const LanguageSwitcher = React.memo(() => {
  const { t } = useTranslation();
  const { language, setLanguage, dir } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<View>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const { width, height } = useWindowDimensions();

  const isRTL = dir === 'rtl' || I18nManager.isRTL;

  // Open/close modal
  const toggleModal = useCallback(() => setIsOpen(prev => !prev), []);

  // Change language and close
  const changeLng = (lng: 'en' | 'ar') => {
    setLanguage(lng);
    setIsOpen(false);
  };

  // Measure button position for dropdown
  useEffect(() => {
    if (isOpen) {
      ref.current?.measureInWindow((x, y, _w, h) => {
        setOffset(prev => {
          if (prev.x !== x || prev.y !== y + h) {
            return { x, y: y + h };
          }
          return prev;
        });
      });
    }
  }, [isOpen, isRTL, width, height]);

  return (
    <View className='absolute top-40 rtl:right-4 ltr:left-4 z-50' ref={ref} collapsable={false}>
      <Pressable onPress={toggleModal} className="rounded-xl border border-slate-300 bg-white h-[42px] w-[100px] flex-row items-center justify-center px-2 gap-2">
        <AppText className="text-base text-brownColor-400 ">{language === 'ar' ? 'العربية' : 'English'}</AppText>
        <Image source={Icons.arrowCircleDown}/>
      </Pressable>
      <Modal transparent visible={isOpen} animationType="none">
        <Pressable
          onPress={toggleModal}
          className="absolute top-0 left-4 w-full h-full"
        >
          <View
            className="absolute bg-white border border-slate-300 rounded-xl"
            style={{
              width: 100,
              top: offset.y + 8,
              left: 0,
              gap: 2,
              padding: 0,
            }}
          >
            <LanguageOption label="English" onPress={() => changeLng('en')}  icon={images.en} />
            <View className="h-px bg-slate-200 w-full my-1" />
            <LanguageOption label="العربية" onPress={() => changeLng('ar')} icon={images.ar} />
          </View>
        </Pressable>
      </Modal>
    </View>
  );
});

export default LanguageSwitcher;