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
       <View className="pt-6  pb-6">
        

           <HorseList horses={data?.horses!} />
        </View>
    </AppWrapper>
  );
};

export default Horses;