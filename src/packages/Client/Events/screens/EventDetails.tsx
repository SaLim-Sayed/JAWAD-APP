import AppButton from "@/components/UI/AppButton";
import AppHeader from "@/components/UI/AppHeader";
import AppWrapper from "@/components/UI/AppWrapper";
import Divider from "@/components/UI/Divider";
import LoaderBoundary from "@/components/UI/LoaderBoundary";
import { useApiQuery } from "@/hooks";
import { apiKeys } from "@/hooks/apiKeys";
import { navigationEnums } from "@/provider/navigationEnums";
import useAppRouteParams from "@/provider/useAppRouteParams";
import useGlobalNavigation from "@/provider/useGlobalNavigation";
import React from "react";
import { ScrollView, View } from "react-native";
import { GetEventDetailsResponse } from "../../home/@types/event.type";
import EventDescription from "../components/EventDescription";




const EventDetails = () => {
  const { id } = useAppRouteParams("EVENT_DETAILS")
  console.log(id)

  console.log(apiKeys.event.eventDetails + id)
  const { data, isLoading } = useApiQuery<GetEventDetailsResponse>({
    key: ["getEventDetails", id],
    url: apiKeys.event.eventDetails + id,
  })
  const { navigate } = useGlobalNavigation()
  const title = data?.event?.name;


  return (
    <AppWrapper>
      <AppHeader title={title} showBackButton />
      <View className="bg-white  flex-1 pb-10  ">
        <LoaderBoundary isLoading={isLoading}>
          <ScrollView
            contentContainerStyle={{
              flexGrow: 1,

            }}
          >

            <EventDescription event={data?.event!} />
            <Divider containerStyle={{ height: 2 }} className="h-[3px]" />





          </ScrollView>
        </LoaderBoundary>
        <AppButton
          title="Get the ticket"
          className="w-[90%] mx-auto"
          onPress={() => { navigate(navigationEnums.EVENT_BOOKING, { id }) }}
        />
      </View>
    </AppWrapper>
  );
};

export default EventDetails;