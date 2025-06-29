import AppText from "@/components/UI/AppText";
import Image from "@/components/UI/Image";
import Row from "@/components/UI/Row";
import { navigationEnums } from "@/provider/navigationEnums";
import useGlobalNavigation from "@/provider/useGlobalNavigation";
import React from "react";
import { Dimensions, FlatList, TouchableOpacity, View } from "react-native";
import { horseDate } from "../screens/mock";

const HorseSection = () => {
    const { navigate } = useGlobalNavigation();
    const screenWidth = Dimensions.get("window").width;
    const itemSize = screenWidth / 2 - 16;

    return (
        <View className="mb-4" >

            <FlatList
                ListHeaderComponent={() => <Row className="mx-4 mt-2 mb-2 py-2 flex-row w-[90%] justify-between items-center">
                    <AppText className="font-bold text-brownColor-400 text-lg">Horses</AppText>
                    <TouchableOpacity onPress={() => { navigate(navigationEnums.HORSES) }}>
                        <AppText className="text-brownColor-400  text-sm">See All</AppText>
                    </TouchableOpacity>
                </Row>}
                data={horseDate}
                numColumns={2}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={{
                    paddingVertical: 16,
                    height: 180,
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
                            resizeMode: "contain",
                        }}
                        background
                    >
                        <AppText className="tajawal-semibold-16">{item.name}</AppText>
                    </Image>
                )}
            />




        </View>
    );
};

export default HorseSection;
