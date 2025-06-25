import React, { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { FlatList, View, ViewToken } from "react-native";
import { OnboardItem } from "../@types/OnboardItem";
import Navbar from "./Navbar";
import { onboardData } from "./onboardData";
import OnboardingBox from "./OnboardingBox";

export default function Onboarding() {
  const flatListRef = useRef<FlatList<OnboardItem>>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const { i18n } = useTranslation();
  const isRTL = i18n.dir() === "rtl";

  const handleNext = () => {
    const newIndex = isRTL ? currentIndex - 1 : currentIndex + 1;
    if ((isRTL && newIndex >= 0) || (!isRTL && newIndex < onboardData.length)) {
      flatListRef.current?.scrollToIndex({ index: newIndex, animated: true });
      setCurrentIndex(newIndex);
    }
  };

  const handleBack = () => {
    const newIndex = isRTL ? currentIndex + 1 : currentIndex - 1;
    if ((isRTL && newIndex < onboardData.length) || (!isRTL && newIndex >= 0)) {
      flatListRef.current?.scrollToIndex({ index: newIndex, animated: true });
      setCurrentIndex(newIndex);
    }
  };

  const viewabilityConfig = { viewAreaCoveragePercentThreshold: 50 };

  const onViewRef = useRef(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      if (viewableItems.length > 0) {
        setCurrentIndex(viewableItems[0].index ?? 0);
      }
    }
  );

  const currentButtons = onboardData[currentIndex]?.buttons;

  return (
    <View className="flex-1 bg-transparent">
      {currentIndex > 0 && <Navbar
        handleBack={isRTL ? handleNext : handleBack}
      />}
      
      <FlatList
        ref={flatListRef}
        data={onboardData}
        renderItem={({ item }) => (
          <OnboardingBox
            item={item}
            currentButtons={currentButtons}
            handleNext={handleNext}
            handleBack={handleBack}
          />
        )}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        inverted={isRTL}
        keyExtractor={(_, index) => index.toString()}
        onViewableItemsChanged={onViewRef.current}
        viewabilityConfig={viewabilityConfig}
      />
    </View>
  );
}
