import AppButton from "@/components/UI/AppButton";
import AppWrapper from "@/components/UI/AppWrapper";
import SearchInput from "@/components/UI/SearchInput";
import { Icons } from "@/constants";
import useAppRouteParams from "@/provider/useAppRouteParams";
import React, { useState } from "react";
import { ScrollView, View } from "react-native";
import ServiceHeadr from "../components/HomeHeader";
import { bestStables } from "./mock";
import StableDetailsHeader from "../components/StableDetailsHeader";
import Divider from "@/components/UI/Divider";
import StableDescription from "../components/StableDescription";
import HorseSection from "../components/HorseSection";
import Col from "@/components/UI/Col";
// Dummy data for best stables/events



const StableServicesDetails = () => {
  const { id } = useAppRouteParams("STABLE_SERVICES_DETAILS")
  console.log(id)
  // Header user info
  const userName = "George Mikhaiel";
  const location = "Fifth Settlement";
  const [search, setSearch] = useState("");
  const title = bestStables.find((stable) => stable.id === id)?.name;
  return (
    <AppWrapper>
      <ServiceHeadr title={title} />
      <View className="bg-white  h-full ">
        <ScrollView
          contentContainerStyle={{
            paddingBottom: 220,
            marginHorizontal: 10,
            flexGrow: 1,

          }}
        >
          {/* Search */}
          <View className="flex-row w-full mb-3 justify-between items-center gap-4">

            <SearchInput value={search} onChange={setSearch} />

            <AppButton
              className="w-12 h-12 bg-brownColor-400 items-center justify-center"
              onPress={() => { }}
              startIcon={<Icons.filter />}
            />
            <AppButton
              className="w-12 h-12 bg-brownColor-400 items-center justify-center"
              onPress={() => { }}
              startIcon={<Icons.locationTick />}
            />
          </View>

          <StableDetailsHeader />
          <Divider containerStyle={{height:2}} className="h-[3px]"/>
          <StableDescription/>
          <Divider containerStyle={{height:2}} className="h-[3px]"/>
          <HorseSection/>
          {/* The Best Stable Section */}
          {/* The Events Section */}

               <Col gap={10} className="mt-4">
               <AppButton
                    title="Start now"
                     onPress={() =>  {}}
                  />
                  <AppButton
                    title="Add to cart"
                    variant="outline"
                    onPress={() =>  {}}
                  />
                  </Col>
        </ScrollView>
      </View>
    </AppWrapper>
  );
};

export default StableServicesDetails;