import AppButton from "@/components/UI/AppButton";
import AppHeader from "@/components/UI/AppHeader";
import AppWrapper from "@/components/UI/AppWrapper";
import Divider from "@/components/UI/Divider";
import SearchInput from "@/components/UI/SearchInput";
import { Icons } from "@/constants";
import { useApiQuery } from "@/hooks";
import { apiKeys } from "@/hooks/apiKeys";
import useAppRouteParams from "@/provider/useAppRouteParams";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { ScrollView, View } from "react-native";
import { GetStableDetailsResponse } from "../@types/horse.types";
import HorseSection from "../components/HorseSection";
import StableDescription from "../components/StableDescription";
import StableDetailsHeader from "../components/StableDetailsHeader";



const StableServicesDetails = () => {
  const { id } = useAppRouteParams("STABLE_SERVICES_DETAILS")
  const { data, isLoading } = useApiQuery<GetStableDetailsResponse>({
    key: ["stableDetails", id],
    url: apiKeys.stable.stableDetail(id),
  })
  console.log(id)
  // Header user info
 
  const [search, setSearch] = useState("");
  const title = data?.stable.name.en;
  const { t } = useTranslation()
  console.log({data})
  return (
    <AppWrapper>
      <AppHeader title={title} showBackButton />
      <View className="bg-white  h-full ">
        <ScrollView
          contentContainerStyle={{
            paddingBottom: 220,
            marginHorizontal: 10,
            flexGrow: 1,

          }}
        >
          {/* Search */}
          <View className="flex-row w-full mb-3 justify-between items-center gap-4">

            <SearchInput value={search} onChange={setSearch} />

            <AppButton
              className="w-12 h-12 bg-brownColor-400 items-center justify-center"
              onPress={() => { }}
              startIcon={<Icons.filter />}
            />
            <AppButton
              className="w-12 h-12 bg-brownColor-400 items-center justify-center"
              onPress={() => { }}
              startIcon={<Icons.locationTick />}
            />
          </View>

          <StableDetailsHeader />
          <Divider containerStyle={{ height: 2 }} className="h-[3px]" />
          <StableDescription />
          <Divider containerStyle={{ height: 2 }} className="h-[3px]" />
          <HorseSection stableId={id} />
          {/* The Best Stable Section */}
          {/* The Events Section */}

          <AppButton
            title={t("Global.start_now")}
            onPress={() => { }}
            className="my-4"
          />
          <AppButton
            title="Add to cart"
            variant="outline"
            onPress={() => { }}

          />
        </ScrollView>
      </View>
    </AppWrapper>
  );
};

export default StableServicesDetails;