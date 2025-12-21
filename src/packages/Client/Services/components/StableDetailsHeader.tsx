import AppText from "@/components/UI/AppText";
import Col from "@/components/UI/Col";
import Image from "@/components/UI/Image";
import Row from "@/components/UI/Row";
import { Icons } from "@/constants";
import useGlobalNavigation from "@/provider/useGlobalNavigation";
import { useLanguage } from "@/store";
import React from "react";
import { Dimensions, View } from "react-native";
import { StableDetails } from "../@types/horse.types";
import { MapPinIcon, ReceiptPercentIcon} from 'react-native-heroicons/outline';

const StableDetailsHeader = ({ StableDetails }: { StableDetails: StableDetails }) => {

    const { language } = useLanguage();
    const infoRows = [
      [
        {icon: Icons.horse, text: StableDetails.name[language]},

        {
          icon: ReceiptPercentIcon,
          text: StableDetails.sessionPercentage,
        },
      ],
      
      [
        {icon: MapPinIcon, text: StableDetails.city[language]},
        {icon: MapPinIcon, text: StableDetails.region[language]},
      ],
    ];

    return (
        <View className="mb-4">
            <Image
                source={StableDetails.picUrl}
                className="w-full h-48"
                resizeMode="stretch"
            />

            <View className="px-4 w-[90%] mt-4 gap-4">
                {infoRows.map((row, rowIndex) => (
                    <Row key={rowIndex} justify="between" className="w-[90%] mb-2">
                        {row.map((item, colIndex) => (
                            <Row
                                key={colIndex}
                                gap={6}
                                items="start"
                                justify="start"
                                className="w-[40%]"
                            >
                                <Image source={item.icon} className="w-6 h-6" />
                                <AppText className="text-brownColor-400 font-bold">
                                    {item.text}
                                </AppText>
                            </Row>
                        ))}
                    </Row>
                ))}
            </View>
        </View>
    );
};

export default StableDetailsHeader;
