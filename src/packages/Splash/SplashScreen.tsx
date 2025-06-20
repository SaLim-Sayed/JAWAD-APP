import { images } from '@/assets/images';
import Image from '@/components/UI/Image';
import React from 'react';
import { View } from 'react-native';
export default function SplashScreen() {
    return (
        <View className="flex-1 justify-center items-center bg-white ">
            <Image source={images.splash} />
        </View>
    );
}