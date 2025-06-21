import React, { useState, useRef } from 'react';
import { View, FlatList, Dimensions } from 'react-native';
import { images } from '@/assets/images';
import { Icons } from '@/constants';
import AppText from '@/components/UI/AppText';
import { useAuthStore } from '@/store/useAuthStore';
import OnboardingBox from './OnboardingBox';
import NavButton from './NavbarButton';
import Navbar from './Navbar';

type OnboardItem = {
  title: string;
  description: string;
  image: any;
  buttons: { text: string; action: 'back' | 'next'; disabled?: boolean }[];
};

const onboardData: OnboardItem[] = [
  {
    title: 'Discover The Best Stables Near You',
    description:
      "Explore Top-Rated Stables For Horse Riding, All in One Place. Whether You're A Beginner Or An Experienced Rider, Find The Perfect Stable To Suit Your Needs.",
    image: images.onboard1,
    buttons: [
      { text: 'Back', action: 'back', disabled: true },
      { text: 'Next', action: 'next' },
    ],
  },
  {
    title: 'Find Your Perfect Riding Experience',
    description:
      "Explore Top-Rated Stables For Horse Riding, All in One Place. Whether You're A Beginner Or An Experienced Rider, Find The Perfect Stable To Suit Your Needs.",
    image: images.onboard2,
    buttons: [
      { text: 'Back', action: 'back' },
      { text: 'Start', action: 'next' },
    ],
  },
  {
    title: 'Find Your Perfect Riding Experience',
    description:
      "Explore Top-Rated Stables For Horse Riding, All in One Place. Whether You're A Beginner Or An Experienced Rider, Find The Perfect Stable To Suit Your Needs.",
    image: images.onboard3,
    buttons: [
      { text: 'Back', action: 'back' },
      { text: 'Start', action: 'next' },
    ],
  },
  {
    title: '',
    description: '',
    image: images.onboard3,
    buttons: [],
  },
];

export default function Onboarding() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList<OnboardItem>>(null);

  const handleNext = () => {
    if (currentIndex < onboardData.length - 1) {
      flatListRef.current?.scrollToIndex({ index: currentIndex + 1, animated: true });
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handleBack = () => {
    if (currentIndex > 0) {
      flatListRef.current?.scrollToIndex({ index: currentIndex - 1, animated: true });
      setCurrentIndex(currentIndex - 1);
    }
  };

  const onScrollEnd = (e: any) => {
    const { contentOffset, layoutMeasurement } = e.nativeEvent;
    const pageNum = Math.floor(contentOffset.x / layoutMeasurement.width);
    setCurrentIndex(pageNum);
  };

  const currentButtons = onboardData[currentIndex].buttons;

  return (
    <View className="flex-1 bg-transparent">

      {currentIndex > 0 && <Navbar handleBack={handleBack} />
      }
      <FlatList
        ref={flatListRef}
        data={onboardData}
        renderItem={({ item }) => <OnboardingBox item={item} currentButtons={currentButtons} handleNext={handleNext} handleBack={handleBack} />}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={onScrollEnd}
        keyExtractor={(_, index) => index.toString()}
      />

 
    </View>
  );
}