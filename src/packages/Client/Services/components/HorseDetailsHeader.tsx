import Image from "@/components/UI/Image";
import React from "react";
import { View } from "react-native";
import { bestStables } from "../screens/mock";

const HorseDetailsHeader = () => {
    return (
        <View className="mb-4" >
            <Image source={bestStables[0].image} className="w-full h-48 rounded-xl" />
        </View>
    );
};

export default HorseDetailsHeader;
