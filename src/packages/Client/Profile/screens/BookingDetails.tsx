import AppButton from "@/components/UI/AppButton";
import AppHeader from "@/components/UI/AppHeader";
import AppWrapper from "@/components/UI/AppWrapper";
import Divider from "@/components/UI/Divider";
import { navigationEnums } from "@/provider/navigationEnums";
import useAppRouteParams from "@/provider/useAppRouteParams";
import useGlobalNavigation from "@/provider/useGlobalNavigation";
import React from "react";
import { ScrollView, View } from "react-native";
import HistoryDescription from "../components/HistoryDescription";
import { bookingData } from "./history";
import Image from "@/components/UI/Image";
import Row from "@/components/UI/Row";
 



const BookingDetails = () => {
  const { id } = useAppRouteParams("EVENT_DETAILS")
  console.log(id)
 
const {navigate}=useGlobalNavigation()
  const title =   bookingData?.find((item) => item.id === id)?.location;
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
         <Row items="center" justify="center" className="w-full">
         <Image
            source={bookingData.find((item) => item.id === id)?.horseImage}
            className="w-40 h-40  "
          />
         </Row>
        
          <HistoryDescription item={bookingData.find((item) => item.id === id)}/>
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

export default BookingDetails;