import AppButton from "@/components/UI/AppButton";
import AppText from "@/components/UI/AppText";
import Col from "@/components/UI/Col";
import Image from "@/components/UI/Image";
import Row from "@/components/UI/Row";
import { Icons } from "@/constants";
import { Event } from "@/packages/Client/home/@types/event.type";
import React from "react";
import moment from "moment";
import { View } from "react-native";
import { useLanguage } from "@/store";
import { isRTL } from "@/provider/constant";
import { useTranslation } from "react-i18next";


interface EventCardProps {
  event: Event;
  onStart?: () => void;
}

const EventCard: React.FC<EventCardProps> = ({ event, onStart }) => {
  const { language } = useLanguage()
  const {t}=useTranslation()
  return (
  <View className="bg-white relative rounded-2xl flex-1 mx-4 gap-4 w-[90%] flex-row mb-4 shadow items-start">
    <Image source={event.picUrl} className="rounded-l-2xl" style={{ width: 164, height: 147 }} />
    <Col gap={4} items="start" justify="start" className="flex-1 pt-2 pr-4 ">
      <Col gap={8}>
        <Row items="center" gap={4}>
          <Icons.location color="#5E3E2C" width={14} height={14} />
          <AppText className="font-bold text-brownColor-400">{event.name}</AppText>
        </Row>
        <Row items="center" gap={4}>
          <Icons.calendar color="#5E3E2C" width={14} height={14} />
          <AppText className="ml-1 text-brownColor-400">{moment(event.date).format("MMMM D, YYYY")}</AppText>
        </Row>
        <Row items="center" gap={4}>
          <Icons.coin color="#5E3E2C" width={14} height={14} />
          <AppText className="ml-1 text-brownColor-400">{event.price}</AppText>
        </Row>
      </Col>

    </Col>
    <AppButton
      title={t("Global.start_now")}
      className="absolute bottom-0 right-2 py-1 w-[30%] border border-brownColor-50 rounded-2xl"
      textClassName="text-brownColor-400"
      variant="outline"
      endIcon={<Icons.arrowRightFill  style={{
        transform: [{ rotate: `${isRTL? 180 : 0}deg` }],
      }} />}
      onPress={onStart}
    />
  </View>
);}

export default EventCard;