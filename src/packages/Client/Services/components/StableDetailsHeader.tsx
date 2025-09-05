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

const StableDetailsHeader = ({ StableDetails }: { StableDetails: StableDetails }) => {
    const { navigate } = useGlobalNavigation();
    const screenWidth = Dimensions.get("window").width;
    const { language } = useLanguage()
    const itemSize = screenWidth / 4 - 16;

    return (
        <View  className="mb-4" >
            <Image source={StableDetails.picUrl} className="w-full h-48" resizeMode="stretch" />

            {/* <FlatList
                data={horseDate}
                numColumns={4}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={{
                    paddingVertical: 16,
                    height: 120,
                }}
                columnWrapperStyle={{
                    justifyContent: "space-between",
                    marginBottom: 8,
                    gap: 6
                }}
                renderItem={({ item }) => (
                    <Image
                        source={item.image}
                        style={{
                            width: itemSize,
                            height: itemSize,
                        }}
                    />
                )}
            /> */}
            <Row justify="between" items="start" className="px-4 w-full gap-4">
                {/* الصف الأول */}
                <Col justify="between" items="start" gap={6} className="w-full">
                    <Row gap={6} items="center" className="w-full">
                        <Image source={Icons.location} className="w-6 h-6" />
                        <AppText className="text-brownColor-400 font-bold">{StableDetails.city[language]}</AppText>
                    </Row>
                    <Row gap={6} items="center" className="w-full">
                        <Image source={Icons.camera} className="w-6 h-6" />
                        <AppText className="text-brownColor-400 font-bold">{StableDetails.sessionPercentage}</AppText>
                    </Row>
                </Col>

                {/* الصف الثاني */}
                <Col justify="between" items="end" gap={6} className="w-full">
                    <Row gap={6} items="center" className="w-full">
                        <Image source={Icons.coin} className="w-6 h-6" />
                        <AppText className="text-brownColor-400 font-bold">{StableDetails.region[language]}</AppText>
                    </Row>
                    <Row gap={6} items="center" className="w-full">
                        <Image source={Icons.horse} className="w-6 h-6" />
                        <AppText className="text-brownColor-400 font-bold">{StableDetails.address[language]}</AppText>
                    </Row>
                </Col>
            </Row>




        </View>
    );
};

export default StableDetailsHeader;
