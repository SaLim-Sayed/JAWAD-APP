import AppButton from "@/components/UI/AppButton";
import AppHeader from "@/components/UI/AppHeader";
import AppWrapper from "@/components/UI/AppWrapper";
import Divider from "@/components/UI/Divider";
import useAppRouteParams from "@/provider/useAppRouteParams";
import React from "react";
import { ScrollView, View } from "react-native";
import EventDescription from "../components/EventDescription";
import { events } from "./envent.data";
import useGlobalNavigation from "@/provider/useGlobalNavigation";
import { navigationEnums } from "@/provider/navigationEnums";
 



const EventDetails = () => {
  const { id } = useAppRouteParams("EVENT_DETAILS")
  console.log(id)
 
const {navigate}=useGlobalNavigation()
  const title =   events?.find((event) => event.id === id)?.name;
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
        
          <EventDescription event={events.find((event) => event.id === id)}/>
          <Divider containerStyle={{ height: 2 }} className="h-[3px]" />



          <AppButton
            title="Get the ticket"
            onPress={() => { navigate(navigationEnums.EVENT_BOOKING, { id })}}
            className="my-4"
          />
          
        </ScrollView>
      </View>
    </AppWrapper>
  );
};

export default EventDetails;