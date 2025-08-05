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
 
const PhotoSessionScreen = () => {
  const [search, setSearch] = useState("");
  const { data, isLoading } = useApiQuery<GetPhotographersResponse>({
    url: apiKeys.photographer.getPhotograoher+"?search="+search,
    key: ["getPhotograoher",search],
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
            onPress={() => { }}
            startIcon={<Icons.filter />}
          />

        </View>

        <LoaderBoundary isLoading={isLoading}>
        {/* The Best Stable Section */}
        <PhotoSessionList photoSessions={data?.photographers!} />
        {/* The Events Section */}
        </LoaderBoundary>
      </View>
    </AppWrapper>
  );
};

export default PhotoSessionScreen;