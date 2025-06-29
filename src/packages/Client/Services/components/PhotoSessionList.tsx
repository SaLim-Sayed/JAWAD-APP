import AppText from "@/components/UI/AppText";
import PhotoSessionCard from "@/components/UI/PhotoSessionCard";
import Row from "@/components/UI/Row";
import StableCard from "@/components/UI/StableCard";
import { navigationEnums } from "@/provider/navigationEnums";
import useGlobalNavigation from "@/provider/useGlobalNavigation";
import React from "react";
import { FlatList, TouchableOpacity, View } from "react-native";

interface Stable {
    id: number;
    image: any;
    name: string;
     rating: number;
}

interface PhotoSessionListProps {
    photoSessions: Stable[];
    onSeeAll?: () => void;
}

const PhotoSessionList: React.FC<PhotoSessionListProps> = ({ photoSessions, onSeeAll }) => {
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
                data={photoSessions}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item) => item.id.toString()}
                columnWrapperStyle={{ gap: 6 }}
                contentContainerStyle={{
                    alignItems: "center", gap: 20, paddingBottom: 220,
                }}
                renderItem={({ item }) => (
                    <PhotoSessionCard
                        image={item.image}
                        name={item.name}
                        rating={item.rating}
                        onPressStart={() => { navigate(navigationEnums.PHOTO_SESSION_DETAILS, { id: item.id }) }}
                    />
                )}
            />
        </View>
    );
}
export default PhotoSessionList;