import logo from '@/assets/images/splash.png';
import React from 'react';
import { ActivityIndicator, Image, View } from 'react-native';
import AppWrapper from './AppWrapper';
export default function LoaderScreen() {
    return (
        <AppWrapper>
            <View className="flex-1 justify-center items-center ">
                <Image
                    source={logo}
                    className="w-40 h-64"
                />
                <ActivityIndicator
                    size="large"
                    color="#FFFFFF"
                    style={{ marginTop: 20 }}
                />
            </View>
        </AppWrapper>
    );
}