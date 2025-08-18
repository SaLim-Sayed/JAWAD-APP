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
import { useApiMutation, useApiQuery } from "@/hooks";
import { apiKeys } from "@/hooks/apiKeys";
 



const BookingDetails = () => {
  const { id , item} = useAppRouteParams("BOOKING_DETAILS")
 
const {navigate}=useGlobalNavigation()
  const title =   bookingData?.find((item) => item.id === id)?.location;
  const {data,isLoading,error}=useApiQuery({
    url:apiKeys.refund.check(id),
    key:["getBooking",id],
  })
  const {mutate,isLoading,error}=useApiMutation({
    url:apiKeys.refund.check(id),
  })
  console.log(data)
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
            source={item?.stable?.picUrl}
            className="w-[330px] h-[300px]  flex-1 rounded-2xl"
            resizeMode="stretch"
          />
         </Row>
        
          <HistoryDescription item={item}/>
           
          
        </ScrollView>
      </View>
    </AppWrapper>
  );
};

export default BookingDetails;