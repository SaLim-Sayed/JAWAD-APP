import AppText from "@/components/UI/AppText";
import Row from "@/components/UI/Row";
import StableCard from "@/components/UI/StableCard";
import React from "react";
import { FlatList, TouchableOpacity, View } from "react-native";

interface Stable {
    id: number;
    image: any;
    name: string;
    type: string;
    rating: number;
}

interface BestStableSectionProps {
    bestStables: Stable[];
    onSeeAll?: () => void;
}

const BestStableSection: React.FC<BestStableSectionProps> = ({ bestStables, onSeeAll }) => (
    <View className="">
        <Row className="mx-4 mt-2 mb-2 py-2 flex-row w-[90%] justify-between items-center">
            <AppText className="font-bold text-brownColor-400 text-lg">The Best Stable</AppText>
            <TouchableOpacity onPress={onSeeAll}>
                <AppText className="text-brownColor-400  text-sm">See All</AppText>
            </TouchableOpacity>
        </Row>
        <FlatList
            numColumns={2}
            data={bestStables}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item) => item.id.toString()}
            columnWrapperStyle={{gap:6}}
            contentContainerStyle={{ alignItems: "center", gap: 20 }}
            renderItem={({ item }) => (
                <StableCard
                    image={item.image}
                    name={item.name}
                    type={item.type}
                    rating={item.rating}
                    onPressStart={() => { /* handle start now */ }}
                />
            )}
        />
    </View>
);

export default BestStableSection;