import AppText from "@/components/UI/AppText";
import Row from "@/components/UI/Row";
import StableCard from "@/components/UI/StableCard";
import { navigationEnums } from "@/provider/navigationEnums";
import useGlobalNavigation from "@/provider/useGlobalNavigation";
import React from "react";
import { FlatList, TouchableOpacity, View } from "react-native";
import { bestStables, horseDate } from "../screens/mock";
import HorseCard from "@/components/UI/HorseCard";

interface Horse {
    id: number;
    image: any;
    name: string;
    type: string;
    price: number;
    category: string;
}

interface HorseListProps {
    horses: Horse[];
    onSeeAll?: () => void;
}

const HorseList: React.FC<HorseListProps> = ({ horses, onSeeAll }) => {
    const { navigate } = useGlobalNavigation();
    return (
        <View className="">

            <FlatList
                ListHeaderComponent={() => <Row className="mx-4 mt-2 mb-2 py-2 flex-row w-[90%] justify-between items-center">
                    <AppText className="font-bold text-brownColor-400 text-lg">The Best Stable</AppText>
                    <TouchableOpacity onPress={onSeeAll}>
                        <AppText className="text-brownColor-400  text-sm">See All</AppText>
                    </TouchableOpacity>
                </Row>}
                numColumns={2}
                data={horseDate}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item) => item.id.toString()}
                columnWrapperStyle={{ gap: 6 }}
                contentContainerStyle={{
                    alignItems: "center", gap: 20, paddingBottom: 220,
                }}
                renderItem={({ item }) => (
                    <HorseCard
                        image={item.image}
                        name={item.name}
                        type={item.type}
                        price={item.price}
                        category={item.category}
                        onPressStart={() => { navigate(navigationEnums.HORSE_DETAILS, { id: item.id }) }}
                    />
                )}
            />
        </View>
    );
}
export default HorseList;