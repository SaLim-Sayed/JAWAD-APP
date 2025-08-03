import Image from "@/components/UI/Image";
import React from "react";
import { TouchableOpacity, View } from "react-native";
import { HorseDetail } from "../@types/horse.types";
import PictureGallery from "@/components/UI/PictureGallery";
import { navigationEnums } from "@/provider/navigationEnums";
import { Icons } from "@/constants";
import useGlobalNavigation from "@/provider/useGlobalNavigation";
import { useAuthStore } from "@/store/useAuthStore";

const HorseDetailsHeader = ({ horse }: { horse: HorseDetail }) => {
    const {authData}=useAuthStore()
    const { navigate } = useGlobalNavigation()
    const isadmin=authData?.role==='stable'||authData?.role==='photographer'
    return (
        <View className="mb-4 relative" >
            <PictureGallery pictures={horse.picUrls.map((url, index) => ({ id: index, url }))} />
            {isadmin&&<TouchableOpacity className="absolute top-2 right-2" onPress={() => navigate(navigationEnums.HORSE_EDIT, { id: horse._id })}>
                <Icons.edit />
            </TouchableOpacity>}
        </View>
    );
};

export default HorseDetailsHeader;
