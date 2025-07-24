import AppButton from "@/components/UI/AppButton";
import AppLayout from "@/components/UI/AppLayout";
import Row from "@/components/UI/Row";
import { Icons } from "@/constants";
import { useApiQuery } from "@/hooks";
import { apiKeys } from "@/hooks/apiKeys";
import useAppRouteParams from "@/provider/useAppRouteParams";
import React from "react";
import { ActivityIndicator, ScrollView, View } from "react-native";
import { GetHorseDetailResponse } from "../@types/horse.types";
import ServiceHeadr from "../components/HomeHeader";
import HorseDescription from "../components/HorseDescription";
import HorseDetailsHeader from "../components/HorseDetailsHeader";
import LoaderBoundary from "@/components/UI/LoaderBoundary";
import { useFocusEffect } from "@react-navigation/native";
import useGlobalNavigation from "@/provider/useGlobalNavigation";
import { navigationEnums } from "@/provider/navigationEnums";


const HorseDetails = () => {
  const { id } = useAppRouteParams("HORSE_DETAILS")

  const {navigate}=useGlobalNavigation()
  const { data, isLoading, refetch, isFetching } = useApiQuery<GetHorseDetailResponse>({
    key: ["getHorseDetails", id],
    url: apiKeys.horse.horseDetails + id,
  });
  useFocusEffect(
    React.useCallback(() => {
      refetch();
    }, [refetch])
  )
  const title = data?.horse?.name;
  return (
    <AppLayout title={title} isScrollable={false} showBackButton>
       <View className="bg-white  flex-1 h-full ">
        <LoaderBoundary isLoading={isLoading || isFetching}>
          <ScrollView
            contentContainerStyle={{
              paddingBottom: 80,
              marginHorizontal: 10,
              flexGrow: 1,

            }}
          >

            {(!isLoading && data) && (
              <>
                <HorseDetailsHeader horse={data?.horse!} />
                <HorseDescription horse={data?.horse!} />
              </>
            )}

          </ScrollView>
        </LoaderBoundary>
        <Row gap={4} justify="between" className="mt-4 mb-10">
          <AppButton
            title="Select"
            onPress={() => {navigate(navigationEnums.EVENT_BOOKING,{id,type:"Photo_session"}) }}
            className="w-[90%]"
          />
          <AppButton
            title="Share"
            variant="outline"
            onPress={() => { }}
            className="w-[80%]"
            endIcon={<Icons.share />}
          />
        </Row>
      </View>
    </AppLayout>
  );
};

export default HorseDetails;