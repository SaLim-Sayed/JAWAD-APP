import Image from '@/components/UI/Image';
import { Icons } from '@/constants';
import React from 'react';
import { View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const Navbar = ({ handleBack }: { handleBack: () => void }) => {
    return (
        <LinearGradient
            colors={['rgba(255, 255, 255,1)', 'rgba(255, 255, 255,0.1)']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{
                borderRadius: 20,
            }}
            className="absolute top-12 left-4 right-4 z-50"
        > {/* Logo */}
            <View className="flex-row items-center rounded-2xl justify-between px-6 py-4">

                <Image
                    source={Icons.backArrow} // Make sure you have this in your assets
                    className="w-10 h-10 mr-2"
                    onPress={handleBack}
                />

                <Image
                    source={Icons.jawadapp}
                    className="w-20 h-6"
                    style={{ width: 100 }}
                />

            </View>
        </LinearGradient>
    );
};

export default Navbar;