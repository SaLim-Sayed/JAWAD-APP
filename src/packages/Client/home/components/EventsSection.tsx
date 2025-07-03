import React from "react";
import { View, FlatList, TouchableOpacity } from "react-native";
import AppText from "@/components/UI/AppText";
import AppButton from "@/components/UI/AppButton";
import Row from "@/components/UI/Row";
import Image from "@/components/UI/Image";
import { Icons } from "@/constants";
import Col from "@/components/UI/Col";
import EventCard from "@/components/UI/EventCard";

interface Event {
  id: number;
  image: any;
  name: string;
  date: string;
  price: string;
}

interface EventsSectionProps {
  events: Event[];
  onSeeAll?: () => void;
}

const EventsSection: React.FC<EventsSectionProps> = ({ events, onSeeAll }) => (
  <>
    <Row className="mx-6 my-4 justify-between w-[90%]  items-center">
      <AppText className="font-bold tajawal-semibold-20 text-brownColor-400">The Events</AppText>
      <TouchableOpacity onPress={onSeeAll}>
        <AppText className="text-brownColor-300 text-sm">See All</AppText>
      </TouchableOpacity>
    </Row>
    <FlatList
      data={events}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <EventCard event={item} />
      )}
    />
  </>
);

export default EventsSection;