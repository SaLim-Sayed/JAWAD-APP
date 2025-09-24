import AppButton from "@/components/UI/AppButton";
import AppHeader from "@/components/UI/AppHeader";
import AppText from "@/components/UI/AppText";
import AppWrapper from "@/components/UI/AppWrapper";
import FilterModal from "@/components/UI/FilterModal";
import LoaderBoundary from "@/components/UI/LoaderBoundary";
import SearchInput from "@/components/UI/SearchInput";
import { Icons } from "@/constants";
import { useApiQuery } from "@/hooks";
import { apiKeys } from "@/hooks/apiKeys";
import React, { useState } from "react";
import { View } from "react-native";
import { GetPhotographersResponse } from "../../Photo-session/@types/photography.types";
import PhotoSessionList from "../components/PhotoSessionList";
import { t } from "@/lib";

const PhotoSessionScreen = () => {
  const [search, setSearch] = useState("");
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [filters, setFilters] = useState({
    level: [],
    feature: [],
    color: [],
    rating: 0,
    vehicles: [],
    city: [],
  });

  const queryParams = new URLSearchParams({
    search,
    ...(filters.level.length && { level: filters.level.join(",") }),
    ...(filters.feature.length && { feature: filters.feature.join(",") }),
    ...(filters.color.length && { color: filters.color.join(",") }),
    ...(filters.rating > 0 && { rating: filters.rating.toString() }),
    ...(filters.vehicles.length && { vehicles: filters.vehicles.join(",") }),
    ...(filters.city.length && { city: filters.city.join(",") }),
  });

  const { data, isLoading } = useApiQuery<GetPhotographersResponse>({
    url: `${apiKeys.photographer.getPhotograoher}?${queryParams.toString()}`,
    key: ["getPhotograoher", search, filters],
  });
  // Header user info
  return (
    <AppWrapper>
      <AppHeader title={t("Global.photographer")} showBackButton />
      <View className="bg-white pt-6  flex-1 pb-60">

        {/* Search */}
        <View className="flex-row px-3 w-full mb-3 justify-between items-center gap-4">

          <SearchInput value={search} onChange={setSearch} />

          <AppButton
            className="w-12 h-12 bg-brownColor-400 items-center justify-center"
            onPress={() => setShowFilterModal(true)}
            startIcon={<Icons.filter />}
          />

        </View>

        <LoaderBoundary isLoading={isLoading}>
          {data?.photographers ? (
            <PhotoSessionList photoSessions={data?.photographers!} />
          ) : (
            <View className="flex-1 items-center justify-center">
              <AppText className="text-brownColor-400 text-2xl">{t("Global.no_data")}</AppText>
            </View>
          )}
        </LoaderBoundary>
        <FilterModal
          visible={showFilterModal}
          onClose={() => setShowFilterModal(false)}
          onApply={(selectedFilters: any) => {
            setFilters(selectedFilters);
            setShowFilterModal(false);
          }}
          currentFilters={filters}
        />
      </View>
    </AppWrapper>
  );
};

export default PhotoSessionScreen;