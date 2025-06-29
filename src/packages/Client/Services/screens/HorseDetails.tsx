import AppButton from "@/components/UI/AppButton";
import AppWrapper from "@/components/UI/AppWrapper";
import SearchInput from "@/components/UI/SearchInput";
import { Icons } from "@/constants";
import useAppRouteParams from "@/provider/useAppRouteParams";
import React, { useState } from "react";
import { ScrollView, View } from "react-native";
import ServiceHeadr from "../components/HomeHeader";
import { bestStables, horseDate } from "./mock";
import StableDetailsHeader from "../components/StableDetailsHeader";
import Divider from "@/components/UI/Divider";
import StableDescription from "../components/StableDescription";
import HorseSection from "../components/HorseSection";
import Col from "@/components/UI/Col";
import HorseDetailsHeader from "../components/HorseDetailsHeader";
import HorseDescription from "../components/HorseDescription";
import Row from "@/components/UI/Row";
// Dummy data for best stables/events



const HorseDetails = () => {
  const { id } = useAppRouteParams("HORSE_DETAILS")
  console.log(id)

  const [search, setSearch] = useState("");
  const title = horseDate.find((horse) => horse.id === id)?.name;
  return (
    <AppWrapper>
      <ServiceHeadr title={title} showBackButton />
      <View className="bg-white  h-full ">
        <ScrollView
          contentContainerStyle={{
            paddingBottom: 180,
            marginHorizontal: 10,
            flexGrow: 1,

          }}
        >
          
          <HorseDetailsHeader />
          <HorseDescription />

          <Row gap={4} justify="between" className="mt-4">
            <AppButton
              title="Select"
              onPress={() => { }}
              className="w-[90%]"
            />
            <AppButton
              title="Share"
              variant="outline"
              onPress={() => { }}
              className="w-[88%]"
              endIcon={<Icons.share />}
            />
          </Row>
        </ScrollView>
      </View>
    </AppWrapper>
  );
};

export default HorseDetails;