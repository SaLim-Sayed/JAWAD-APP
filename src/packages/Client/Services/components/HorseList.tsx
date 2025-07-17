import HorseCard from "@/components/UI/HorseCard";
import { navigationEnums } from "@/provider/navigationEnums";
import useGlobalNavigation from "@/provider/useGlobalNavigation";
import React from "react";
import { FlatList } from "react-native";
import { Horse } from "../@types/horse.types";


interface HorseListProps {
    horses: Horse[];
    onSeeAll?: () => void;
}

const HorseList: React.FC<HorseListProps> = ({ horses, onSeeAll }) => {
    const { navigate } = useGlobalNavigation();

    return (

        <FlatList

            numColumns={2}
            data={horses}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item) => item._id.toString()}
            columnWrapperStyle={{ gap: 6 }}
            contentContainerStyle={{
                alignItems: "center", gap: 20, paddingBottom: 220,
            }}
            renderItem={({ item }) => (
                <HorseCard
                    image={item.picUrls[0]}
                    name={item.name}
                    type={item.type}
                    price={item.price}
                    category={item.type}
                    onPressStart={() => { navigate(navigationEnums.HORSE_DETAILS, { id: item._id }) }}
                />
            )}
        />
    );
}
export default HorseList;