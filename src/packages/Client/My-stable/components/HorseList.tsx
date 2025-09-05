import React, { useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  TouchableOpacity,
  View,
} from "react-native";
import { Horse } from "../../Services/@types/horse.types";
import HorseCard from "@/components/UI/HorseCard";
import Image from "@/components/UI/Image";
import AppText from "@/components/UI/AppText";
import { navigationEnums } from "@/provider/navigationEnums";
import useGlobalNavigation from "@/provider/useGlobalNavigation";
import { useLanguage } from "@/store";
import { Icons } from "@/constants";
import { useAuthStore } from "@/store/useAuthStore";
import { useApiMutation } from "@/hooks";
import { apiKeys } from "@/hooks/apiKeys";
import { showGlobalToast } from "@/hooks/useGlobalToast";

interface HorseListProps {
  horses: Horse[];
  onSeeAll?: () => void;
  refetch?: () => void; // optional refetch from parent
}

const HorseList: React.FC<HorseListProps> = ({ horses, onSeeAll, refetch }) => {
  const { navigate } = useGlobalNavigation();
  const screenWidth = Dimensions.get("window").width;
  const itemSize = screenWidth * 0.4;

  const { language } = useLanguage();
  const { authData } = useAuthStore();
  const [id, setId] = useState("");

  const { mutate, isPending } = useApiMutation({
    url: apiKeys.horse.deleteHorse(id),
    method: "delete",
    refetchKeys: [[apiKeys.stable.stableDetail(authData?.id as string)]],
    config: {
      onSuccess: () => {
        refetch?.();
        showGlobalToast({
          type: "success",
          title: "Deleted",
          body: "Horse deleted successfully",
        });
      },
      onError: (error : any) => {
        showGlobalToast({
          type: "error",
          title: "Error",
          body: error?.message as string || "Something went wrong",
        });
      },
    },
  });

  const handleDelete = (horseId: string) => {
    setId(horseId);
    mutate({});
  };

  return (
    <FlatList
      numColumns={2}
      data={horses}
      showsVerticalScrollIndicator={false}
      keyExtractor={(item) => item._id}
      columnWrapperStyle={{ gap: 6 }}
      contentContainerStyle={{
        alignItems: "center",
        gap: 20,
        paddingBottom: 220,
      }}
      renderItem={({ item }) => (
        <TouchableOpacity
          onPress={() =>
            navigate(navigationEnums.HORSE_DETAILS, { id: item._id })
          }
          style={{ width: itemSize }}
          className="rounded-xl overflow-hidden"
        >
          <Image
            source={item.picUrls?.[0]}
            style={{
              width: itemSize,
              height: itemSize,
              borderRadius: 12,
            }}
            resizeMode="cover"
            background
          >
            {/* Name Overlay */}
            <View className="absolute top-0 left-0 right-0 bg-black/50 p-2">
              <AppText className="text-white tajawal-semibold-16">
                {item?.name?.[language as keyof typeof item.name] || item?.name}
              </AppText>
            </View>

            {/* Action Buttons */}
            <View className="absolute bottom-0 left-0 right-0 bg-white/80 p-2">
              <View className="flex-row items-end justify-between">
                

                <TouchableOpacity onPress={() => handleDelete(item._id)}>
                  {isPending && id === item._id ? (
                    <ActivityIndicator size="small" color="#8B4513" />
                  ) : (
                    <Icons.trash />
                  )}
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigate(navigationEnums.HORSE_EDIT, { id: item._id })}>
                  <Icons.edit />
                </TouchableOpacity>
              </View>
            </View>
          </Image>
        </TouchableOpacity>
      )}
    />
  );
};

export default HorseList;
