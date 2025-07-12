import AppButton from "@/components/UI/AppButton";
import AppText from "@/components/UI/AppText";
import Col from "@/components/UI/Col";
import Image from "@/components/UI/Image";
import Row from "@/components/UI/Row";
import { Icons } from "@/constants";
import { Event } from "@/packages/Client/home/@types/event.type";
import React from "react";
import moment from "moment";
 

interface EventCardProps {
  event: Event;
  onStart?: () => void;
}

const EventCard: React.FC<EventCardProps> = ({ event, onStart }) => (
  <Row gap={8} className="bg-white rounded-2xl mx-6 mb-4 w-[90%] shadow items-center">
    <Image source={event.picUrl} className="rounded-l-2xl" style={{ width: 164, height: 147 }} />
    <Col gap={4} className="flex-1 mt-4">
      <Col gap={8}>
        <Row items="center" gap={4}>
          <Icons.location color="#5E3E2C" width={14} height={14} />
          <AppText className="font-bold text-brownColor-400">{event.name}</AppText>
        </Row>
        <Row items="center" gap={4}>
          <Icons.calendar color="#5E3E2C" width={14} height={14} />
          <AppText className="ml-1 text-brownColor-400">{ moment(event.date).format("MMMM D, YYYY")}</AppText>
        </Row>
        <Row items="center" gap={4}>
          <Icons.coin color="#5E3E2C" width={14} height={14} />
          <AppText className="ml-1 text-brownColor-400">{event.price}</AppText>
        </Row>
      </Col>
      <AppButton
        title="Start Now"
        className="mt-1 bottom-2 py-1 px-2 w-full border-transparent"
        textClassName="text-brownColor-400"
        variant="outline"
        endIcon={<Icons.arrowRightFill width={14} height={14} />}
        onPress={onStart}
      />
    </Col>
  </Row>
);

export default EventCard;