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
import AppText from "@/components/UI/AppText";
import { showGlobalToast } from "@/hooks/useGlobalToast";
import AppLayout from "@/components/UI/AppLayout";
import { images } from "@/assets/images";
import LoaderBoundary from "@/components/UI/LoaderBoundary";
 



const BookingDetails = () => {
  const { id, item } = useAppRouteParams("BOOKING_DETAILS")

  const { navigate } = useGlobalNavigation()
  const title = bookingData?.find((item) => item.id === id)?.location;
  const { data, isLoading, error } = useApiQuery<any>({
    url: apiKeys.refund.check(id),
    key: ["getBooking", id],
  })
  console.log({ data })
  console.log({ error })
  const { mutate, isPending } = useApiMutation({
    url: apiKeys.refund.refund(id),
 
  })

  const handleRefund = () => {
    mutate(
      {},
      {
        onSuccess: () => {
          showGlobalToast({ type: 'success', title: "Refund Request Sent Successfully" });
        },
        onError: (err: any) => {
          showGlobalToast({ type: 'error', title: "Refund Request Failed", body: err?.response?.data?.message || "Refund request failed" });
        }
      }
    );
  };
  
  return (
    <AppLayout title={title} showBackButton isScrollable={false} >
      <AppHeader title="Booking Details" showBackButton />
       <View className="bg-white  flex-1 h-full ">
        <LoaderBoundary isLoading={isLoading}>
        <ScrollView
          contentContainerStyle={{
            paddingBottom: 2,
            marginHorizontal: 10,
            flexGrow: 1,

          }}
        >
          <Row items="center" justify="center" className="w-full">
            <Image
              source={item?.stable?.picUrl||images.villarreal}
              className="w-[330px] h-[300px]  flex-1 rounded-2xl"
              resizeMode="stretch"
            />
          </Row>


{       item &&   <HistoryDescription item={item} />
}
          <AppText className="text-center text-brownColor-400 mt-4">
            {data?.message || error?.response?.data?.message}
          </AppText>
        </ScrollView>         
        </LoaderBoundary> 
         <AppButton title="Refund" loading={isPending} onPress={handleRefund} />

      </View>

    </AppLayout>
  );
};

export default BookingDetails;