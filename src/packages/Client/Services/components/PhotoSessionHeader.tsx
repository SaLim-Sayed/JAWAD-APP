import AppText from "@/components/UI/AppText";
import Col from "@/components/UI/Col";
import Image from "@/components/UI/Image";
import Row from "@/components/UI/Row";
import { Icons } from "@/constants";
import useGlobalNavigation from "@/provider/useGlobalNavigation";
import React from "react";
import { Dimensions, FlatList, View } from "react-native";
import { photoSessionData } from "../screens/mock";
import { Photographer } from "../../Photo-session/@types/photography.types";
import PictureGallery from "@/components/UI/PictureGallery";
import BestStableSection from "./BestStableSection";

const PhotoSessionHeader = ({photographer}: {photographer:Photographer}) => {
    const { navigate } = useGlobalNavigation();
    const screenWidth = Dimensions.get("window").width;
    const itemSize = screenWidth / 4 - 16;

    return (
        <View className="mb-4 flex-col  gap-6" >
            <PictureGallery pictures={photographer.picUrls.map((url, index) => ({ id: index, url }))} />

         
            <Row justify="between" items="start" className="px-4 w-full gap-4">
                <Row gap={6} items="center" className="w-full">
                    <Image source={Icons.location} className="w-6 h-6" />
                    <AppText className="text-brownColor-400 font-bold">{photographer.city}</AppText>
                </Row>
                <Row gap={6} items="center" className="w-full">
                    <Image source={Icons.camera} className="w-6 h-6" />
                    <AppText className="text-brownColor-400 font-bold">{photographer.name}</AppText>
                </Row>
            </Row>


        </View>
    );
};

export default PhotoSessionHeader;
