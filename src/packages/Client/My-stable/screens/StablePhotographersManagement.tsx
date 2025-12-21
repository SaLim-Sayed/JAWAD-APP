import AppButton from "@/components/UI/AppButton";
import AppHeader from "@/components/UI/AppHeader";
import AppText from "@/components/UI/AppText";
import AppWrapper from "@/components/UI/AppWrapper";
import LoaderBoundary from "@/components/UI/LoaderBoundary";
import SearchInput from "@/components/UI/SearchInput";
import PhotoSessionCard from "@/components/UI/PhotoSessionCard";
import PhotoSessionList from "@/packages/Client/Services/components/PhotoSessionList";
import { useApiQuery } from "@/hooks";
import { apiKeys } from "@/hooks/apiKeys";
import { API_URL } from "@/hooks/api";
import { showGlobalToast } from "@/hooks/useGlobalToast";
import { navigationEnums } from "@/provider/navigationEnums";
import useGlobalNavigation from "@/provider/useGlobalNavigation";
import { useAuthStore } from "@/store/useAuthStore";
import { useLanguage } from "@/store";
import { GetPhotographersResponse } from "@/packages/Client/Photo-session/@types/photography.types";
import axios from "axios";
import React, { useState } from "react";
import { FlatList, ScrollView, View } from "react-native";
import { t } from "i18next";
import { Icons } from "@/constants";

const StablePhotographersManagement = () => {
  const { navigate } = useGlobalNavigation();
  const { authData } = useAuthStore();
  const { language } = useLanguage();
  const [search, setSearch] = useState("");
  const [isAdding, setIsAdding] = useState<string | null>(null); // Track which photographer is being added

  // Fetch all photographers
  const { data: photographersData, isLoading, refetch } = useApiQuery<GetPhotographersResponse>({
    url: `${apiKeys.photographer.getPhotograoher}${search ? `?search=${search}` : ""}`,
    key: ["getAllPhotographers", search],
  });

  const handleAddPhotographer = async (photographerId: string, photographerEmail: string) => {
    setIsAdding(photographerId);
    try {
      const response = await axios.post(
        `${API_URL}${apiKeys.photographer.addToStable(photographerId)}`,
        { 
          email: photographerEmail || "", 
          password: "" // Password might be required by API, adjust if needed
        },
        {
          headers: {
            'accept-language': language,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'authorization': `jawJQ${authData.token}`,
          },
        }
      );
      
      showGlobalToast({
        type: "success",
        title: "Success",
        body: "Photographer added to stable successfully"
      });
      refetch();
    } catch (error: any) {
      showGlobalToast({
        type: "error",
        title: "Error",
        body: error.response?.data?.message || error.message || "Failed to add photographer to stable"
      });
    } finally {
      setIsAdding(null);
    }
  };

  const photographers = photographersData?.photographers || [];

  return (
    <AppWrapper>
      <AppHeader title={t("Global.photographers") || "Photographers"} showBackButton />
      <View className="bg-white flex-1">
        {/* Search */}
        <View className="px-4 pt-4">
          <SearchInput value={search} onChange={setSearch} />
        </View>

        <LoaderBoundary isLoading={isLoading}>
          <ScrollView
            contentContainerStyle={{
              padding: 16,
              paddingBottom: 100,
            }}
          >
            {photographers.length > 0 ? (
              <FlatList
                numColumns={2}
                data={photographers}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item) => item._id.toString()}
                columnWrapperStyle={{ gap: 10, marginBottom: 10 }}
                contentContainerStyle={{
                  alignItems: "center",
                  gap: 10,
                }}
                scrollEnabled={false}
                renderItem={({ item }) => (
                  <View style={{ flex: 1, marginHorizontal: 5 }}>
                    <PhotoSessionCard
                      image={item.picUrls?.[0]}
                      name={item.name}
                      rating={item.totalRating}
                      onPressStart={() => {
                        navigate(navigationEnums.PHOTO_SESSION_DETAILS, { id: item._id });
                      }}
                    />
                    <AppButton
                      title={t("Global.add") || "Add to Stable"}
                      onPress={() => handleAddPhotographer(item._id, "")}
                      className="mt-2"
                      disabled={isAdding === item._id}
                      loading={isAdding === item._id}
                    />
                  </View>
                )}
              />
            ) : (
              <View className="flex-1 items-center justify-center py-20">
                <AppText className="text-gray-400 text-base">
                  {t("Global.no_photographers") || "No photographers available"}
                </AppText>
              </View>
            )}
          </ScrollView>
        </LoaderBoundary>
      </View>
    </AppWrapper>
  );
};

export default StablePhotographersManagement;
