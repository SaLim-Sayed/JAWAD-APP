import AppText from '@/components/UI/AppText';
import Image from '@/components/UI/Image';
import { Icons } from '@/constants';
import { isRTL } from '@/provider/constant';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';

type SettingsListItemProps = {
    label: string;
    icon: any; // Image source (e.g., require or URI)
    onPress?: () => void;
    style?: any; // Optional extra styles for container
    testID?: string;
};

const SettingsListItem: React.FC<SettingsListItemProps> = ({
    label,
    icon,
    onPress,
    style,
    testID,
}) => (
    <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.7}
        style={style}
        testID={testID}
    >
        <View className="flex-row flex-1 items-center w-full bg-[#FBF8F6] rounded-3xl px-2 ">
            <View className="flex-row flex-1 items-center w-full bg-[#FBF8F6] rounded-3xl px-2 py-2">
                <View className="bg-white rounded-xl w-16 h-16 items-center justify-center mr-4">
                    <Image source={icon} stroke="#000" resizeMode="contain" />
                </View>
                <AppText className=" text-black text-xl tajawal-medium">{label}</AppText>
            </View>
            <Image source={Icons.arrow}
                style={{
                    transform: [{ rotate: `${isRTL ? 180 : 0}deg` }],
                }}
                stroke="#000" resizeMode="contain" />
        </View>

    </TouchableOpacity>
);

export default SettingsListItem;