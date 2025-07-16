import AppText from "@/components/UI/AppText";
import EventCard from "@/components/UI/EventCard";
import { useApiQuery } from "@/hooks";
import { apiKeys } from "@/hooks/apiKeys";
import { GetEventsResponse } from "../@types/event.type";
import React from "react";
import { FlatList, TouchableOpacity, View } from "react-native";
import useGlobalNavigation from "@/provider/useGlobalNavigation";
import { navigationEnums } from "@/provider/navigationEnums";

interface Event {
  id: number;
  image: any;
  name: string;
  date: string;
  price: string;
}

interface EventsSectionProps {
events?: Event[];
  onSeeAll?: () => void;
}

const EventsSection: React.FC<EventsSectionProps> = ({ events, onSeeAll }) => {
  const {navigate} = useGlobalNavigation();
  const { data } = useApiQuery<GetEventsResponse>({
    key: ["getEvent"],
    url: apiKeys.event.getEvent+1,
  })
  return (
  <>
    <View className="mx-4 mt-2 mb-2 py-2 flex-row w-[90%] justify-between items-center">
      <AppText className="font-bold tajawal-semibold-20 text-brownColor-400">The Events</AppText>
      <TouchableOpacity onPress={onSeeAll}>
        <AppText className="text-brownColor-300 text-sm">See All</AppText>
      </TouchableOpacity>
    </View>
    <FlatList
      data={data?.events}
      keyExtractor={(item) => item._id.toString()}
      renderItem={({ item }) => (
        <EventCard event={item!} onStart={() => {navigate(navigationEnums.EVENT_DETAILS, { id: item._id })  }} />
      )}
    />
  </>
);
}
export default EventsSection;