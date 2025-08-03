import LoaderBoundary from "@/components/UI/LoaderBoundary";
import StableCard from "@/components/UI/StableCard";
import { useApiQuery } from "@/hooks";
import { apiKeys } from "@/hooks/apiKeys";
import { navigationEnums } from "@/provider/navigationEnums";
import useGlobalNavigation from "@/provider/useGlobalNavigation";
import React from "react";
import { FlatList, View } from "react-native";
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
    const { data, isLoading } = useApiQuery<GetStablesResponse>({
        key: ["getStable"],
        url: apiKeys.stable.getStable + 1,
    })
    const { navigate } = useGlobalNavigation();
    return (
        <View className="flex-1">
            <LoaderBoundary isLoading={isLoading}>
                <FlatList
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
                            id={item._id}
                            image={item.picUrl}
                            name={item.name}
                            type={item.region}
                            rating={item.totalRating}
                            onPressStart={() => { navigate(navigationEnums.STABLE_SERVICES_DETAILS, { id: item._id }) }}
                        />
                    )}
                />
            </LoaderBoundary>
        </View>
    );
}
export default BestStableSection;