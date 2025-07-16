import AppButton from "@/components/UI/AppButton";
import AppHeader from "@/components/UI/AppHeader";
import AppWrapper from "@/components/UI/AppWrapper";
import Divider from "@/components/UI/Divider";
import useAppRouteParams from "@/provider/useAppRouteParams";
import React from "react";
import { ActivityIndicator, ScrollView, View } from "react-native";
import EventDescription from "../components/EventDescription";
import useGlobalNavigation from "@/provider/useGlobalNavigation";
import { navigationEnums } from "@/provider/navigationEnums";
import { GetEventDetailsResponse } from "../../home/@types/event.type";
import { useApiQuery } from "@/hooks";
import { apiKeys } from "@/hooks/apiKeys";




const EventDetails = () => {
  const { id } = useAppRouteParams("EVENT_DETAILS")
  console.log(id)

  console.log(apiKeys.event.eventDetails + id)
  const { data ,isLoading} = useApiQuery<GetEventDetailsResponse>({
    key: ["getEventDetails",id],
    url: apiKeys.event.eventDetails + id,
  })
  const { navigate } = useGlobalNavigation()
  const title = data?.event?.name;

  if(isLoading){
    return <ActivityIndicator/>
  }
  return (
    <AppWrapper>
      <AppHeader title={title} showBackButton />
      <View className="bg-white  flex-1 pb-10  ">
        <ScrollView
          contentContainerStyle={{
             flexGrow: 1,

          }}
        >

          <EventDescription event={data?.event!} />
          <Divider containerStyle={{ height: 2 }} className="h-[3px]" />



          

        </ScrollView>
        <AppButton
            title="Get the ticket"
            onPress={() => { navigate(navigationEnums.EVENT_BOOKING, { id }) }}
           />
      </View>
    </AppWrapper>
  );
};

export default EventDetails;