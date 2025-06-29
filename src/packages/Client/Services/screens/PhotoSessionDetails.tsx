import AppButton from "@/components/UI/AppButton";
import AppWrapper from "@/components/UI/AppWrapper";
import Divider from "@/components/UI/Divider";
import SearchInput from "@/components/UI/SearchInput";
import { Icons } from "@/constants";
import useAppRouteParams from "@/provider/useAppRouteParams";
import React, { useState } from "react";
import { ScrollView, View } from "react-native";
import ServiceHeadr from "../components/HomeHeader";
import HorseSection from "../components/HorseSection";
import StableDescription from "../components/StableDescription";
import StableDetailsHeader from "../components/StableDetailsHeader";
import { photoSessionData } from "./mock";
import PhotoSessionHeader from "../components/PhotoSessionHeader";
// Dummy data for best stables/events



const PhotoSessionDetails = () => {
  const { id } = useAppRouteParams("PHOTO_SESSION_DETAILS")
  console.log(id)
  // Header user info
  const userName = "George Mikhaiel";
  const location = "Fifth Settlement";
  const [search, setSearch] = useState("");
  const title = photoSessionData.find((photoSession) => photoSession.id === id)?.name;
  return (
    <AppWrapper>
      <ServiceHeadr title={title} showBackButton />
      <View className="bg-white  h-full ">
        <ScrollView
          contentContainerStyle={{
            paddingBottom: 220,
            marginHorizontal: 10,
            flexGrow: 1,

          }}
        >
        
          <PhotoSessionHeader />
          <Divider containerStyle={{ height: 2 }} className="h-[3px]" />



          <AppButton
            title="Start now"
            onPress={() => { }}
            className="my-4"
          />
          <AppButton
            title="Add to cart"
            variant="outline"
            onPress={() => { }}

          />
        </ScrollView>
      </View>
    </AppWrapper>
  );
};

export default PhotoSessionDetails;