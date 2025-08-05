import AppButton from "@/components/UI/AppButton";
import AppLayout from "@/components/UI/AppLayout";
import Divider from "@/components/UI/Divider";
import LoaderBoundary from "@/components/UI/LoaderBoundary";
import LocationCard from "@/components/UI/MapCard";
import SearchInput from "@/components/UI/SearchInput";
import { Icons } from "@/constants";
import { useApiQuery } from "@/hooks";
import { apiKeys } from "@/hooks/apiKeys";
import useAppRouteParams from "@/provider/useAppRouteParams";
import { useLanguage } from "@/store";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { ScrollView, View } from "react-native";
import { GetStableDetailsResponse } from "../@types/horse.types";
import HorseSection from "../components/HorseSection";
import StableDetailsHeader from "../components/StableDetailsHeader";



const StableServicesDetails = () => {
  const { id } = useAppRouteParams("STABLE_SERVICES_DETAILS")
  const { language } = useLanguage()
  const { data, isLoading } = useApiQuery<GetStableDetailsResponse>({
    key: ["stableDetails", id],
    url: apiKeys.stable.stableDetail(id),
  })
  console.log(id)
  // Header user info

  const [search, setSearch] = useState("");
  const title = data?.stable.name.en;
  const { t } = useTranslation()
  console.log({ data })
  return (
    <AppLayout isScrollable={false} title={data?.stable?.name[language] || ""}>
      <View className="bg-white  h-full ">
        <ScrollView
          contentContainerStyle={{
            paddingBottom: 220,
            marginHorizontal: 10,
            flexGrow: 1,

          }}
        >
         
          <LoaderBoundary isLoading={isLoading}>
            <StableDetailsHeader StableDetails={data?.stable!} />
            <Divider containerStyle={{ height: 2 }} className="h-[3px]" />
            <LocationCard mapUrl={data?.stable.location} city={data?.stable.city[language]!} region={data?.stable.region[language]!} address={data?.stable.address[language]!} />

             <Divider containerStyle={{ height: 2 }} className="h-[3px]" />
            <HorseSection stableId={id} />
          
          </LoaderBoundary>
         
        </ScrollView>
      </View>
    </AppLayout>
  );
};

export default StableServicesDetails;