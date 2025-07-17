import AppButton from "@/components/UI/AppButton";
import AppWrapper from "@/components/UI/AppWrapper";
import Divider from "@/components/UI/Divider";
import SearchInput from "@/components/UI/SearchInput";
import { Icons } from "@/constants";
import useAppRouteParams from "@/provider/useAppRouteParams";
import React, { useState } from "react";
import { ScrollView, View } from "react-native";
import ServiceHeadr from "../components/HomeHeader";
import HorseSection from "../components/HorseSection";
import StableDescription from "../components/StableDescription";
import StableDetailsHeader from "../components/StableDetailsHeader";
import { bestStables } from "./mock";
import { apiKeys } from "@/hooks/apiKeys";
import { useApiQuery } from "@/hooks";
import { GetStableDetailsResponse } from "../@types/horse.types";
// Dummy data for best stables/events



const StableServicesDetails = () => {
  const { id } = useAppRouteParams("STABLE_SERVICES_DETAILS")
  const { data, isLoading } = useApiQuery<GetStableDetailsResponse>({
    key: ["stableDetails"],
    url: apiKeys.stable.stableDetails,
  })
  console.log(id)
  // Header user info
  const userName = "George Mikhaiel";
  const location = "Fifth Settlement";
  const [search, setSearch] = useState("");
  const title = data?.stable.name.en;
  console.log({data})
  return (
    <AppWrapper>
      <ServiceHeadr title={data?.stable.name.en} showBackButton />
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
            title="Start now"
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