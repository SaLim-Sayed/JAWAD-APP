import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Image from './Image';
import { images } from '@/assets/images';
import Col from './Col';
import AppText from './AppText';

const LocationCard = ({ city, region, address }: { city: string, region: string, address: string }) => {
    // Sample static map image URI (in production, use a real map API)

    return (
        <View className="bg-brownColor-50 flex-row justify-between items-center rounded-2xl p-4">
            {/* Header */}
            <Col className='w-1/2'>
                <AppText className="text-brownColor-400 tajawal-medium-20">{city}</AppText>
                <AppText className="text-brownColor-300 tajawal-16">{region}</AppText>
                <AppText className="text-brownColor-300 tajawal-light-16">{address}</AppText>
            </Col>
            <Image
                source={images.maskMap}
                className="w-32 h-32 rounded-full"
                resizeMode="cover"
                background
            >
                <Image
                    source={images.maskMap2}
                    className="w-24 h-24 rounded-full"
                 />
            </Image>
         

        </View>
    );
};
 

export default LocationCard;