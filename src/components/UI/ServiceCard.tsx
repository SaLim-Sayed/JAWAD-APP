import React from "react";
import { View, TouchableOpacity } from "react-native";
import { Icons } from "@/constants";
import AppText from "./AppText";
import Image from "./Image";
import NavButton from "@/packages/Onboarding/components/NavbarButton";

interface ServiceCardProps {
    title: string;
    image: any;
    onPress: () => void;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ title, image, onPress }) => {
    return (
        <TouchableOpacity
            className="w-[180px] bg-white rounded-xl mb-3 mx-2 shadow-sm"
            activeOpacity={0.85}
            onPress={onPress}
        >
            <View className="w-full h-[190px] rounded-xl overflow-hidden">
                <Image
                    source={image}
                    className="w-full h-[190px]"
                    resizeMode="cover"
                    background
                >
                    <View className="p-3 flex-col flex-1 items-start justify-between">
                        <View className="flex-row items-center self-start bg-[#E9E5E1] rounded-2xl px-3 py-1">

                            <AppText className="font-semibold text-brownColor-400 text-base ">{title}</AppText>
                        </View>
                        <NavButton
                            className="w-32 h-8"
                            text="Start Now"
                            onPress={() => onPress()}
                            iconLeft={
                                <View className="flex items-center justify-center h-9 p-2 w-9 rounded-full bg-amber-950">
                                    <Icons.arrowRight className="text-white" />
                                </View>
                            }
                        />
                    </View>
                </Image>
            </View>

        </TouchableOpacity>
    );
};

export default ServiceCard;