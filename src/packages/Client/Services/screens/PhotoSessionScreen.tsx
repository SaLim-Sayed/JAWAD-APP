import { images } from "@/assets/images";
import AppWrapper from "@/components/UI/AppWrapper";
import SearchInput from "@/components/UI/SearchInput";
import React, { useState } from "react";
import { ScrollView, View } from "react-native";
import BestStableSection from "../components/BestStableSection";
import ServiceHeadr from "../components/HomeHeader";
import Row from "@/components/UI/Row";
import { Icons } from "@/constants";
import AppButton from "@/components/UI/AppButton";
import { bestStables, photoSessionData } from "./mock";
import PhotoSessionList from "../components/PhotoSessionList";
import { useApiQuery } from "@/hooks";
import { apiKeys } from "@/hooks/apiKeys";
import { GetPhotographersResponse } from "../../Photo-session/@types/photography.types";
import AppHeader from "@/components/UI/AppHeader";
import LoaderBoundary from "@/components/UI/LoaderBoundary";
import FilterModal from "@/components/UI/FilterModal";
import AppText from "@/components/UI/AppText";

const PhotoSessionScreen = () => {
  const [search, setSearch] = useState("");
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [filters, setFilters] = useState({
    nationality: [],
    level: [],
    feature: [],
    color: [],
    service: [],
    rating: 0,
  });

  const queryParams = new URLSearchParams({
    search,
    ...(filters.nationality.length && { nationality: filters.nationality.join(",") }),
    ...(filters.level.length && { level: filters.level.join(",") }),
    ...(filters.feature.length && { feature: filters.feature.join(",") }),
    ...(filters.color.length && { color: filters.color.join(",") }),
    ...(filters.service.length && { service: filters.service.join(",") }),
    ...(filters.rating > 0 && { rating: filters.rating.toString() }),
  });

  const { data, isLoading } = useApiQuery<GetPhotographersResponse>({
    url: `${apiKeys.photographer.getPhotograoher}?${queryParams.toString()}`,
    key: ["getPhotograoher", search, filters],
  });
  // Header user info
  const userName = "George Mikhaiel";
  return (
    <AppWrapper>
      <AppHeader title={userName} showBackButton />
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
              <AppText className="text-brownColor-400 text-2xl">No photographers found</AppText>
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