import AppText from "@/components/UI/AppText";
import StableCard from "@/components/UI/StableCard";
import { useApiQuery } from "@/hooks";
import { apiKeys } from "@/hooks/apiKeys";
import { navigationEnums } from "@/provider/navigationEnums";
import useGlobalNavigation from "@/provider/useGlobalNavigation";
import React from "react";
import { FlatList, TouchableOpacity, View } from "react-native";
import { GetStablesResponse } from "../@types/stable.type";
import { useStableStore } from "@/store/useStableStore";
 
interface Stable {
    id: number;
    image: any;
    name: string;
    type: string;
    rating: number;
}

interface BestStableSectionProps {
    bestStables?: Stable[];
    onSeeAll?: () => void;
}

const BestStableSection: React.FC<BestStableSectionProps> = ({ bestStables, onSeeAll }) => {
    const { data } = useApiQuery<GetStablesResponse>({
        key: ["getStable"],
        url: apiKeys.stable.getStable+1,
    })
    const {setStableId}=useStableStore()
    const { navigate } = useGlobalNavigation();
    const handleNavigation=(id:string)=>{
        setStableId(id)
        navigate(navigationEnums.STABLE_SERVICES_DETAILS, { id: id })
    }
        return (
        <>
            <View className="mx-4 mt-2 mb-2 py-2 flex-row w-[90%] justify-between items-center">
                <AppText className="font-bold text-brownColor-400 text-lg">The Best Stable</AppText>
                <TouchableOpacity onPress={onSeeAll}>
                    <AppText className="text-brownColor-400  text-sm">See All</AppText>
                </TouchableOpacity>
            </View>
            <FlatList
                horizontal
                data={data?.stables}
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item) => item._id.toString()}
                contentContainerStyle={{ paddingLeft: 16, paddingRight: 16, alignItems: "center", gap: 6 }}
                renderItem={({ item }) => (
                    <StableCard
                        id={item._id}
                        image={item.picUrl}
                        name={item.name.slice(0, 15)}
                        type={item.region}
                        rating={item.totalRating}
                        onPressStart={()=>handleNavigation(item._id)}
                    />
                )}
            />
        </>
    );
}

export default BestStableSection;