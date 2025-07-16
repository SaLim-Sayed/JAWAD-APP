import AppText from "@/components/UI/AppText";
import Col from "@/components/UI/Col";
import Divider from "@/components/UI/Divider";
import Image from "@/components/UI/Image";
import Row from "@/components/UI/Row";
import { Icons } from "@/constants";
import React from "react";
import { View } from "react-native";
import { Event } from "../../home/@types/event.type";
import moment from "moment";
import MapComponent from "@/components/UI/MapComponent";
import LocationCard from "@/components/UI/MapCard";

const EventDescription = ({ event }: { event: Event }) => {
    return (
        <View className="mb-4 flex-col gap-6" >
            <Image source={event.picUrl} className="w-full h-48" />


            <Col justify="between" items="start" className="px-4 w-full gap-4">
                <Row gap={6} items="center" className="w-full">
                    <Image source={Icons.location} className="w-6 h-6" />
                    <AppText className="text-brownColor-400 font-bold">{event.city}</AppText>
                </Row>
                <Row gap={6} items="center" className="w-full">
                    <Image source={Icons.calendar} className="w-6 h-6" />
                    <AppText className="text-brownColor-400 font-bold">{moment(event.date).format("MMMM D, YYYY")}</AppText>
                </Row>
                <Row gap={6} items="center" className="w-full">
                    <Image source={Icons.coin} className="w-6 h-6" />
                    <AppText className="text-brownColor-400 font-bold">{event.price}</AppText>
                </Row>
            </Col>

            <Divider containerStyle={{ height: 2 }} className="h-[3px]" />

            <AppText className="text-brownColor-300 text-center my-4 tajawal-16  ">
                {event.description}
            </AppText>
            <LocationCard
                city={event.city}
                region={event.region}
                address={event.address}
            />
        </View>
    );
};

export default EventDescription;
