import AppLayout from "@/components/UI/AppLayout";
import Divider from "@/components/UI/Divider";
import LoaderBoundary from "@/components/UI/LoaderBoundary";
import LocationCard from "@/components/UI/MapCard";
import { useApiQuery } from "@/hooks";
import { apiKeys } from "@/hooks/apiKeys";
import useAppRouteParams from "@/provider/useAppRouteParams";
import { useLanguage } from "@/store";
import React from "react";
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