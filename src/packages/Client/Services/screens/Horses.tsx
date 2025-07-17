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
import { bestStables, horseDate } from "./mock";
import HorseList from "../components/HorseList";
import { useApiQuery } from "@/hooks";
import { apiKeys } from "@/hooks/apiKeys";
import { GetHorsesResponse } from "../@types/horse.types";
import useAppRouteParams from "@/provider/useAppRouteParams"; 
import { navigationEnums } from "@/provider/navigationEnums";
import AppHeader from "@/components/UI/AppHeader";

const Horses = () => {
  const {id} = useAppRouteParams('HORSES')
  const { data, isLoading } = useApiQuery<GetHorsesResponse>({
    key: ["getHorse"],
    url: apiKeys.horse.getHorse(id),
  });
  // Header user info
  const userName = "George Mikhaiel";
   const [search, setSearch] = useState("");
  return (
    <AppWrapper >
      <AppHeader title="Horses" showBackButton />
       <View className="bg-white pt-6  pb-60">
       
          {/* Search */}
          <View className="flex-row px-3 w-full mb-3 justify-between items-center gap-4">

            <SearchInput  value={search} onChange={setSearch} />

            <AppButton
              className="w-12 h-12 bg-brownColor-400 items-center justify-center"
              onPress={() => { }}
              startIcon={<Icons.filter />}
            />

          </View>

          {/* The Best Stable Section */}
          <HorseList horses={data?.horses!} />
          {/* The Events Section */}
       </View>
    </AppWrapper>
  );
};

export default Horses;