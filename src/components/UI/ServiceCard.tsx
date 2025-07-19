import React from "react";
import { View, TouchableOpacity } from "react-native";
import { Icons } from "@/constants";
import AppText from "./AppText";
import Image from "./Image";
import NavButton from "@/packages/Onboarding/components/NavbarButton";
import { isRTL } from "@/provider/constant";
import { useTranslation } from "react-i18next";

interface ServiceCardProps {
    title: string;
    image: any;
    onPress: () => void;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ title, image, onPress }) => {
    const {t}=useTranslation()
    return (
        <TouchableOpacity
            className="w-[180px] bg-white rounded-xl mb-3  shadow-sm"
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
                            text={t("Global.start_now")}
                            onPress={() => onPress()}
                            iconLeft={
                                <View className="flex items-center justify-center h-10 p-2 w-10 rounded-full bg-amber-950">
                                    <Icons.arrowRight style={{ transform: [{ rotate: `${isRTL ? 180 : 0}deg` }],margin: 4,width: 20, height: 20 }} className="text-white w-4 h-4" />
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