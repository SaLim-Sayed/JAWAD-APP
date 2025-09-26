import LoaderBoundary from "@/components/UI/LoaderBoundary";
import StableCard from "@/components/UI/StableCard";
import { useApiQuery } from "@/hooks";
import { apiKeys } from "@/hooks/apiKeys";
import { navigationEnums } from "@/provider/navigationEnums";
import useGlobalNavigation from "@/provider/useGlobalNavigation";
import React from "react";
import { FlatList, View } from "react-native";
import { GetStablesResponse } from "../../home/@types/stable.type";
import AppText from "@/components/UI/AppText";
import { t } from "@/lib";

interface Stable {
    id: number;
    image: any;
    name: string;
    type: string;
    rating: number;
}

interface BestStableSectionProps {
    search?: string;
    filters: {
        level: string[];
        feature: string[];
        color: string[];
        rating: number;
        vehicles: string[];
    };
}

const BestStableSection: React.FC<BestStableSectionProps> = ({ search = "", filters }) => {
    const { level, feature, color, rating , vehicles } = filters;

    const queryParams = new URLSearchParams({
        page: "1",
        search,
        ...(level.length && { level: level.join(",") }),
        ...(feature.length && { feature: feature.join(",") }),
        ...(color.length && { color: color.join(",") }),
        ...(rating > 0 && { rating: rating.toString() }),
        ...(vehicles.length && { vehicles: vehicles.join(",") }),
    });
    const { data, isLoading } = useApiQuery<GetStablesResponse>({
        key: ["getStable", search, filters],
        url: `${apiKeys.stable.getStable}?${queryParams.toString()}`,
    });
    const { navigate } = useGlobalNavigation();
    return (
        <View className="flex-1">
            <LoaderBoundary isLoading={isLoading}>
                {data?.stables ? (
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
                                status={item.status}
                                onPressStart={() => { navigate(navigationEnums.STABLE_SERVICES_DETAILS, { id: item._id }) }}
                            />
                        )}
                    />
                ) :
                    (
                        <View className="flex-1 items-center justify-center">
                            <AppText className="text-brownColor-400 text-2xl">{t("Global.no_data")}</AppText>
                        </View>
                    )
                }
            </LoaderBoundary>
        </View>
    );
}
export default BestStableSection;