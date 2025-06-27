import React from "react";
import { View, FlatList, TouchableOpacity } from "react-native";
import AppText from "@/components/UI/AppText";
import AppButton from "@/components/UI/AppButton";
import Row from "@/components/UI/Row";
import Image from "@/components/UI/Image";
import { Icons } from "@/constants";
import Col from "@/components/UI/Col";

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
        <Row gap={8} className="bg-white rounded-2xl mx-6 mb-4  w-[90%] shadow items-center">
          <Image source={item.image} className="rounded-l-2xl" style={{ width: 164, height: 147,  }} />
          <Col gap={4} className="flex-1  mt-4">
            <Col gap={8} >
            <Row items="center" gap={4}>
            <Icons.location color="#5E3E2C" width={14} height={14} />
            <AppText className="font-bold text-brownColor-400 ">{item.name}</AppText>
            </Row>
              <Row items="center" gap={4}>
              <Icons.calendar color="#5E3E2C" width={14} height={14} />
              <AppText className="ml-1 text-brownColor-400 marker:selection:">{item.date}</AppText>
              </Row>
              <Row items="center" gap={4}>
              <Icons.coin color="#5E3E2C" width={14} height={14} />
              <AppText className="ml-1 text-brownColor-400 ">{item.price}</AppText>
              </Row>
            </Col>
            <AppButton
              title="Start Now"
              className="mt-1  bottom-2 py-1 px-2 w-full border-transparent"
              textClassName=" text-brownColor-400"
              variant="outline"
              endIcon={<Icons.arrowRightFill width={14} height={14} />}
            // onPress={() => ...}
            />
          </Col>
        </Row>
      )}
    />
  </>
);

export default EventsSection;