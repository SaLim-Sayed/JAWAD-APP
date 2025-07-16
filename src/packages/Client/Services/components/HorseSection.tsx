import React from "react";
import {
  Dimensions,
  FlatList,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from "react-native";

import AppText from "@/components/UI/AppText";
import Image from "@/components/UI/Image";
import Row from "@/components/UI/Row";
import { navigationEnums } from "@/provider/navigationEnums";
import useGlobalNavigation from "@/provider/useGlobalNavigation";
import { useApiQuery } from "@/hooks";
import { apiKeys } from "@/hooks/apiKeys";
import { GetHorsesResponse } from "../@types/horse.types";

const HorseSection = () => {
  const { navigate } = useGlobalNavigation();
  const screenWidth = Dimensions.get("window").width;
  const itemSize = screenWidth / 2 - 20;

  const { data, isLoading } = useApiQuery<GetHorsesResponse>({
    key: ["getHorse"],
    url: apiKeys.horse.getHorse,
  });

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center my-6">
        <ActivityIndicator size="large" color="#8B4513" />
      </View>
    );
  }

  if (!data?.horses?.length) {
    return (
      <View className="flex-1 justify-center items-center my-6">
        <AppText className="text-brownColor-400">No horses found.</AppText>
      </View>
    );
  }

  return (
    <View className="mb-4 mx-2">
      <FlatList
        ListHeaderComponent={() => (
          <Row className="mt-2 mb-2 p-2 flex-row w-[80%] justify-between items-center">
            <AppText className="font-bold text-brownColor-400 text-lg">
              Horses
            </AppText>
            <TouchableOpacity onPress={() => navigate(navigationEnums.HORSES)}>
              <AppText className="text-brownColor-400 text-sm">
                See All
              </AppText>
            </TouchableOpacity>
          </Row>
        )}
        data={data.horses}
        numColumns={2}
        keyExtractor={(item) => item._id.toString()}
        contentContainerStyle={{
          paddingVertical: 16,
        }}
        columnWrapperStyle={{
          justifyContent: "space-between",
          marginBottom: 12,
        }}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={()=>navigate(navigationEnums.HORSE_DETAILS,{id:item._id})} className="rounded-xl overflow-hidden">
            <Image
              source={item.picUrls[0]}
              style={{
                width: itemSize,
                height: itemSize,
                borderRadius: 12,
              }}
              resizeMode="cover"
              background
            >
              <View className="absolute rounded-br-xl top-0 left-0 right-0 w-2/3 bg-black/50 p-2">
                <AppText className="text-white tajawal-semibold-16">{item.name}</AppText>
              </View>
            </Image>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default HorseSection;
