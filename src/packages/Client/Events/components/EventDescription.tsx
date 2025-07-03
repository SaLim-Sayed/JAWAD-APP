import AppText from "@/components/UI/AppText";
import Col from "@/components/UI/Col";
import Divider from "@/components/UI/Divider";
import Image from "@/components/UI/Image";
import Row from "@/components/UI/Row";
import { Icons } from "@/constants";
import React from "react";
import { View } from "react-native";

const EventDescription = ({event}: {event: any}) => {
    return (
        <View className="mb-4 flex-col gap-6" >
            <Image source={event.image} className="w-full h-48" />

            
            <Col justify="between" items="start" className="px-4 w-full gap-4">
                <Row gap={6} items="center" className="w-full">
                    <Image source={Icons.location} className="w-6 h-6" />
                    <AppText className="text-brownColor-400 font-bold">Pyramids (Saqqara)</AppText>
                </Row>
                <Row gap={6} items="center" className="w-full">
                    <Image source={Icons.calendar} className="w-6 h-6" />
                    <AppText className="text-brownColor-400 font-bold">{event.date}</AppText>
                </Row>
                <Row gap={6} items="center" className="w-full">
                    <Image source={Icons.coin} className="w-6 h-6" />
                    <AppText className="text-brownColor-400 font-bold">{event.price}</AppText>
                </Row>
            </Col>

            <Divider containerStyle={{ height: 2 }} className="h-[3px]" />

            <AppText className="text-brownColor-300 text-center my-4 tajawal-16  ">
            Lorem ipsum dolor sit amet consectetur. Sagittis consectetur sed lacus sem sed duis. Nisi imperdiet orci auctor amet lorem libero eu egestas. Non varius ut libero ullamcorper et enim faucibus nec vitae. Auctor sed elementum massa adipiscing eu. Eget convallis sem volutpat eu sapien pellentesque. Eu purus mollis laoreet mattis sit ut. Magna proin ipsum nascetur tincidunt nunc. Vulputate risus viverra nisi maecenas tincidunt. Nibh facilisi tellus nisl enim dapibus ullamcorper. Elit ipsum             </AppText>

        </View>
    );
};

export default EventDescription;
