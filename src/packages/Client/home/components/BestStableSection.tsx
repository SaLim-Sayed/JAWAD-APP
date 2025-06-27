import React from "react";
import { View, FlatList, TouchableOpacity } from "react-native";
import AppText from "@/components/UI/AppText";
import AppButton from "@/components/UI/AppButton";
import Row from "@/components/UI/Row";
import Image from "@/components/UI/Image";
import { Icons } from "@/constants";
import { StarRatingDisplay } from 'react-native-star-rating-widget';
import NavButton from "@/packages/Onboarding/components/NavbarButton";
import Col from "@/components/UI/Col";

interface Stable {
    id: number;
    image: any;
    name: string;
    type: string;
    rating: number;
}

interface BestStableSectionProps {
    bestStables: Stable[];
    onSeeAll?: () => void;
}

const BestStableSection: React.FC<BestStableSectionProps> = ({ bestStables, onSeeAll }) => (
    <>
        <Row className="mx-4 mt-2 mb-2 py-2 flex-row w-[90%] justify-between items-center">
            <AppText className="font-bold text-brownColor-400 text-lg">The Best Stable</AppText>
            <TouchableOpacity onPress={onSeeAll}>
                <AppText className="text-brownColor-400  text-sm">See All</AppText>
            </TouchableOpacity>
        </Row>
        <FlatList
            horizontal
            data={bestStables}
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={{ paddingLeft: 16, paddingRight: 16, alignItems: "center" }}
            renderItem={({ item }) => (
                <View className="bg-white rounded-2xl mr-4 w-[186px]  shadow items-start">
                    <Image className="rounded-t-2xl" source={item.image} style={{ width: "100%", height: 108  }} />
                    <Col className="p-2" gap={4}>
                        <Row items="center" gap={4}>
                            <Image source={Icons.location} style={{ width: 24, height: 24, borderRadius: 12 }} />
                            <AppText className="font-bold tajawal-semibold-20 text-brownColor-400 mt-2">{item.name}</AppText>

                        </Row>
                        <Row items="center" gap={4}>
                            <Image source={Icons.stable} style={{ width: 24, height: 24, borderRadius: 12 }} />
                            <AppText className="text-brownColor-300   ">{item.type}</AppText>

                        </Row>
                        <Row gap={2} className="my-2" >
                            <StarRatingDisplay
                                rating={item.rating}
                                starStyle={{ width: 20, height: 14 }}
                                color="#FEAF48"

                            />
                            <AppText className="pt-4 text-brownColor-400 text-sm">{item.rating}</AppText>
                        </Row>
                        <Row gap={2} items="center" className="my-2 gap-2" >

                            <NavButton
                                className="w-32 h-8"
                                text="Start Now"
                                onPress={() => { }}
                                iconLeft={
                                    <View className="flex items-center justify-center h-8 p-2 w-8 rounded-full bg-amber-950">
                                        <Icons.arrowRight className="text-white" />
                                    </View>
                                }
                            />
                            <Image source={Icons.camera} style={{ width: 24, height: 24, borderRadius: 12 }} />
                            <Image source={Icons.horse} style={{ width: 24, height: 24, borderRadius: 12 }} />
                        </Row>
                    </Col>
                </View>
            )}
        />
    </>
);

export default BestStableSection;