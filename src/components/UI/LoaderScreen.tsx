import React from 'react';
import { View, Image, ActivityIndicator } from 'react-native';
import AppText from './AppText';
import logo from '@/assets/images/wish-icon.png';
import AppWrapper from './AppWrapper';
export default function LoaderScreen() {
    return (
        <AppWrapper>
            <View className="flex-1 justify-center items-center ">
                <Image
                    source={logo}
                    className="w-24 h-24"
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