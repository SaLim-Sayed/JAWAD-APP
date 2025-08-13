import SchoolCard from "@/components/UI/SchoolCard";
import { navigationEnums } from "@/provider/navigationEnums";
import useGlobalNavigation from "@/provider/useGlobalNavigation";
import React from "react";
import { FlatList, View } from "react-native";
import { TSchool } from "../../home/@types/school.types";



interface SchoolListProps {
    schools: TSchool[];
    onSeeAll?: () => void;
}

const SchoolList: React.FC<SchoolListProps> = ({ schools, onSeeAll }) => {
    const { navigate } = useGlobalNavigation();
    return (
        <View className="">

            <FlatList
                numColumns={2}
                data={schools}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item) => item._id.toString()}
                columnWrapperStyle={{ gap: 6 }}
                contentContainerStyle={{
                    alignItems: "center", gap: 20, paddingBottom: 40,
                }}
                renderItem={({ item }) => (
                    <SchoolCard
                        image={item.picUrl}
                        name={item.name}
                        rating={item.totalRating}
                        onPressStart={() => { navigate(navigationEnums.SCHOOL_DETAILS, { id: item._id }) }}
                    />
                )}
            />
        </View>
    );
}
export default SchoolList;