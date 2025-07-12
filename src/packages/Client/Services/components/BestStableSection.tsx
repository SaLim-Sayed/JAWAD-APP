import AppText from "@/components/UI/AppText";
import Row from "@/components/UI/Row";
import StableCard from "@/components/UI/StableCard";
import { useApiQuery } from "@/hooks";
import { navigationEnums } from "@/provider/navigationEnums";
import useGlobalNavigation from "@/provider/useGlobalNavigation";
import React from "react";
import { FlatList, TouchableOpacity, View } from "react-native";
import { apiKeys } from "@/hooks/apiKeys";
import { GetStablesResponse } from "../../home/@types/stable.type";

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

const BestStableSection: React.FC<BestStableSectionProps> = ({ bestStables, onSeeAll }) => {
    const { data } = useApiQuery<GetStablesResponse>({
        key: ["getStable"],
        url: apiKeys.stable.getStable+1,
    })
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
                data={data?.stables}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item) => item._id.toString()}
                columnWrapperStyle={{ gap: 6 }}
                contentContainerStyle={{
                    alignItems: "center", gap: 20, paddingBottom: 220,
                }}
                renderItem={({ item }) => (
                    <StableCard
                        image={item.picUrl}
                        name={item.name}
                        type={item.region}
                        rating={item.totalRating}
                        onPressStart={() => { navigate(navigationEnums.STABLE_SERVICES_DETAILS, { id: item._id }) }}
                    />
                )}
            />
        </View>
    );
}
export default BestStableSection;