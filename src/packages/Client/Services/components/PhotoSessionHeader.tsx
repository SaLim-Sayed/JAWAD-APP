import AppText from "@/components/UI/AppText";
import Col from "@/components/UI/Col";
import Image from "@/components/UI/Image";
import Row from "@/components/UI/Row";
import { Icons } from "@/constants";
import useGlobalNavigation from "@/provider/useGlobalNavigation";
import React from "react";
import { Dimensions, FlatList, View } from "react-native";
import { photoSessionData } from "../screens/mock";

const PhotoSessionHeader = () => {
    const { navigate } = useGlobalNavigation();
    const screenWidth = Dimensions.get("window").width;
    const itemSize = screenWidth / 4 - 16;

    return (
        <View className="mb-4 flex-col gap-6" >
            <Image source={photoSessionData[5].image} className="w-full h-48" />

            <FlatList
                data={photoSessionData.slice(0, 4)}
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
            />
            <Row justify="between" items="start" className="px-4 w-full gap-4">
                <Row gap={6} items="center" className="w-full">
                    <Image source={Icons.location} className="w-6 h-6" />
                    <AppText className="text-brownColor-400 font-bold">Pyramids (Saqqara)</AppText>
                </Row>
                <Row gap={6} items="center" className="w-full">
                    <Image source={Icons.camera} className="w-6 h-6" />
                    <AppText className="text-brownColor-400 font-bold">Photo sessions</AppText>
                </Row>
            </Row>


            <AppText className="text-brownColor-300 text-center my-4 tajawal-16  ">
                Lorem ipsum dolor sit amet consectetur. Sagittis consectetur sed lacus sem sed duis. Nisi imperdiet orci auctor amet lorem libero eu egestas. Non varius ut libero ullamcorper et enim faucibus nec vitae. Auctor sed
            </AppText>

        </View>
    );
};

export default PhotoSessionHeader;
