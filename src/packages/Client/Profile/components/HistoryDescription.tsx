import AppText from "@/components/UI/AppText";
import Col from "@/components/UI/Col";
import Divider from "@/components/UI/Divider";
import Image from "@/components/UI/Image";
import Row from "@/components/UI/Row";
import { Icons } from "@/constants";
import { useLanguage } from "@/store";
import React from "react";
import { View } from "react-native";
import { StarRatingDisplay } from "react-native-star-rating-widget";
 
const HistoryDescription = ({item}: {item: any}) => {
    const {language} =useLanguage()
    return (
        <View className="mb-4 flex-col gap-6" >
 
            
            <Col justify="between" items="start" className="px-4 w-full gap-4">
                <Row gap={6} items="center" className="w-full">
                    <Image source={Icons.location} className="w-6 h-6" />
                    <AppText className="text-brownColor-400 font-bold">{item.stable.name[language]}</AppText>
                </Row>
                <Row gap={6} items="center" className="w-full">
                    <Image source={Icons.calendar} className="w-6 h-6" />
                    <AppText className="text-brownColor-400 font-bold">{item.date}</AppText>
                </Row>
                <Row gap={6} items="center" className="w-full">
                    <Image source={Icons.coin} className="w-6 h-6" />
                    <AppText className="text-brownColor-400 font-bold">{item.totalPrice} EGP</AppText>
                </Row>

                <Row gap={6} items="center" className="w-full">
                    <Image source={Icons.coin} className="w-6 h-6" />
                    <AppText className="text-brownColor-400 font-bold">{item.service} </AppText>
                </Row>
                
            </Col>

            
        </View>
    );
};

export default HistoryDescription;
