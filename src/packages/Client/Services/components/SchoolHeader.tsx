import { images } from "@/assets/images";
import Image from "@/components/UI/Image";
import useGlobalNavigation from "@/provider/useGlobalNavigation";
import React from "react";
import { Dimensions, View } from "react-native";
import { TSchoolProps } from "../../home/@types/school.types";

const SchoolHeader = ({ school }: { school: TSchoolProps }) => {
     const screenWidth = Dimensions.get("window").width;
 
    return (
        <View className="mb-4 flex-col  gap-6" >

            <Image source={school?.picUrl || images.family} resizeMode="stretch" className="w-full h-40" />


        </View>
    );
};

export default SchoolHeader;
