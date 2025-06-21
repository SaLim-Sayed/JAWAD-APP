import React from 'react';
import { View, TouchableOpacity, ImageBackground, Dimensions, StatusBar } from 'react-native';
import AppText from '@/components/UI/AppText';
import { cn } from '@/lib';
import { useAuthStore } from '@/store/useAuthStore';
import NavButton from './NavbarButton';
import { Icons } from '@/constants';

type OnboardItem = {
    title: string;
    description: string;
    image: any;
    buttons: { text: string; action: 'back' | 'next'; disabled?: boolean }[];
};

type RenderItemProps = {
    item: OnboardItem;
    handleNext: () => void;
    handleBack: () => void;
    currentButtons: { text: string; action: 'back' | 'next'; disabled?: boolean }[];
};

export default function OnboardingBox({ item, currentButtons, handleNext, handleBack }: RenderItemProps) {
    const { width, height } = Dimensions.get('window');

    return (
        <ImageBackground
            source={item.image}
            style={{ width, height: "100%" }}
            resizeMode="cover"
            className="justify-end"
        >
            <StatusBar hidden={false} translucent backgroundColor="transparent" barStyle="light-content" />

            <View className={cn("bg-white/60  relative rounded-t-3xl p-8 mx-4 mb-8", !item.description && "bg-transparent")}>
                {item.title && (
                    <AppText className="tajawal-medium-20 text-center mb-4 text-brownColor-300">
                        {item.title}
                    </AppText>
                )}
                {item.description ? (
                    <AppText className="text-brownColor-300 text-center mb-8 tajawal-16">
                        {item.description}
                    </AppText>
                ) : (
                    <View className="items-center">
                        <TouchableOpacity
                            className="bg-brownColor-400 px-6 py-2 rounded-2xl mb-4 w-full items-center"
                            activeOpacity={0.8}
                        >
                            <AppText className="text-brownColor-50 tajawal-semibold-16">Sign In</AppText>
                        </TouchableOpacity>
                        <TouchableOpacity
                            className="bg-brownColor-400 px-6 py-2 rounded-2xl mb-4 w-full items-center"
                            activeOpacity={0.8}
                        >
                            <AppText className="text-brownColor-50 tajawal-semibold-16">Sign up</AppText>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => useAuthStore.getState().setActiveApp('Client')}
                            className="bg-brownColor-50 px-6 py-2 rounded-2xl mb-4 w-full items-center"
                            activeOpacity={0.6}
                        >
                            <AppText className="text-brownColor-400 tajawal-semibold-16">View as A GUEST</AppText>
                        </TouchableOpacity>
                    </View>
                )}
                {currentButtons.length > 0 && (
                    <View className="absolute bottom-0 left-0 right-0 px-8">
                        <View className="flex-row justify-between">
                            {currentButtons[0] && (
                                <NavButton
                                    text={currentButtons[0].text}
                                    onPress={handleBack}
                                    disabled={currentButtons[0].disabled}
                                    iconLeft={
                                        <View className="flex items-center justify-center h-12 p-4 w-12 rounded-full bg-amber-950">
                                            <Icons.arrowLeft className="text-white" />
                                        </View>
                                    }
                                />
                            )}
                            {currentButtons[1] && (
                                <NavButton
                                    text={currentButtons[1].text}
                                    onPress={handleNext}
                                    iconRight={
                                        <View className="flex items-center justify-center h-12 p-4 w-12 rounded-full bg-amber-950">
                                            <Icons.arrowRight className="text-white" />
                                        </View>
                                    }
                                />
                            )}
                        </View>
                    </View>
                )}
            </View>
        </ImageBackground>
    );
}