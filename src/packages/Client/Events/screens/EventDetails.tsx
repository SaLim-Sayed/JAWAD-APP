import AppButton from "@/components/UI/AppButton";
import AppHeader from "@/components/UI/AppHeader";
import AppWrapper from "@/components/UI/AppWrapper";
import Divider from "@/components/UI/Divider";
import LoaderBoundary from "@/components/UI/LoaderBoundary";
import { useApiMutation, useApiQuery } from "@/hooks";
import { apiKeys } from "@/hooks/apiKeys";
import { navigationEnums } from "@/provider/navigationEnums";
import useAppRouteParams from "@/provider/useAppRouteParams";
import useGlobalNavigation from "@/provider/useGlobalNavigation";
import React from "react";
import { ScrollView, View } from "react-native";
import { GetEventDetailsResponse } from "../../home/@types/event.type";
import EventDescription from "../components/EventDescription";
import { showGlobalToast } from "@/hooks/useGlobalToast";
import { AxiosError } from "axios";
import { t } from "@/lib";
import { useAuthStore } from "@/store/useAuthStore";



const EventDetails = () => {
  const { id } = useAppRouteParams("EVENT_DETAILS")
  const {authData} = useAuthStore()
  console.log(id)
  const handleSelectEvent = () => {

    navigate(navigationEnums.EVENT_BOOKING, { id, type: "event" });

  };
  console.log(apiKeys.event.eventDetails + id)
  const { data, isLoading } = useApiQuery<GetEventDetailsResponse>({
    key: ["getEventDetails", id],
    url: apiKeys.event.eventDetails + id,
  })
  const { mutate, isPending } = useApiMutation({
    url: apiKeys.booking.event,
  });


  const { navigate } = useGlobalNavigation()
  const title = data?.event?.name;

  const handleBooking = () => {
    mutate({
      event: id,
      totalPrice: Number(data?.event?.price),
      service: "event"
    }, {
      onSuccess: () => {
        navigate(navigationEnums.EVENT_BOOKING_SUCCESS)
      },
      onError: (error: AxiosError<any>) => {

        const serverMessage = error?.response?.data?.message
        showGlobalToast({ type: 'error', title: `Error: "${serverMessage}"` });

      }
    })
  }

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
       {authData?.role === "auth" && <AppButton
          title={t("Global.get_ticket")}
          disabled={isPending}
          loading={isPending}
          className="w-[90%] mx-auto"
          onPress={handleSelectEvent}
        />}
      </View>
    </AppWrapper>
  );
};

export default EventDetails;