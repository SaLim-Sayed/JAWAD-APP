import React from "react";
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  TouchableOpacity,
  View,
} from "react-native";

import AppText from "@/components/UI/AppText";
import Image from "@/components/UI/Image";
import Row from "@/components/UI/Row";
import { useApiQuery } from "@/hooks";
import { apiKeys } from "@/hooks/apiKeys";
import { t } from "@/lib";
import { navigationEnums } from "@/provider/navigationEnums";
import useGlobalNavigation from "@/provider/useGlobalNavigation";
import { GetHorsesResponse } from "../@types/horse.types";
import HorseCard from "@/components/UI/HorseCard";
 const HorseSection = ({stableId}: {stableId: string}) => {
  const { navigate } = useGlobalNavigation();
  const screenWidth = Dimensions.get("window").width;
  const itemSize = screenWidth * 0.4;

  const { data, isLoading } = useApiQuery<GetHorsesResponse>({
    key: ["getHorse",stableId],
    url: apiKeys.horse.getHorse(stableId),
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
    <View className="mb-4">
      <Row className="mt-2 mb-2 px-4 flex-row justify-between items-center">
        <AppText className="font-bold text-brownColor-400 text-lg">
          {t("Global.horses")}
        </AppText>
        <TouchableOpacity onPress={() => navigate(navigationEnums.HORSES,{id:stableId})}>
          <AppText className="text-brownColor-400 text-sm">{t("Global.see_all")}</AppText>
        </TouchableOpacity>
      </Row>

      <FlatList
        data={data.horses}
        keyExtractor={(item) => item._id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16 }}
        ItemSeparatorComponent={() => <View style={{ width: 12 }} />}
        renderItem={({ item }) => (
          <HorseCard
          image={item.picUrls[0]}
          name={item?.name!}
          type={item.type}
          price={item.price}
          category={item.type}
          onPressStart={() => { navigate(navigationEnums.HORSE_DETAILS, { id: item._id }) }}
        />
          // <TouchableOpacity
          //   onPress={() =>
          //     navigate(navigationEnums.HORSE_DETAILS, { id: item._id })
          //   }
          //   style={{ width: itemSize }}
          //   className="rounded-xl overflow-hidden"
          // >
          //   <Image
          //     source={item.picUrls[0]}
          //     style={{
          //       width: itemSize,
          //       height: itemSize,
          //       borderRadius: 12,
          //     }}
          //     resizeMode="cover"
          //     background
          //   >
          //     <View className="absolute   top-0 left-0 right-0   bg-black/50 p-2">
          //       <AppText className="text-white tajawal-semibold-16">
          //         {item?.name as any}
          //       </AppText>
          //     </View>
          //   </Image>
          // </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default HorseSection;
