import Image from "@/components/UI/Image";
import React from "react";
import { View } from "react-native";
import { HorseDetail } from "../@types/horse.types";
import PictureGallery from "@/components/UI/PictureGallery";

const HorseDetailsHeader = ({ horse }: { horse: HorseDetail }) => {
    return (
        <View className="mb-4" >
            <PictureGallery pictures={horse.picUrls.map((url, index) => ({ id: index, url }))} />
        </View>
    );
};

export default HorseDetailsHeader;
