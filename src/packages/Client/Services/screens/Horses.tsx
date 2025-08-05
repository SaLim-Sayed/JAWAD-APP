import AppButton from "@/components/UI/AppButton";
import AppHeader from "@/components/UI/AppHeader";
import AppWrapper from "@/components/UI/AppWrapper";
import SearchInput from "@/components/UI/SearchInput";
import { Icons } from "@/constants";
import { useApiQuery } from "@/hooks";
import { apiKeys } from "@/hooks/apiKeys";
import useAppRouteParams from "@/provider/useAppRouteParams";
import React, { useState } from "react";
import { View } from "react-native";
import { GetHorsesResponse } from "../@types/horse.types";
import HorseList from "../components/HorseList";
import { t } from "@/lib";

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
      <AppHeader title={t("Global.horses")} showBackButton />
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